const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Image = require('./../Models/ImageModel');

const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/scannedImages');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.scannedImage = upload.single('photo');

exports.uploadScanImage = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  req.body.user=req.user;

  const newImage = await Image.create(req.body);

  if (!newImage) {
    return next(new AppError('Please upload a image properly', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: newImage,
    },
  });
});
