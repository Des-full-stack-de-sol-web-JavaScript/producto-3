import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://db_user:pass123@cluster0.yvuhuz9.mongodb.net/productosDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await client.connect();

    db = client.db("productosDB");

    console.log("✅ Conexión establecida a Atlas.");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB Atlas", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error(
      "La base de datos no está conectada. Llama a connectDB primero."
    );
  }
  return db;
}
