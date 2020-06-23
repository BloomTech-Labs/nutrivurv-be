const router = require('express').Router();
const { Users } = require('../controllers');
const hashPassword = require('../../utils/hashPassword');
const generateToken = require('../../utils/generateToken');
const validateLogin = require('../../utils/validateLogin');

router.post('/register',async (req, res) => {
  const registrationDetails = req.body;
  const hash = await hashPassword(registrationDetails.password);
  const newUser = { ...registrationDetails,  password: hash }
  try {
    const registeredUser = await Users.addUser(newUser);
    const token = generateToken(registeredUser.id);
    return registeredUser.name === 'ERROR' && registeredUser.severity === 'error'
      ? res.status(401).json({ message: 'error registering user' })
      : res.status(201).json({ message: `${registeredUser.email} registered!`, token })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const logginIn = await Users.getUserBy({ email });
    const checkUser = { email: logginIn.email, password: logginIn.password }
    if (checkUser){
      const { user, token } = await validateLogin(password, checkUser)
      res.status(200).json({ message: `Welcome ${user.email}`, token })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;