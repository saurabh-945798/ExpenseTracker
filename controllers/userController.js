const User = require('../models/User');
const path = require('path');
const fs = require('fs');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile' });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!req.file) return res.status(400).json({ msg: 'No image uploaded' });

    // Remove old image if exists
    if (user.profileImage) {
      const oldPath = path.join(__dirname, '..', 'uploads', user.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.profileImage = req.file.filename;
    await user.save();

    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Image upload failed' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update profile' });
  }
};
