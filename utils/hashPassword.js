const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  if (password.length < 8 && password.length > 16) {
    throw new Error(
      'Password must be greater than 8 characters and less than 16 characters'
    );
  }

  return bcrypt.hash(password, 10);
};

module.exports = hashPassword;
