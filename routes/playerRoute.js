const express = require('express');
const router = express.Router();
const {
  getTodosJogadores,
  adicionarJogador,
  getJogadorPorId,
  atualizarJogador,
  deletarJogador,
  addPlayerParticipation,
  recalculatePlayerStats,
  removePlayerParticipation,
  getTournamentsByPlayer,
} = require('../controller/playerController.js');

router.get('/', getTodosJogadores);
router.post('/', adicionarJogador);
router.post(
  '/:playerId/tournaments/:tournamentId/participation',
  addPlayerParticipation
);
router.post('/:id/recalculate', recalculatePlayerStats);
router.get('/:id', getJogadorPorId);
router.get('/:playerId/tournaments', getTournamentsByPlayer);

router.put('/:id', atualizarJogador);
router.delete('/:id', deletarJogador);
router.delete(
  '/:playerId/tournaments/:tournamentId',
  removePlayerParticipation
);

module.exports = router;
