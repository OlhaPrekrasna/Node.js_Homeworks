import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

let db;

export async function connectDB() {
  try {
    await client.connect();
    console.log('Подключение к MongoDB установлено!');
    db = client.db();
  } catch (err) {
    console.error('Ошибка подключения: ', err);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error('База данных не подключена!');
  return db;
}

