const express = require('express');

const CourseController = require('../controllers/course');

const router = express.Router();

router.post('/', CourseController.create);

router.get('/:id', CourseController.get);

router.delete('/:id', CourseController.delete);

router.get('/', CourseController.gets);

module.exports = router;