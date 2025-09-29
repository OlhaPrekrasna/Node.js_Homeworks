import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Tag from './models/Tag.js';
import Article from './models/Article.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/test', async (_, res) => {
  
  try {
    // Создаю издателя
    const publisher = await Publisher.create({
      name: 'TechBooks',
      location: 'NY',
    });

    // Создаю журнал
    const magazine = await Magazine.create({
      title: 'JS Weekly',
      issueNumber: 42,
      publisher: publisher._id,
    });

    // Создаю статью
    const article = await Article.create({
      title: 'MongoDB Basics',
      content: 'Mongoose connections...',
    });

    // Создаю тег и связываю со статьёй
    const tag = await Tag.create({ name: 'Database', articles: [article._id] });
    article.tags.push(tag._id);
    await article.save();

    res.json({ publisher, magazine, article, tag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
