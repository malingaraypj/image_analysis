const mongoose = require('mongoose');
const Image = require('./../Models/ImageModel');
const Patient = require('./../Models/patientModel');
const dotenv = require('dotenv');

dotenv.config({ path: './../config.env' });

const updateExistingDocuments = async () => {
  try {
    console.log(process.env.LOCAL_DB);
    await mongoose.connect(process.env.LOCAL_DB);

    console.log('Database connected!');

    const updatedImages = await Image.updateMany(
      { createdAt: { $exists: false } }, // Check if createdAt is missing
      { $set: { createdAt: new Date() } } // Set createdAt to the current date
    );

    // const updatedPatients= await Patient.updateMany({
    //     createdAt:{$exists:false},
    //     {$set:}
    // })

    console.log(`${updatedImages.modifiedCount} image(s) updated!`);
  } catch (err) {
    console.error('Error updating documents:', err);
  } finally {
    mongoose.connection.close();
  }
};

updateExistingDocuments();
