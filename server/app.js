// Import dependencies
const express = require('express');
// // Import routers
// const mainRouter = require('./routes/mainRoutes');

const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use('/api', mainRouter);

// Webpage
// app.use('/', express.static('public'));

app.get('/',(req,res) => {
    res.status(200).send("SEDE reporting for duty!");
});

module.exports = app;