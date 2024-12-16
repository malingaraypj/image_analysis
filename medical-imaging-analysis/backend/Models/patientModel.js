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
    // scannedImg: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Image',
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

patientSchema.virtual('scannedImg', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'user',
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
