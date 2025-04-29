// --------------------------------------IMPORT----------------------------------------
// Import dependencies
const express = require('express');

// Import routers
const configRoutes = require('./configRoutes');

// --------------------------------------ROUTES----------------------------------------
const mainRouter = express.Router();

// TODO: Implement security
mainRouter.use('/config', configRoutes);

// Export the main router
module.exports = mainRouter;