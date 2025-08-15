import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

// Логирование запросов
function logRequest(req, _res, next) {
  console.log(`Method: ${req.method} | URL: ${req.url}`);
  next();
}
app.use(logRequest);

// Middleware для проверки JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Unauthorized access: no token provided' });
  }

  jwt.verify(token, SECRET_JWT, (err, user) => {
    if (err) {
      return res
        .status(403)
        .send({ message: 'The token is invalid or expired' });
    }
    req.user = user;
    next();
  });
}

// Middleware для проверки роли (напр., admin или user)
function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .send({ message: 'Access denied: insufficient rights' });
    }
    next();
  };
}

// Фейковая "база данных" пользователей
const users = [
  {
    id: 1,
    email: 'example@gmail.com',
    passwordHash: '',
    name: 'Dan Reynolds',
    role: 'user',
  },
  {
    id: 2,
    email: 'admin@gmail.com',
    passwordHash: '',
    name: 'Minka Kelly',
    role: 'admin',
  },
];

// Хэшируем пароли при запуске
(async () => {
  users[0].passwordHash = await bcrypt.hash('7gysdsr7t4hf47yhrs3sstgs', 12);
  users[1].passwordHash = await bcrypt.hash('46yvyynjuiamadmin09877uh8', 12);
})();

function signUserToken(user, expires = '10m') {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    SECRET_JWT,
    { expiresIn: expires }
  );
}

function validateEmail(email) {
  return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
}

// Маршруты
app.get('/', (_req, res) => {
  res.send('Home page');
});

// При логине выдаём JWT
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required' });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = signUserToken(user, '10m');
    return res.json({ token });
  } catch (error) {
    console.error('Server error: ' + error.message);
    return res.status(500).send({ message: 'Server error' });
  }
});

// Защищённый тестовый маршрут
app.get('/protected', authenticateJWT, (req, res) => {
  res.send({ message: 'This is protected route', user: req.user });
});

// 1) Обновление email пользователя
app.put('/update-email', authenticateJWT, (req, res) => {
  const { email } = req.body || {};
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'Invalid or missing email' });
  }

  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  user.email = email;
  
  const newToken = signUserToken(user, '10m');

  return res.send({
    message: 'Email updated successfully',
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token: newToken,
  });
});

// 2) Удаление аккаунта
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const index = users.findIndex((u) => u.id === req.user.id);

  if (index === -1) {
    return res.status(404).send({ message: 'User not found' });
  }

  const [removed] = users.splice(index, 1);
  return res.send({
    message: 'Account deleted successfully',
    deletedUserId: removed.id,
  });
});

// 3) Обновление роли пользователя (только для админа)
app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, newRole } = req.body || {};
  if (!userId || !newRole) {
    return res
      .status(400)
      .send({ message: 'userId and newRole are required' });
  }

  const user = users.find((u) => u.id === Number(userId));
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  user.role = newRole;
  return res.send({
    message: 'Role updated successfully',
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

// 4) Обновление JWT
app.post('/refresh-token', authenticateJWT, (req, res) => {
  
  const user = req.user;
  const newToken = signUserToken(user, '10m');
  return res.json({ token: newToken });
});

// Глобальный обработчик ошибок
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ message: 'Unexpected server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
