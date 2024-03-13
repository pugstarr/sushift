const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
  morning: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TempUser' }],
  night: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TempUser' }],
  fullDay: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TempUser' }]
});

const scheduleSchema = new mongoose.Schema({
  org: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizations', required: true },
  weekOf: { type: Date, required: true },
  monday: dayScheduleSchema,
  tuesday: dayScheduleSchema,
  wednesday: dayScheduleSchema,
  thursday: dayScheduleSchema,
  friday: dayScheduleSchema,
  saturday: dayScheduleSchema,
  sunday: dayScheduleSchema
});

module.exports = mongoose.model('Schedule', scheduleSchema);