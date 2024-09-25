const Tournament = require('../schema/TournamentSchema');

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).send('Torneio não encontrado');
    }
    res.send(tournament);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
