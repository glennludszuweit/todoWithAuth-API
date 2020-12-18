import express from 'express';
import {
  register,
  unRegister,
  login,
  logout,
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/unregister', unRegister);

export default router;
