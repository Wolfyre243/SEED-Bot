// Import model(s)
const configModel = require('../models/configModel');

// -----------------------------------------CONTROLLERS-----------------------------------------

module.exports.readAllChannels = (req, res, next) => {
    const callback = (error, results) => {
        if (error) {
            console.error(`Error reading config: `, error);
            res.status(500).json(error);
        } else res.status(200).json(results.rows);
    }

    configModel.selectAllChannels(callback);
}