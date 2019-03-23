//routes

const express = require('express');

const apiController = require('../controllers/api')

const router = express.Router();

router.get('/courses/:id', apiController.get)

router.get('/courses', apiController.gets)

router.post('/courses', apiController.create)

router.put('/courses', apiController.edit)

router.delete('/courses', apiController.delete)

module.exports = router;