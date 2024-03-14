const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('TempUser', tempUserSchema);