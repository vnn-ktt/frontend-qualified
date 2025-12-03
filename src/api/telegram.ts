// const express = require('express');
// const router = express.Router();
// const TelegramBot = require('node-telegram-bot-api');
//
// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
//
// router.post('/', async (req, res) => {
//     try {
//         const { message, chatId } = req.body;
//         let reply = '';
//
//         if (message.startsWith('/start')) {
//             reply = 'Добро пожаловать! Я QuizBot. Используйте /quiz для начала викторины';
//         } else if (message.startsWith('/quiz')) {
//             reply = await getQuizQuestion(message);
//         } else if (message.startsWith('/help')) {
//             reply = 'Доступные команды:\n/quiz - начать викторину\n/help - помощь';
//         } else {
//             reply = 'Я понимаю команды: /start, /quiz, /help';
//         }
//
//
//         res.json({
//             success: true,
//             reply
//         });
//
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Internal server error'
//         });
//     }
// });
//
// async function getQuizQuestion(topic) {
//     const questions = {
//         js: {
//             question: "Что выведет: console.log(1 + '2' + '2')?",
//             options: ["122", "5", "Error", "14"],
//             answer: 0
//         },
//         python: {
//             question: "Какой тип данных в Python неизменяем?",
//             options: ["list", "tuple", "dict", "set"],
//             answer: 1
//         }
//     };
//
//     const topicKey = topic.split(' ')[1] || 'js';
//     const q = questions[topicKey] || questions.js;
//
//     return `Вопрос: ${q.question}\n\nВарианты:\n${q.options.map((opt, i) => `${i+1}. ${opt}`).join('\n')}`;
// }
//
// module.exports = router;