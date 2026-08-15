import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) throw new Error("MONGODB_URI environment variable is not set");
if (!dbName) throw new Error("MONGODB_DB_NAME environment variable is not set");

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Cache the connection across hot reloads in dev so we don't exhaust connections.
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
