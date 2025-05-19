const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const isAuthenticated = (req, res, next) => {
  const token = req.cookies.TokenData;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
    isAuthenticated
}
