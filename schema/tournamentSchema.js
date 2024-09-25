const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const tournamentSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  participants: { type: Number },
});

module.exports = models.Tournament || model('Tournament', tournamentSchema);
