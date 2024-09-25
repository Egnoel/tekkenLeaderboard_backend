const express = require('express');

const app = express();

const router = express.Router();
const {
  getTodosCharacters,
  adicionarCharacter,
  getCharacterPorId,
  deletarCharacter,
} = require('../controller/characterController.js');

router.get('/', getTodosCharacters);
router.post('/', adicionarCharacter);
router.get('/:id', getCharacterPorId);
router.delete('/:id', deletarCharacter);

module.exports = router;
