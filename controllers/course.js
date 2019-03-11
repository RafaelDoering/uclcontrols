const Course = require('../models/Course');

exports.create = (req, res) => {
  var newCourse = new Course();

  newCourse.name = req.body.name;

  newCourse.save((errCourse, createdCourse) => {
    if (errCourse) {
      return res.status(400).json({
        ...errCourse
      });
    } else {
      return res.status(200).json({
        course: createdCourse
      });
    }
  });
}

exports.get = (req, res) => {
  Course.findById(req.params.id, (errCourse, courseFound) => {
    if (errCourse) {
      return res.status(400).json({
        ...errCourse
      });
    } else {
      return res.status(200).json({
        course: courseFound
      });
    }
  });
}

exports.delete = (req, res) => {
  Course.findByIdAndDelete(req.params.id, (errCourse, courseDeleted) => {
    if (errCourse) {
      return res.status(400).json({
        ...errCourse
      });
    } else if (!courseDeleted) {
      return res.status(400).json({
        errors: [
          "Disciplina não existente."
        ]
      });
    } else {
      return res.status(200).json({
        course: courseDeleted
      });
    }
  });
}

exports.edit = (req, res) => {
  const updatedFields = {};
  for (const field of Object.keys(req.body)) {
    updatedFields[field] = req.body[field];
  }

  Course.findByIdAndUpdate(req.params.id, { $set: updatedFields }, (errCourse, courseUpdated) => {
    if (errCourse) {
      return res.status(400).json({
        errors: [
          "Disciplina não existente."
        ]
      });
    } else {
      return res.status(200).json({
        course: courseUpdated
      });
    }
  });
}

exports.gets = (req, res) => {
  Course.find((errCourse, coursesFound) => {
    if (errCourse) {
      return res.status(400).json({
        ...errCourse
      });
    } else {
      return res.status(200).json({
        courses: coursesFound
      });
    }
  });
}