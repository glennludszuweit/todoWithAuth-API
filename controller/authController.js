import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../model/authModel.js';
import {
  registerValidation,
  loginValidation,
} from '../middleware/validation.js';

export const register = async (req, res) => {
  //Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check email
  const emailExist = await Auth.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist.');

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Register user
  const user = new Auth({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const data = await user.save();
    res.send(data);
    //Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('token', token).send(token);
  } catch (error) {
    res.status(error.status).send(error);
  }
};

export const login = async (req, res) => {
  //Validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email and password is correct
  const user = await Auth.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email does not exist.');
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(400).send('Incorrect password.');

  //Token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header('token', token).send(token);
};

export const logout = (req, res) => {
  const token = jwt.sign({ data: '12345' }, 'logout', { expiresIn: 1 });
  res.send(token);
};

export const unRegister = async (req, res) => {
  const decoded = jwt.verify(req.headers.token, process.env.SECRET_TOKEN);
  const userId = decoded._id;
  try {
    await Auth.findByIdAndDelete(userId, (error, result) => {
      error ? console.log(error) : result;
    });
    res.send('user deleted.');
  } catch (error) {
    res.send(error.message);
  }
};
