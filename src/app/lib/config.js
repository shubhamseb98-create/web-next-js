import mongoose from "mongoose";
import dns from "dns";

// ─── DNS Fix ─────────────────────────────────────────────────────────────────
// The local router DNS (192.168.x.x) cannot resolve MongoDB SRV records.
// Force Google DNS in this process/worker before any mongoose connection.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable in .env"
  );
}

// Cache the connection across hot-reloads in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
