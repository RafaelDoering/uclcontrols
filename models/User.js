const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);