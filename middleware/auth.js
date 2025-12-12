import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 🔴 Якщо немає токена
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 🔐 Перевіряємо токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🧠 Кладемо userId в request
        req.user = { id: decoded.id };

        next(); // пускаємо далі
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
