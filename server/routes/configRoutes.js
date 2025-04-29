// --------------------------------------IMPORT----------------------------------------
// Import dependencies
const express = require('express');

// Import controllers
const configController = require('../controllers/configController');

// --------------------------------------ROUTES----------------------------------------
const configRouter = express.Router();

configRouter.get('/channels', configController.readAllChannels);


module.exports = configRouter;