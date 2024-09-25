const Player = require('../schema/playerSchema');
const Tournament = require('../schema/TournamentSchema');

// Fetch all tournaments
const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Fetch a specific tournament by ID
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

const getTournamentsByPlayer = async (req, res) => {
  const { playerId } = req.params;

  try {
    // Fetch the player by ID
    const player = await Player.findById(playerId).populate(
      'participations.tournamentId'
    );
    if (!player) {
      return res.status(404).send('Player not found');
    }

    // Extract the tournaments from the player's participations
    const tournamentIds = player.participations.map(
      (participation) => participation.tournamentId
    );

    // Fetch the tournament details for those IDs
    const tournaments = await Tournament.find({ _id: { $in: tournamentIds } });

    res.send(tournaments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add player participation in a tournament
const addPlayerParticipation = async (req, res) => {
  const { position, matches, wins } = req.body;
  const { playerId, tournamentId } = req.params;

  try {
    // Fetch player and tournament
    const player = await Player.findById(playerId);
    const tournament = await Tournament.findById(tournamentId);

    if (!player) {
      return res.status(404).send('Player não encontrado');
    }
    if (!tournament) {
      return res.status(404).send('torneio não encontrado');
    }
    // Check if player is already participating in the tournament
    if (
      player.participations.some(
        (participation) =>
          participation.tournamentId.toString() === tournamentId
      )
    ) {
      return res.status(400).send('Jogador já está participando deste torneio');
    }

    // Add tournament participation data to player
    player.participations.push({
      tournamentId: tournament._id,
      position,
      matches,
      wins,
    });

    // Recalculate stats after participation is added
    await recalculatePlayerStats(player);

    await player.save();
    res.send(player);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const removePlayerParticipation = async (req, res) => {
  const { playerId, tournamentId } = req.params;

  try {
    // Fetch player
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).send('Player not found');
    }

    // Check if player participated in the tournament
    const participationIndex = player.participations.findIndex(
      (participation) => participation.tournamentId.toString() === tournamentId
    );

    if (participationIndex === -1) {
      return res
        .status(404)
        .send('Player did not participate in this tournament');
    }

    // Remove participation from the player's participations array
    player.participations.splice(participationIndex, 1);

    // Recalculate player stats after removing participation
    await recalculatePlayerStats(player);

    // Save updated player data
    await player.save();

    res.send(player);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Recalculate player stats (ranking, Q.F, Q.C, etc.) after each tournament
const recalculatePlayerStats = (player) => {
  let totalMatches = 0;
  let totalWins = 0;
  let totalTournaments = player.participations.length;
  let ranking = 0;
  let firstPlace = 0;
  let secondPlace = 0;
  let thirdPlace = 0;
  let top8 = 0;

  player.participations.forEach((participation) => {
    totalMatches += participation.matches;
    totalWins += participation.wins;

    if (participation.position === 1) firstPlace++;
    if (participation.position === 2) secondPlace++;
    if (participation.position === 3) thirdPlace++;
    if (participation.position <= 8) top8++;

    ranking += calculateRankingPoints(participation.position);
  });

  player.ranking = ranking;
  player.coeficienteForca =
    totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;
  player.coeficienteConsistencia =
    totalTournaments > 0
      ? (player.participations.length / totalTournaments) * 100
      : 0;
  player.pontosExperiencia = totalMatches;
  player.numberFirstPlace = firstPlace;
  player.numberSecondPlace = secondPlace;
  player.numberThirdPlace = thirdPlace;
  player.numberTop8 = top8;
  player.numberTotalTournaments = totalTournaments;
  player.totalMatches = totalMatches;
  player.totalWins = totalWins;
  player.level = calculateLevel(ranking);
};

// Calculate ranking points based on the player's position
const calculateRankingPoints = (position) => {
  if (position === 1) return 350;
  if (position === 2) return 335;
  if (position === 3) return 325;
  if (position === 4) return 300;
  if (position === 5) return 260;
  if (position === 6) return 250;
  if (position >= 7 && position <= 16) return 260 - (position - 5) * 10;
  return 100; // For positions below 16th
};

const calculateLevel = (ranking) => {
  if (ranking <= 500) return 'Barata';
  if (ranking >= 501 && ranking <= 550) return 'Peixe';
  if (ranking >= 551 && ranking <= 700) return 'Humano';
  if (ranking >= 701 && ranking <= 1500) return 'Demônio';
  if (ranking >= 1501 && ranking <= 2000) return 'Lúcifer';
  if (ranking >= 2001 && ranking >= 2500) return 'Tekken God';
};

// Add a new tournament and update player stats
const addTournament = async (req, res) => {
  const { name, participants } = req.body;

  try {
    const tournament = new Tournament({ name, participants });
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a tournament and update player stats
const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);

    if (!tournament) return res.status(404).send('Torneio não encontrado');

    const players = await Player.find({ 'participations.tournamentId': id });

    // Remove tournament from players' participations
    for (let player of players) {
      player.participations = player.participations.filter(
        (participation) => participation.tournamentId.toString() !== id
      );
      await recalculatePlayerStats(player); // Recalculate stats after removal
      await player.save();
    }

    await tournament.remove();
    res.send('Torneio removido e estatísticas dos jogadores atualizadas');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Fetch all players
const getTodosJogadores = async (req, res) => {
  try {
    const jogadores = await Player.find().sort({ ranking: -1 }); // Sort by ranking in descending order
    res.send(jogadores);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add a new player
const adicionarJogador = async (req, res) => {
  const { nome, foto, personagemPrincipal, personagemSecundario } = req.body;

  if (!nome || !foto || !personagemPrincipal || !personagemSecundario) {
    return res.status(400).send('Todos os dados do jogador são obrigatórios.');
  }

  const jogador = new Player({
    nome,
    foto,
    personagemPrincipal,
    personagemSecundario,
  });

  try {
    const novoJogador = await jogador.save();
    res.status(201).json(novoJogador);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Fetch a specific player by ID
const getJogadorPorId = async (req, res) => {
  try {
    const jogador = await Player.findById(req.params.id);
    if (!jogador) {
      return res.status(404).send('Jogador não encontrado');
    }
    res.json(jogador);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a player's information
const atualizarJogador = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const player = await Player.findById(id);
    if (!player) return res.status(404).send('Jogador não encontrado');

    Object.assign(player, updates);
    await player.save();
    res.send(player);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a player
const deletarJogador = async (req, res) => {
  const { id } = req.params;
  try {
    const jogadorDeletado = await Player.findByIdAndDelete(id);
    if (!jogadorDeletado) {
      return res.status(404).send('Jogador não encontrado');
    }
    res.send(`Jogador com ID: ${id} removido com sucesso`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodosJogadores,
  adicionarJogador,
  getJogadorPorId,
  atualizarJogador,
  deletarJogador,
  addPlayerParticipation,
  getAllTournaments,
  getTournamentById,
  addTournament,
  deleteTournament,
  recalculatePlayerStats,
  removePlayerParticipation,
  getTournamentsByPlayer,
};
