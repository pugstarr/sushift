const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: {
    Monday: { type: String, default: 'None' },  
    Tuesday: { type: String, default: 'None' },
    Wednesday: { type: String, default: 'None' },
    Thursday: { type: String, default: 'None' },
    Friday: { type: String, default: 'None' },
    Saturday: { type: String, default: 'None' },
    Sunday: { type: String, default: 'None' },
  },
});

module.exports = mongoose.model('TempUser', tempUserSchema);
