const express = require('express');
const router = express.Router();
const schedController = require('../controllers/schedController');

router.get('/', schedController.getAllScheds);

router.post('/', schedController.createSched);

router.get('/:id', schedController.getSchedById);

router.put('/:id', schedController.updateSchedById);

router.delete('/:id', schedController.deleteSchedById);

module.exports = router;
