const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('message', (username, message) => {  // здесь 'message' - это слушатель события, а дальше в параметрах - имя пользователя и текст сообщения
    console.log(`${username}: ${message}`);
});

function sendMessage(username, message, emitter) {

    emitter.emit('message', username, message); 
};

sendMessage('Tom', 'Hello!', emitter);
sendMessage('James', 'How are you?', emitter);
sendMessage('Lina', 'Hi!', emitter);
sendMessage('Diana', 'I am fine', emitter);