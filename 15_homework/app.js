import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user has connected: ', socket.id);

  socket.on('chat message', (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);

    io.emit('message received', `User ${socket.id}: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// const PORT = 3000;

// app.use(express.static('public'));

// io.on('connection', (socket) => {
//   console.log('New user has connected: ', socket.id);

//   socket.on('chat message', (msg) => {
//     console.log(`Message from ${socket.id}: ${msg}`);

//     socket.emit('message received', `Server received: ${msg}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected: ', socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
