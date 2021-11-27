class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  // static userError(status, message) {
  //   return new ApiError(status, message);
  // }

  // static userExistError(status, message) {
  //   return new ApiError(status, message);
  // }

  // static notFoundError(status, message) {
  //   return new ApiError(status, message);
  // }
  // static authError(status, message) {
  //   return new ApiError(status, message);
  // }
  // static forbiddenError(status, message) {
  //   return new ApiError(status, message);
  // }
}

module.exports = ApiError;
