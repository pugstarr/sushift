const Organization = require('../models/org');
const User = require('../models/User');
const TempUser = require('../models/TempUser');

// Create new org
const createOrganization = async (req, res) => {
  const { name } = req.body;
  try {
    let organization = await Organization.findOne({ name });
    if (organization) return res.status(400).json({ msg: 'Organization already exists' });

    // Generate a random, unique joinCode
    let joinCode;
    let isUnique = false;
    while (!isUnique) {
      joinCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
      const existingOrganization = await Organization.findOne({ joinCode });
      if (!existingOrganization) {
        isUnique = true;
      }
    }

    organization = new Organization({ name, joinCode });
    await organization.save();
    res.status(201).json({ msg: 'Organization created successfully', organization });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add user
const addUserToOrganization = async (req, res) => {
  const { userId, joinCode } = req.body;
  try {
    const organization = await Organization.findOne(joinCode);
    const user = await User.findById(userId);

    if (!organization || !user) {
      return res.status(404).json({ msg: 'Organization or user not found' });
    }

    // Prevent dups
    if (!organization.users.includes(userId)) {
      organization.users.push(userId);
      await organization.save();
    }

    res.json({ msg: 'User added to organization successfully', organization });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const addTempUserToOrganization = async (req, res) => {
  const { name } = req.body;
  try {
    let tempUser = new TempUser({ name });
    await tempUser.save();
    res.status(201).json({ msg: 'Temp user added successfully', tempUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

const editTempUser = async (req, res) => {
  const { id, name, availability } = req.body;
  try {
    const tempUser = await TempUser.findByIdAndUpdate(id, { name, availability }, { new: true });
    if (!tempUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User updated successfully', tempUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Remove a user
const removeUserFromOrganization = async (req, res) => {
  const { userId, orgId } = req.body;
  try {
    const organization = await Organization.findById(orgId);

    if (!organization) {
      return res.status(404).json({ msg: 'Organization not found' });
    }

    // Remove the user
    organization.users = organization.users.filter(user => user.toString() !== userId);
    await organization.save();

    res.json({ msg: 'User removed from organization successfully', organization });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete org
const deleteOrganization = async (req, res) => {
  const { orgId } = req.body;
  try {
    const organization = await Organization.findByIdAndDelete(orgId);

    if (!organization) {
      return res.status(404).json({ msg: 'Organization not found' });
    }

    res.json({ msg: 'Organization deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const getOrganizations =  async (req, res) => {
  //const {userId} = req.body // so you can only see ur own orgs, for later tho
    try {
      const organizations = await Organization.find({});
      res.json(organizations);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };

module.exports = {
  createOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
  deleteOrganization,
  getOrganizations,
  addTempUserToOrganization,
  editTempUser
};
