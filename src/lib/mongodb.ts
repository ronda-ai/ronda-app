import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null, gfs: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            console.log("MongoDB connected. Initializing GridFS...");
            if (mongoose.connection.db) {
                cached.gfs = new GridFSBucket(mongoose.connection.db, {
                    bucketName: 'audio_files'
                });
                console.log("GridFS initialized.");
            } else {
                throw new Error("MongoDB connection is available, but the database instance is not. GridFS could not be initialized.");
            }
            return mongoose;
        }).catch(err => {
            cached.promise = null; // Reset promise on error
            throw err;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}

export function getGridFSBucket(): GridFSBucket {
    if (!cached.gfs) {
        console.warn("GridFSBucket not initialized. It will be initialized after dbConnect resolves.");
        // This is a fallback and might not work perfectly if called before connection is established.
        const conn = mongoose.connection;
        if(conn && conn.db) {
            cached.gfs = new GridFSBucket(conn.db, { bucketName: "audio_files" });
        } else {
             throw new Error("GridFS could not be initialized because MongoDB connection is not available.");
        }
    }
    return cached.gfs;
}
