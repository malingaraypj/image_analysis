const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: 'dummy.png',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    alzheimerClass: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
