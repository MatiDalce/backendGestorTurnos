const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; // Replace with your own secret key

module.exports = function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.replaceAll('"', ""); // Check if the authorization header exists

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      console.log("Token decoded:", decoded);
      // Store the decoded token payload in the request object for future use
      req.decodedToken = decoded;
      next(); // Proceed to the next middleware or route handler
    }
  } catch (err) {
    console.error(err);
    console.log("Invalid token");
    return res.status(403).json({ error: 'Invalid token' });
  }
};
