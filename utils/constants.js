const invalidErrorMessage = 'invalid email or password';
const inputErrorMessage = 'enter email and password';
const noDataErrorMessage = 'please input data';
const notUrlErrorMessage = 'input must be an URL';
const userErrorStatus = 400;

const authErrorStatus = 401;
const authErrorMessage = 'need an authorization';

const forbiddenErrorStatus = 403;
const forbiddenErrorMessage = 'you can`t delete or change other users info';

const notFoundErrorStatus = 404;
const notFoundErrorMessage = 'not found';

const userExistErrorStatus = 409;
const userExistErrorMessage = 'email already exist';

const serverErrorMessage = 'server error';
const serverErrorStatus = 500;

module.exports = {
  serverErrorStatus,
  serverErrorMessage,
  noDataErrorMessage,
  userErrorStatus,
  userExistErrorStatus,
  userExistErrorMessage,
  notFoundErrorStatus,
  notFoundErrorMessage,
  inputErrorMessage,
  invalidErrorMessage,
  authErrorStatus,
  authErrorMessage,
  forbiddenErrorStatus,
  forbiddenErrorMessage,
  notUrlErrorMessage,
};
