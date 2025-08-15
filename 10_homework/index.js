import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const PORT = process.env.PORT // 3002;

const app = express();

app.use(express.json());

// Логирование запросов

function logRequest(req, _res, next) {
  console.log(`Method request: ${req.method}. URL request: ${req.url}`);
  next();
}

app.use(logRequest);

// Middleware для проверки JWT

function authenticateJWT(req, res, next) {
  // Извлекаем токен из заголовка Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
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

// Middleware для проверки роли (например, админ или user)
function authorizeRole(role) {
    return (req,res,next) => {
        if (req.user.role !== role) {
            return res.status(403).send({ message: 'Access denied: insufficient rights' });
        }
        next();
    }
}

// Создадим "фейковую" базу данных пользователей

const users = [
  {
    id: 1,
    email: 'example@gmail.com',
    passwordHash: '',
    // passwordHash: await bcrypt.hash('7gysdsr7t4hf47yhrs3sstgs', 12),
    name: 'Dan Reynolds',
    role: 'user',
  },
  {
    id: 2,
    email: 'admin@gmail.com',
    passwordHash: '',
    // passwordHash: await bcrypt.hash('8gfhy543dhyuikmn', 12),
    name: 'Minka Kelly',
    role: 'admin',
  }
];

// Хэшируем пароли при запуске асинхронно

(async () => {
    users[0].passwordHash = await bcrypt.hash('7gysdsr7t4hf47yhrs3sstgs', 12);
    users[0].passwordHash = await bcrypt.hash('46yvyynjuiamadmin09877uh8', 12);
})();

// app.use(express.json());
// app.use(logRequest);


// Маршруты
app.get('/', (_, res) => {
  res.send('Home page');
});

// Проверим здесь email и пароль в логине, вернем JWT 

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    // Генерируем токен
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      SECRET_JWT,
      { expiresIn: '10m' }
    );
    // Отправляем токен
    res.send(token);
  } catch (error) {
    console.error('Server error: ' + error.message);
    res.status(500).send({ message: 'Server error' });
    
  }
});

// 1 Обновим email пользователя

app.put

app.get('/protected', authenticateJWT, (req, res) => {
  res.send({ message: 'This is protected route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
