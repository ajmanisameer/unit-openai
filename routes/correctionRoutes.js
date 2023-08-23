const express = require('express');
const correctionsController = require('../controllers/correctionsController');

const router = express.Router();

router.post('/corrections', correctionsController.postCorrection);

router.get('/corrections', correctionsController.getAllCorrections);

router.get('/random', correctionsController.getRandomCorrection);


module.exports = router;