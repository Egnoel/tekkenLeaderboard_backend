const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const playerRoute = require('./routes/playerRoute');
const characterRoute = require('./routes/characterRoute');
const tournamentRoute = require('./routes/tournamentRoute');
const app = express();
require('dotenv').config();
// Connect to MongoDB
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error.message));

app.use(express.json());

app.use(cors());

// Middleware para parsear o corpo das requisições para JSON
app.use(bodyParser.json());

// Rotas

app.use('/api/players', playerRoute);
app.use('/api/characters', characterRoute);
app.use('/api/tournaments', tournamentRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB connected to ${process.env.MONGODB_URI}`);
});
