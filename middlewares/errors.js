const errorHandler = (err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(err.name).send({ message: err.message });
  }
  const { status = 500, message } = err;
  res
    .status(err.status)
    .send({ message: status === 500 ? 'server error' : message });
};
module.exports = errorHandler;
