
import { openDB, DBSchema } from 'idb';

const DB_NAME = 'ronda-app-db';
const DB_VERSION = 1;

interface RondaDB extends DBSchema {
  'test-sessions': {
    key: string;
    value: {
      studentId: string;
      studentName: string;
      answers: Record<string, any>;
    };
  };
  'debate-sessions': {
    key: string;
    value: {
      studentId: string;
      studentName: string;
      team: 'affirmative' | 'negative';
    }
  }
}

export const getDB = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return openDB<RondaDB>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains('test-sessions')) {
                db.createObjectStore('test-sessions');
            }
            if (!db.objectStoreNames.contains('debate-sessions')) {
                db.createObjectStore('debate-sessions');
            }
        },
    });
};

export const getSessionStore = async (storeName: 'test-sessions' | 'debate-sessions') => {
    const db = await getDB();
    if (!db) return null;
    return db.transaction(storeName, 'readwrite').objectStore(storeName);
}
