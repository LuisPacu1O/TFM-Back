const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const userGamesRoutes = require('./routes/userGameRoutes');

const errorHandler = require('./middlewares/errorHandler');
const {authMiddleware, adminMiddleware} = require('./middlewares/auth');
const notFoundHandler = require('./middlewares/notFoundHandler');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
})); 
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Demasiadas peticiones desde esta IP'
});


app.use('/', apiLimiter);
  
app.use('/api/', userRoutes);
app.use('/api/usergames', userGamesRoutes);

app.get('api/admin/data', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Datos confidenciales para administradores'});
});


app.use(notFoundHandler);

app.use(errorHandler);



module.exports = app;