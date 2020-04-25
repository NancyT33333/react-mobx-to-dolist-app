const express = require('express');
 
// Инициализация роутеров
const root = express.Router();
const router = express.Router();

const bodyParser = require('body-parser');

const app = express();
const has = Object.hasOwnProperty;

app.use(bodyParser.json())
    
// Базовый контекст API
const TODOS_SERVER_CONTEXT = '/TODOS_SERVER_CONTEXT';
 
// Описание данных
const ITEMS = {
    1: {
        id: 1,
        text: 'Получить доступ',
        isDone: true,
    },
    2: {
        id: 2,
        text: 'Прочитать документацию',
        isDone: true,
    },
    3: {
        id: 3,
        text: 'Создать модуль с примером кода',
        isDone: true,
    },
    4: {
        id: 4,
        text: 'Разработать свой модуль',
        isDone: false,
    },
    5: {
        id: 5,
        text: 'Протестировать свой модуль',
        isDone: false,
    },
    6: {
        id: 6,
        text: 'Зарегистрировать модуль и пройти интеграцию',
        isDone: false,
    },
    7: {
        id: 7,
        text: 'Дождаться релиза в ПРОМ',
        isDone: false,
    },
    8: {
        id: 8,
        text: '🎉🎉🎉',
        isDone: false,
    },
};
 
// Реализация метода получения списка элементов
router.get('/todos', (req, res) => {
    res.status(200).send(ITEMS);
});
 
// Реализация метода создания элемента
router.post('/todo', (req, res) => {
    const item = req.body;
 
    item.id = Date.now();
 
    ITEMS[item.id] = item;
 
    res.status(201).end();
});
 
// Реализация метода обновления элемента
router.put('/todo/:id', (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
 
    if (!itemId || !has.call(ITEMS, itemId)) {
        res.status(404).send(`TODO with id ${itemId} not found`);
 
        return;
    }
 
    ITEMS[itemId] = item;
 
    res.status(200).end();
});
 
// Реализация метода удаления элемента
router.delete('/todo/:id', (req, res) => {
    const itemId = req.params.id;
 
    if (!itemId || !has.call(ITEMS, itemId)) {
        res.status(404).send(`TODO with id ${itemId} not found`);
 
        return;
    }
 
    delete ITEMS[itemId];
 
    res.status(200).end();
});
 
// Подключение дочернего роутера к корневому
root.use(TODOS_SERVER_CONTEXT, router);
app.use("/", router);
app.listen(8000);