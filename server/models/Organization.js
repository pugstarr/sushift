const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tempUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TempUser' }], 
  joinCode: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Organizations', organizationSchema);
