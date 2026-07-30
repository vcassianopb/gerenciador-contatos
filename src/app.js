const express = require('express');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});