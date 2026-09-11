class OfflineDB {
  constructor() {
    this.dbPromise = null;
  }

  openDB() {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !("indexedDB" in window)) {
        return reject(new Error("IndexedDB not supported"));
      }

      const request = indexedDB.open("ner_early_warning_offline_db", 1);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("pending_reports")) {
          const store = db.createObjectStore("pending_reports", { keyPath: "id" });
          store.createIndex("timestamp", "timestamp", { unique: false });
        }
        if (!db.objectStoreNames.contains("feedback_logs")) {
          db.createObjectStore("feedback_logs", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("cached_hotspots")) {
          db.createObjectStore("cached_hotspots", { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  async queueReport(report) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pending_reports", "readwrite");
      tx.objectStore("pending_reports").put(report);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getQueuedReports() {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pending_reports", "readonly");
      const req = tx.objectStore("pending_reports").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async clearQueuedReports() {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pending_reports", "readwrite");
      tx.objectStore("pending_reports").clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async saveFeedback(entry) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("feedback_logs", "readwrite");
      tx.objectStore("feedback_logs").put(entry);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getFeedbackLogs() {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("feedback_logs", "readonly");
      const req = tx.objectStore("feedback_logs").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
}

export const offlineDB = new OfflineDB();

export const initDB = async () => {
  return await offlineDB.openDB();
};

export const getOfflineReports = async () => {
  return await offlineDB.getQueuedReports();
};

export const queueOfflineReport = async (report) => {
  return await offlineDB.queueReport(report);
};

export const syncOfflineReports = async () => {
  const queued = await offlineDB.getQueuedReports();
  if (queued.length > 0) {
    await offlineDB.clearQueuedReports();
  }
  return queued;
};
