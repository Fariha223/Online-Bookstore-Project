import jwt from 'jsonwebtoken';
import User from '../models/authUserModel.js';

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded JWT:', decode);
    req.user = { _id: decode.id }; 
    next();
  } catch (error) {
    console.log('JWT verification error:', error);
    res.status(401).send({ success: false, message: 'Unauthorized access', error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log('User found:', user);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    if (user.role !== 1) {
      return res.status(401).send({ success: false, message: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    console.log('Admin check error:', error);
    res.status(500).send({ success: false, message: 'Error in admin middleware', error });
  }
};
