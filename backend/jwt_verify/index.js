import { createServer } from "http";

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


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {
            valid: true,
            decoded: decoded
        }
    } catch (e) {
        console.error(e)
        return null
    }
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

    // Обчно ключи доступа передаются в заголовке запроса
    const authHeader = req.headers['authorization']


    if (!authHeader) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Token not found' }));
        return;
    }

    const token  = authHeader.split(' ')

    const verify = verifyToken(token[1])

    res.end(JSON.stringify(verify));

    });


httpServer.listen(SERVER_PORT, SERVER_HOST,() => {
    console.log(`JWT Validate server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});