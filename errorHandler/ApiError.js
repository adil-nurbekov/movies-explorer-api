class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static userError(message) {
    return new ApiError(401, message);
  }

  static userExistError(message) {
    return new ApiError(409, message);
  }

  static notFoundError(message) {
    return new ApiError(404, message);
  }
}
module.exports = ApiError;
