import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';



export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,   // Important to prevent JavaScript access to the cookie
    secure: process.env.NODE_ENV !== 'development',  // Only use secure cookies in production
    sameSite: 'None',  // Allow cross-origin requests (important for ngrok or different front-end ports)
    maxAge: 15 * 24 * 60 * 60 * 1000,  // Cookie expires in 15 days
  });
};
  
  



export const loginHelper = async (email, password) => { // 'res' object yahan se hata dein
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User nahi mila ya email ghalat hai');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Ghalat password');
  }


  return user; 
};