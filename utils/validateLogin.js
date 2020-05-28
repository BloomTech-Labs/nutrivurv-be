const generateToken = require('./generateToken.js');
const bcrypt = require('bcryptjs');

const validateLogin = async (pw, user) => {
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(pw, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return {
    user,
    token: generateToken(user.id),
  };
};

module.exports = validateLogin;
