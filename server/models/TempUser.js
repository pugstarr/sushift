const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availability: {
    monday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    tuesday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    wednesday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    thursday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    friday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    saturday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
    sunday: { type: String, enum: ['none', 'morning', 'night', 'full'], default: 'none' },
  },
});

module.exports = mongoose.model('TempUser', tempUserSchema);
