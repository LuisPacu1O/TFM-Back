const app = require('../app');
const dotenv = require('dotenv')
const connectDB = require('./src/config/database');
const http = require('http');
dotenv.config();

const PORT = process.env.PORT || 3000; 


const startServer = async () => {
    try {

        await connectDB();

        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`Servidor HTTP corriendo en http://localhost:${PORT}`);
        });

    } catch(error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
}

startServer();