const mongoose = require('mongoose');

const cigaretteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cigaretteType: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" }
});

const Cigarette = mongoose.model('Cigarette', cigaretteSchema);

module.exports = Cigarette;
