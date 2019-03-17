const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const Course = require('./models/course')

mongoose.connect('mongodb+srv://admin:admin123@ucldb-rvys5.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('UCL turma 2'))

app.get('/courses/:id', (req, res) => {
  res.send('GET /courses/:id')
})

app.get('/courses', (req, res) => {
  Course.find({}, (err, courses) => {
    if(err){
      res.send('error')
    }else {
      res.send(courses)
    }
  })
})

app.post('/courses', (req, res) => {
  const newCourse = new Course();

  newCourse.name = req.body.name;

  newCourse.save((err, createdCourse) => {
    if(err){
      res.send('error')
    }else{
      res.send(createdCourse)
    }
  })
})

app.put('/courses', (req, res) => {
  res.send('PUT /courses')
})

app.delete('/courses', (req, res) => {
  res.send('DELETE /courses')
})
 
app.listen(3000)