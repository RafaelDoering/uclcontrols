const express = require('express');

const router = express.Router();

const courseRoutes = require('./course');
router.use('/course', courseRoutes);

module.exports = router;