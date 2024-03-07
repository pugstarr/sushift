const mongoose = require('mongoose');

const dayScheduleSchema = new mongoose.Schema({
    morning: [String], 
    night: [String],
    fullDay: [String]
});

const userScheduleSchema = new mongoose.Schema({
    org: {type: mongoose.Schema.Types.ObjectId, ref: 'organizations'},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TempUser' 
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
