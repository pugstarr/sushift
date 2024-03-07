const Sched = require('../models/Schedule'); 

// Get all schedules
exports.getAllScheds = async (req, res) => {
    try {
        const scheds = await Sched.find();
        res.json(scheds);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Create a new schedule
exports.createSched = async (req, res) => {
    try {
        const newSched = new Sched(req.body);
        const savedSched = await newSched.save();
        res.status(201).json(savedSched);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a single schedule by id
exports.getSchedById = async (req, res) => {
    try {
        const sched = await Sched.findById(req.params.id);
        res.json(sched);
    } catch (error) {
        res.status(404).send(error);
    }
};

// Update a schedule by id
exports.updateSchedById = async (req, res) => {
    try {
        const updatedSched = await Sched.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSched);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a schedule by id
exports.deleteSchedById = async (req, res) => {
    try {
        await Sched.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).send(error);
    }
};
