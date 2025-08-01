import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    res.setHeader('Content-Type', 'text/plain');

    if (!authHeader) {
        res.statusCode = 401;
        res.end('Unauthorized');
    } else {
        res.statusCode = 200;
        res.end('Authorization header received');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});