/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const { Schema } = mongoose;


const sessionModel = new Schema({
  name: String,
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'Mentors',
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('sessions', sessionModel);
