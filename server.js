const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const veiculosRoutes = require('./routes/veiculos');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/veiculos', veiculosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
