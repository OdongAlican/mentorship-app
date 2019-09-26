/* eslint-disable import/no-extraneous-dependencies */
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/trial');
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
