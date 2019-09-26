/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/trial');

const mentorSchema = new Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  expertize: {
    type: String,
    min: 3,
    required: true,
  },
});


module.exports = mongoose.model('Mentors', mentorSchema);
