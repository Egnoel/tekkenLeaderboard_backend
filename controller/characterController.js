const Character = require('../schema/characterSchema');

// Função para pegar todos os charactes
const getTodosCharacters = (req, res) => {
  Character.find()
    .then((charactes) => res.send(charactes))
    .catch((error) => res.status(500).send(error));
};

// Função para adicionar um novo characte
const adicionarCharacter = async (req, res) => {
  const character = new Character(req.body); // Cria uma nova instância de Player com os dados do corpo da requisição
  try {
    const novoCharacter = await character.save(); // Salva o jogador no MongoDB
    res.status(201).json(novoCharacter); // Retorna o jogador salvo como resposta
  } catch (error) {
    res.status(400).send(error.message); // Retorna um erro se a operação falhar
  }
};

// Função para pegar informações de um jogador específico
const getCharacterPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).send('character não encontrado');
    }
    res.json(character); // Use res.json() em vez de res.send() para garantir a conversão correta para JSON
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Função para deletar um character
const deletarCharacter = async (req, res) => {
  const { id } = req.params;
  try {
    const characterDeletado = await Character.findByIdAndDelete(id);
    if (!characterDeletado) {
      return res.status(404).send('character não encontrado');
    }
    res.send(`character com ID: ${id} removido com sucesso`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodosCharacters,
  adicionarCharacter,
  getCharacterPorId,
  deletarCharacter,
};
