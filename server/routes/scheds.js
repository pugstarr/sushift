const express = require('express');
const router = express.Router();
const schedController = require('../controllers/schedController');

router.get('/:orgId/:weekOf', schedController.getScheduleByWeekOf);
router.post('/', schedController.createSchedule);
// router.get('/:id', schedController.getSchedById); // Remove or comment out this line
router.put('/:scheduleId', schedController.updateSchedule);
router.delete('/:id', schedController.deleteSchedById);

module.exports = router;