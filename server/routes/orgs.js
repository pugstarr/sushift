const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/orgController');

// Routes for organizations
router.post('/create', organizationController.createOrganization);
router.post('/addUser', organizationController.addUserToOrganization);
router.post('/removeUser', organizationController.removeUserFromOrganization);
router.delete('/delete', organizationController.deleteOrganization);
router.get('/get',organizationController.getOrganizations)

module.exports = router;
