import express from 'express';
import {
  register,
  unRegister,
  login,
  logout,
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/unregister', unRegister);
router.post('/login', login);
router.post('/logout', logout);

export default router;
