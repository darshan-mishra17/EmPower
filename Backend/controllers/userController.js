const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updatePreferences = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    user.accessibilityPreferences = req.body;
    await user.save();
    res.json(user.accessibilityPreferences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getChildren = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'parent') {
      return res.status(404).json({ message: 'User not found or not a parent' });
    }
    if (user.id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const children = await User.find({ _id: { $in: user.childProfiles.map(cp => cp.childId) } }).select('-password');
    res.json(children);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getProfile, updatePreferences, getChildren };
