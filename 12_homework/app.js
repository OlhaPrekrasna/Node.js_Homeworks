import express from 'express';
import { connectDB, getDB } from './db/index.js';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Сервер работает');
});

// Создать новый продукт
app.post('/products', async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('products').insertOne(req.body);
    res.status(201).send({ message: 'Продукт создан', id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Получить все продукты
app.get('/products', async (_, res) => {
  try {
    const db = getDB();
    const products = await db.collection('products').find().toArray();
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Получить продукт по ID
app.get('/products/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: 'Некорректный ID' });
    }

    const db = getDB();
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!product) return res.status(404).send({ error: 'Продукт не найден' });

    res.send(product);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Обновить продукт
app.put('/products/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: 'Некорректный ID' });
    }

    const db = getDB();
    const result = await db
      .collection('products')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    if (result.matchedCount === 0)
      return res.status(404).send({ error: 'Продукт не найден' });

    res.send({ message: 'Продукт обновлён' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Удалить продукт
app.delete('/products/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: 'Некорректный ID' });
    }

    const db = getDB();
    const result = await db
      .collection('products')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0)
      return res.status(404).send({ error: 'Продукт не найден' });

    res.send({ message: 'Продукт удалён' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
