//routes

const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.get('/courses/:id', apiController.get);

router.get('/courses', apiController.gets);

router.post('/courses', apiController.create);

router.put('/courses/:id', apiController.edit);

router.delete('/courses/:id', apiController.delete);

module.exports = router;