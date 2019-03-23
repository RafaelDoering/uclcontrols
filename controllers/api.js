//controllers
const Course = require('../models/course')

module.exports.get = (req, res) => {
  Course.findById(req.params.id, (err, courseFound) => {
    if(err){
      res.send('error');
    }else{
      res.send(courseFound);
    }
  });
}

module.exports.gets = (req, res) => {
  Course.find({}, (err, courses) => {
    if(err){
      res.send('error')
    }else {
      res.send(courses)
    }
  })
}

module.exports.create = (req, res) => {
  const newCourse = new Course();

  newCourse.name = req.body.name;

  newCourse.save((err, createdCourse) => {
    if(err){
      res.send('error');
    }else{
      res.send(createdCourse);
    }
  });
}

module.exports.edit = (req, res) => {
  Course.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}}, (err, courseEdited) => {
    if(err){
      res.send('error');
    }else {
      res.send(courseEdited);
    }
  });
}

module.exports.delete = (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err, courseDeleted) => {
    if(err){
      res.send('error');
    }else{
      res.send(courseDeleted);
    }
  });
}