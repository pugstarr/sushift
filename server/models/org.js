const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  joinCode:{
    type: Number,
    required: true,
    unique: true
  } 
  //todo mayb a managers one?
});

module.exports = mongoose.model('Organizations', organizationSchema);
