const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота
const bot = new TelegramBot('7675869759:AAHeC_nx7UJm5j-lW63orhWxKz9BpprCxD8', { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я ваш новый бот.');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = `Ты написал: ${msg.text}`;

    // Обработчик для других сообщений
    if (msg.text !== '/start') {
        bot.sendMessage(chatId, messageText);
    }
});

console.log('Бот запущен!');

