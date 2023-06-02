const jwt = require('jsonwebtoken');

const signInController = {
  log: async (req, res) => {
    try {
      const user = { password: "paraquelaqueres" };
      console.log(req.body.password);

      if (user) {
        const password = user.password;
        const papaya = { papaya: "papaya" };

        const isMatch = req.body.password === password;
        if (isMatch) {
          const token = generateJwtToken(papaya); // Generate JWT token
          console.log("Token generated:", token); // Log the generated token
          return res.json({ token: token }); // Return the token in the response
        } else {
          console.log("Incorrect password");
          // Return error response for unmatched password
          return res.status(401).json({ error: 'Incorrect password' });
        }
      } else {
        console.log("User not found");
        // Return error response for missing user
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.error(err); // Print the error to the console for debugging
      // Return generic error response for other exceptions
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

function generateJwtToken(papaya) {
  const secretKey = process.env.SECRET_KEY; // Replace with your own secret key

  const payload = {
    id: 3,
    username: "Ariel",
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60) // Set expiration time to 2 hours from now
    // Add any additional user information as needed
  };

  const token = jwt.sign(payload, secretKey);

  return token;
}

module.exports = signInController;
