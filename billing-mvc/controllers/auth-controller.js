const userModel = require('../models/user-model');

const register = async (req, res, next) => {
  try {
    const existUser = await userModel.getUserByUsername(req.body.username);
    if (existUser) {
      return res.status(400).json({ message: 'user is already in use' });
    }
    await userModel.createUser(req.body);
    res.status(201).json({ message: 'success' });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {};
const changePassword = (req, res, next) => {};

module.exports = {
  register,
  login,
  changePassword
};
