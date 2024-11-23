import { createServer } from "http"; // Async - ES6
// const http = require("http"); // Sync - CommonJS

// Модуль загрузки конфигруации
import dotenv from "dotenv";

// Загрузить конфигурацию
dotenv.config();

// Получить данные о конфигурации - и если данных нет - назначить по умолчанию
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3030;


// Настройка выдачи ключей
import jwt from "jsonwebtoken"; // Модуль
const JWT_SECRET = process.env.JWT_SECRET || "1q2w3e4r"; // Секретный ключ
const JWT_TTL = process.env.JWT_TTL || "1h"; // Время жизни ключа


/**
 *
 * @param payload - что зашифровать в этот ключ
 * @returns {token} - JWT token
 */
const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_TTL});
    return token
}



const httpServer = createServer( (req, res) => {
    // Добавляем заголовки CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Проверяем метод OPTIONS, если таковой - завершаем запрос
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // Статус успешной обработки запроса без тела
        res.end();
        return;
    }

    const payload = {
        location: 'Mykolaiv',
        user: {
            id: 10,
            email: 'test@ukr.net',
            name: 'Oleksandr Nykytin'
        }
    }

    const token = generateToken(payload);

    res.end(token);

});


httpServer.listen(SERVER_PORT, SERVER_HOST,() => {
    console.log(`JWT Key Create server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});