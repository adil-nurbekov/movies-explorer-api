const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
});
module.exports = mongoose.model('user', userSchema);
