const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = 3000;

const dbPassword = '<password>'

mongoose.connect(`mongodb+srv://uclcontrolsadmin:${dbPassword}@uclcontrols-db-wbpwk.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database.')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  return res.json('UCLControl API');
});

app.listen(port, () => console.log(`Server listening on port ${port}.`))