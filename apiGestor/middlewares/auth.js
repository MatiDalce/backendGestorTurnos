const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; // Replace with your own secret key

module.exports = function verifyToken(req, res, next) {
  const token = req.headers.authorization.replaceAll('"', "" ); // Assuming the token is sent in the "Authorization" header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if(decoded){ // Store the decoded token payload in the request object for future use
    next()}; // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}


