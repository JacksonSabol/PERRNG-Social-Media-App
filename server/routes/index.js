const express = require('express');

const router = express.Router();

module.exports = () => {
    // The health-check route
    router.get('/health', async (req, res) => res.sendStatus(200));

    // Mount routes on their respective paths.
    // Routes start with api/, which is defined under server/index.js
    // e.g. router.use('/users', userRoutes(params));

    // Return the router object
    return router;
};
