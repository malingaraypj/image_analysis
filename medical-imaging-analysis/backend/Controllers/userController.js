const catchAsync = require("../utils/catchAsync");
const User = require("./../Models/userModel");

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.generateAuthToken();
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
