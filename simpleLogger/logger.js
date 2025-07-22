const fs = require('fs');

function logMessage(message) {
  const now = new Date();
  const timestamp = now.toLocaleString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) {
      console.error('Ошибка при записи в лог: ', err);
    }
  });
}

module.exports = logMessage;
