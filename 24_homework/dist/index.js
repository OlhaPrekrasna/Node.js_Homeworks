// Import express
import express from 'express';
// Create app instance
const app = express();
// Middleware for parsing JSON in request body
app.use(express.json());
// GET route
app.get('/', (req, res) => {
    res.send('Hello! This is a GET route');
});
// POST route
app.post('/data', (req, res) => {
    const data = req.body;
    res.json({
        message: 'Data received!',
        yourData: data,
    });
});
// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map