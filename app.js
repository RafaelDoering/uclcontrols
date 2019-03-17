const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Course = require('./models/course');

mongoose.connect('mongodb+srv://admin:admin123@uclexemplobd-hm9ov.mongodb.net/test?retryWrites=true');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const db = mongoose.connection;
db.on('error', console.log('connection error'));
db.once('open', () => console.log('connected to database'));

app.post('/', (req, res) => res.send('UCL turma 1'))

app.get('/courses/:id', (req, res) => {
  res.send('GET /courses/:id')
})

app.get('/courses', (req, res) => {
  res.send('GET /courses')
})

app.post('/courses', (req, res) => {
  const newCourse = new Course();

  newCourse.name = req.body.name

  newCourse.save((err, createdCourse) => {
    if(err){
      res.send('error')
    }else{
      res.send(createdCourse)
    }
  });
})

app.put('/courses', (req, res) => {
  res.send('PUT /courses')
})

app.delete('/courses/:id', (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, deletedCourse) => {
    if (err) {
      return res.send('error');
    }else{
      return res.send(deletedCourse)
    }
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))