const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const participationSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  matches: {
    type: Number,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
});

const playerSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    foto: { type: String, required: true, trim: true },
    personagemPrincipal: { type: String, trim: true },
    personagemSecundario: { type: String, trim: true },
    participations: [participationSchema],
    ranking: { type: Number, default: 0 },
    coeficienteForca: { type: Number, default: 0 },
    coeficienteConsistencia: { type: Number, default: 0 },
    pontosExperiencia: { type: Number, default: 0 },
    numberFirstPlace: { type: Number, default: 0 },
    numberSecondPlace: { type: Number, default: 0 },
    numberThirdPlace: { type: Number, default: 0 },
    numberTop8: { type: Number, default: 0 },
    totalMatches: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    numberTotalTournaments: { type: Number, default: 0 },
    level: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = models.Player || model('Player', playerSchema);
