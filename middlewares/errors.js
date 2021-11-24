const errorHandler = (err, req, res, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(err.name).send({ message: err.message });
  }
  return res.status(500).send({ message: 'server error' });
};
module.exports = errorHandler;
