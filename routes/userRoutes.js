const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middleware/authMiddleware'); 

const {
  getProfile,
  uploadProfileImage,
  updateProfile
} = require('../controllers/userController');

// ⚙️ Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// 📌 Routes
router.get('/profile', verifyToken, getProfile);
router.post('/uploadProfileImage', verifyToken, upload.single('profileImage'), uploadProfileImage);
router.put('/update', verifyToken, updateProfile);

module.exports = router;
