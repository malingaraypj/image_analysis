const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const infoCardsData = require('./../data/infoCardsdata');

exports.getInfoCards = catchAsync(async (req, res, next) => {
  res.json({
    status: 'success',
    data: infoCardsData,
  });
});

exports.getInfoCard = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const data = infoCardsData.find((item) => item.id === id);

  if (!data) {
    return next(
      new AppError('couldnot able to find card with that id', 404)
    );
  }
  res.json({
    status: 'success',
    data,
  });
});
