const express = require('express');
const route = express.Router();
const cryptoController = require('../controllers/CryptoController');


route.get('/stats',cryptoController.cryproStats);
route.get('/deviation',cryptoController.cryproDeviation);

module.exports = route;