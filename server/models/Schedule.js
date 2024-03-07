const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
    morning: [String], // Assuming these are usernames or user IDs
    night: [String],
    fullDay: [String]
});

const userScheduleSchema = new mongoose.Schema({
    org: {type: mongoose.Schema.Types.ObjectId, ref: 'organizations'},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempUser' // or 'TempUser' depending on your user schema
    },
    week: {
        monday: dayScheduleSchema,
        tuesday: dayScheduleSchema,
        wednesday: dayScheduleSchema,
        thursday: dayScheduleSchema,
        friday: dayScheduleSchema,
        saturday: dayScheduleSchema,
        sunday: dayScheduleSchema
    },
    weekOf : Date
});

const UserSchedule = mongoose.model('UserSchedule', userScheduleSchema);

module.exports = UserSchedule;
