const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота
const bot = new TelegramBot('7675869759:AAHeC_nx7UJm5j-lW63orhWxKz9BpprCxD8', { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = `Привет, ты написал: ${msg.text}`;

    bot.sendMessage(chatId, messageText);
});

console.log('Бот запущен!');

