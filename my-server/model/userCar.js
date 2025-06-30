// models/UserCar.js
const mongoose = require('mongoose');

const userCarSchema = new mongoose.Schema({
  userData: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carData: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('UserCar', userCarSchema);
