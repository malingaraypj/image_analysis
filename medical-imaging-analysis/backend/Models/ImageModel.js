const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    default: 'dummy.png',
  },
  user: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
