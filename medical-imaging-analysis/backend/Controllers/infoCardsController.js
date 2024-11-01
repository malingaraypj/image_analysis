const infoCardsData = require("./../data/infoCardsdata");

exports.getInfoCards = (req, res, next) => {
  res.json({
    status: "success",
    data: infoCardsData,
  });
};
