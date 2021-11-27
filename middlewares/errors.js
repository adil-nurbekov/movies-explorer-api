const { serverErrorMessage, serverErrorStatus } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { status = serverErrorStatus, message } = err;
  res
    .status(status)
    .send({
      message: status === serverErrorStatus ? serverErrorMessage : message,
    });
  next();
};
module.exports = errorHandler;
