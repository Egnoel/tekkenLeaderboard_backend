const express = require('express');
const router = express.Router();
const {
  getAllTournaments,
  getTournamentById,
  addTournament,
  deleteTournament,
} = require('../controller/playerController.js');

router.get('/', getAllTournaments);
router.post('/', addTournament);
router.get('/:id', getTournamentById);
router.delete('/:id', deleteTournament);

module.exports = router;
