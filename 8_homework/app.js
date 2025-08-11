import express from 'express';
import sequelize from './config/db.js';
import dotenv from 'dotenv';
import Book from './models/book.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Main page');
});

// Получаем все книги
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.send(books);
  } catch (err) {
    res.status(500).send({ error: `No books found: ${err.message}` });
  }
});

// Создаем книгу
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body; // ✅ сначала объявляем
    if (!title || !author || !year) {
      return res.status(400).json({ error: 'title, author and year are required' });
    }
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'The book was not created: ' + err.message });
  }
});


// Обновляем книгу
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const [updated] = await Book.update(
      { title, author, year },
      { where: { id } }
    );
    if (updated) {
      const updatedBook = await Book.findByPk(id);
      res.send(updatedBook);
    } else {
      res.status(404).send({ message: 'The book is not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Удаляем книгу
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (deleted) {
      res.send({ message: 'The book was deleted' });
    } else {
      res.status(404).send({ message: 'The book is not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been successfully');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error: ' + error);
  }
});
