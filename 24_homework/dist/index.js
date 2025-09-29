import express from 'express';
const app = express();

app.use(express.json());
// GET
app.get('/', (req, res) => {
  res.send('Hello! This is a GET route');
});
// POST
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Data received!',
    yourData: data,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
