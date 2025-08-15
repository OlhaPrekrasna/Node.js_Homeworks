import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET;

let users = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$EIXGFz1QluTfOCn/ztkZQ.BXHytVgMbdRsnkrpSALubslcFZP6Uyy',
    email: 'user1@example.com',
    name: 'User One',
    role: 'user',
    mustChangePassword: false,
  },
  {
    id: 2,
    username: 'admin',
    password: '$2b$10$EIXGFz1QluTfOCn/ztkZQ.BXHytVgMbdRsnkrpSALubslcFZP6Uyy',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    mustChangePassword: false,
  },
];

app.use(express.json());

// Middleware: проверка JWT и загрузка пользователя в req.user
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Authorization required');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).send('User is not found');
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).send('Invalid or expired token');
  }
};

// Middleware: проверка роли
const checkRole = role => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send('Access denied');
  }
  next();
};

// Middleware: проверка mustChangePassword при входе
const checkMustChangePassword = (req, res, next) => {
  if (req.user.mustChangePassword) {
    return res.status(403).send('Password change required');
  }
  next();
};

// Регистрация
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).send('Username, email and password are required');
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).send('Email already registered');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      email,
      name: '',
      role: 'user',
      mustChangePassword: false,
    };
    users.push(newUser);
    res.status(201).send('User was created');
  } catch {
    res.status(500).send('Error in registration');
  }
});

// Логин с проверкой mustChangePassword
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Invalid username');

  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid password');

    if (user.mustChangePassword) {
      return res.status(403).send('Password change required');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '3m',
    });
    res.json({ message: 'Successful login', token });
  } catch {
    res.status(500).send('Error during login');
  }
});

// Маршрут для получения профиля текущего пользователя
app.get('/profile', authMiddleware, checkMustChangePassword, (req, res) => {
  const { password, ...userData } = req.user;
  res.json(userData);
});

// Смена пароля
app.post('/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).send('New password required');

  try {
    const hashed = await bcrypt.hash(newPassword, 12);
    users = users.map(u =>
      u.id === req.user.id
        ? { ...u, password: hashed, mustChangePassword: false }
        : u
    );
    res.send('Password changed');
  } catch {
    res.status(500).send('Error changing password');
  }
});

// Удаление аккаунта
app.post('/delete-account', authMiddleware, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).send('Password required');

  try {
    const user = users.find(u => u.id === req.user.id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid password');

    users = users.filter(u => u.id !== req.user.id);
    res.send('Account deleted');
  } catch {
    res.status(500).send('Error deleting account');
  }
});

// Изменение email
app.post('/change-email', authMiddleware, async (req, res) => {
  const { newEmail, password } = req.body;
  if (!newEmail || !password)
    return res.status(400).send('New email and password required');

  if (users.find(u => u.email === newEmail)) {
    return res.status(400).send('Email already in use');
  }

  try {
    const user = users.find(u => u.id === req.user.id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Incorrect password');

    users = users.map(u =>
      u.id === req.user.id ? { ...u, email: newEmail } : u
    );
    res.send('Email changed');
  } catch {
    res.status(500).send('Error changing email');
  }
});

// Маршрут только для админа
app.get('/admin', authMiddleware, checkRole('admin'), (req, res) => {
  res.send('Admin information');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

