const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const userGamesRoutes = require('./src/routes/userGameRoutes');

const errorHandler = require('./src/middlewares/errorHandler');
const {authMiddleware, adminMiddleware} = require('./src/middlewares/auth');
const notFoundHandler = require('./src/middlewares/notFoundHandler');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
})); 
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.set('trust proxy', 1)

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Demasiadas peticiones desde esta IP'
});

app.use(express.json());

app.use('/', apiLimiter);
  
app.use('/api/', userRoutes);
app.use('/api/usergames', userGamesRoutes);

app.get('api/admin/data', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Datos confidenciales para administradores'});
});


app.use(notFoundHandler);

app.use(errorHandler);



module.exports = app;