const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = models.Character || model('Character', characterSchema);
