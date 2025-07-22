const fs = require('fs');

// Создаю функцию для отправки сообщений
function logMessage(message) {

  // Добавляю метки времени, чтобы сообщения можно было различать по времени
  const now = new Date();

  // Здесь привожу время к формату строки
  const timestamp = now.toLocaleString(); 

// Переменная, чтобы сформировать вид сообщения
  const logEntry = `[${timestamp}] ${message}\n`;

  // Создаю файл для записи сообщений в него, условие, если возникла ошибка
  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) {
      console.error('Ошибка при записи в лог: ', err);
    }
  });
}

module.exports = logMessage;
