const Sched = require('../models/Schedule'); 
const Organization = require('../models/Organization');

// Get all schedules
const getAllScheds = async (req, res) => {
    try {
        const scheds = await Sched.find();
        res.json(scheds);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getScheduleByWeekOf = async (req, res) => {
  const { orgId, weekOf } = req.params;
  try {
    const organization = await Organization.findById(orgId).populate({
      path: 'schedules',
      match: { weekOf: new Date(weekOf) },
      populate: {
        path: 'monday.morning monday.night monday.fullDay tuesday.morning tuesday.night tuesday.fullDay wednesday.morning wednesday.night wednesday.fullDay thursday.morning thursday.night thursday.fullDay friday.morning friday.night friday.fullDay saturday.morning saturday.night saturday.fullDay sunday.morning sunday.night sunday.fullDay',
        model: 'TempUser'
      }
    });

    if (!organization) {
      return res.status(404).json({ msg: 'Organization not found' });
    }

    let schedule = organization.schedules[0];

    if (!schedule) {
      // If no schedule exists for the current week, create a new one
      schedule = new Sched({ org: orgId, weekOf: new Date(weekOf) });
      await schedule.save();

      organization.schedules.push(schedule._id);
      await organization.save();
    }

    res.json({ schedule });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

const createSchedule = async (req, res) => {
  const { orgId, weekOf } = req.body;

  try {
    const organization = await Organization.findById(orgId);
    if (!organization) {
      return res.status(404).json({ msg: 'Organization not found' });
    }

    const existingSchedule = await Sched.findOne({ org: orgId, weekOf: new Date(weekOf) });
    if (existingSchedule) {
      return res.status(400).json({ msg: 'Schedule already exists for the given week' });
    }

    const schedule = new Sched({ org: orgId, weekOf: new Date(weekOf) });
    await schedule.save();

    organization.schedules.push(schedule._id);
    await organization.save();

    res.status(201).json({ msg: 'Schedule created successfully', schedule });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
  
const updateSchedule = async (req, res) => {
  const { scheduleId } = req.params;
  const updateData = req.body;

  try {
    const schedule = await Sched.findByIdAndUpdate(scheduleId, updateData, { new: true });
    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }

    res.json({ msg: 'Schedule updated successfully', schedule });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


// Delete a schedule by id
const deleteSchedById = async (req, res) => {
    try {
        await Sched.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = { getAllScheds, getScheduleByWeekOf, createSchedule, updateSchedule, deleteSchedById };