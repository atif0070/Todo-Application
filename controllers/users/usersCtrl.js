const appErr = require("../../utils/appErr");
const User = require("../../models/user/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const registerUserCtrl = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound) {
      return next(appErr("User Already Exists"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    res.json({ status: "Success", newUser });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};
const fetchAllUsersCtrl = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json({ status: "Success", users });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};

const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      return next(appErr("Invalid Credentials"));
    }
    const ispasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!ispasswordMatch) {
      return next(appErr("Invalid Credentials"));
    }

    res.json({
      status: "Success",
      message: "User is Logged In",
      username: userFound.username,
      email: userFound.email,
      userId: userFound.userId,
      token: generateToken(userFound.userId),
    });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};

const updateUserCtrl = async (req, res, next) => {
  const { username, email, password } = req.body;
  const { userId } = req;

  try {
    const userFound = await User.findByPk(userId);

    if (username) {
      userFound.username = username;
    }
    if (email) {
      userFound.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      userFound.password = hashPassword;
    }
    await userFound.save();

    res.json({ message: "User Updated", userFound });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};
const deleteUserCtrl = async (req, res, next) => {
  const { userId } = req;

  try {
    const userFound = await User.findByPk(userId);
    if (!userFound) {
      return next(appErr("User does not exist"));
    }

    await userFound.destroy();
    res.json({ message: "User is deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  fetchAllUsersCtrl,
  updateUserCtrl,
  deleteUserCtrl,
};
