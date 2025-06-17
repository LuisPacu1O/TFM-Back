const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game:     { type: Number, required: true },
  status:   { type: String, enum: ['finished', 'pending', 'playing', 'abandoned'], required: true },
  review:   { type: String},
  rating:   { type: Number, min: 0, max: 5 },
  duration: { type: Number}
});

const UserGame = mongoose.model('userGame', userGameSchema);

module.exports = UserGame; 