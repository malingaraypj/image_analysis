const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
      default: '',
    },
    medicalAllergy: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'dummy',
    },
  },
  { timestamps: true }
);


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
