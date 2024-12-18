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

patientSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

patientSchema.virtual('scannedImg', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'user',
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
