import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access Deneid');
  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
