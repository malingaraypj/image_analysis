const AppError = require('../utils/AppError');
const infoCardsData = require('./../data/infoCardsdata');

exports.getInfoCards = (req, res, next) => {
  res.json({
    status: 'success',
    data: infoCardsData,
  });
};

exports.getInfoCard = (req, res, next) => {
  const id = req.params.id * 1;
  const data = infoCardsData.find((item) => item.id === id);


  if (!data) {
    return next(
      new AppError(
        'couldnot able to find card with that id',
        404
      )
    );
  }
  res.json({
    status: 'success',
    data,
  });
};
