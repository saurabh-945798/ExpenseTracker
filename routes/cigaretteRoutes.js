const express = require('express');
const router = express.Router();
const { addCigarette, getCigarettes, deleteCigarette } = require('../controllers/cigaretteController');

router.post('/', addCigarette);
router.get('/', getCigarettes);
router.delete('/:id', deleteCigarette);

module.exports = router;
