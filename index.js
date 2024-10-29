const { exec } = require('child_process');

// Список библиотек, которые нужно установить
const libraries = ['node-telegram-bot-api', 'dotenv', 'axios', 'qs', 'https'];

// Установка библиотек
libraries.forEach((library) => {
    try {
        require.resolve(library);
        console.log(`Библиотека ${library} уже установлена.`);
    } catch (error) {
        exec(`npm install ${library}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка установки библиотеки ${library}: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
});

// Импортируем библиотеку 'dotenv'
const dotenv = require('dotenv');
dotenv.config();

// Импортируем библиотеку 'node-telegram-bot-api'
const TelegramBot = require('node-telegram-bot-api');

// Импортируем класс GigaChatProvider
const GigaChatProvider = require('./GigaChatProvider');

// Создаем бота с использованием токена из файла .env
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Создаем экземпляр класса GigaChatProvider
const gigaChatProvider = new GigaChatProvider(process.env.GIGACHATAPI_AUTHTOKEN);

// Обработчик сообщений
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, 'Привет! Я ваш новый бот.');
    } else {
        try {
            const response = await gigaChatProvider.sendMessage(text);
            bot.sendMessage(chatId, response);
        }
        catch (error) {
            console.error('Произошла ошибка при обработке сообщения:', error);
        }
    }
});

console.log('Бот запущен!');

