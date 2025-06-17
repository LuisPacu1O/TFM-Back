const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const user = encodeURIComponent(process.env.MONGO_USER);
        const password = encodeURIComponent(process.env.MONGO_PASS);
        const cluster = process.env.MONGO_CLUSTER;
        const dbName = process.env.MONGO_DB;

        const uri = `mongodb+srv://${user}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${dbName}`;

        await mongoose.connect(uri);
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 