const { exec } = require('child_process');

// Список библиотек, которые нужно установить
const libraries = ['node-telegram-bot-api', 'dotenv'];

// Установка библиотек
libraries.forEach((library) => {
    exec(`npm install ${library}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
});

// Импортируем библиотеку 'dotenv'
const dotenv = require('dotenv');
dotenv.config();

// Импортируем библиотеку 'node-telegram-bot-api'
const TelegramBot = require('node-telegram-bot-api');

// Создаем бота с использованием токена из файла .env
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Обработчик команды '/start'
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я ваш новый бот.');
});

// Обработчик для других сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = `Ты написал: ${msg.text}`;

    if (msg.text !== '/start') {
        bot.sendMessage(chatId, messageText);
    }
});

console.log('Бот запущен!');

