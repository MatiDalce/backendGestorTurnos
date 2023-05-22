const jwt = require('jsonwebtoken');

const signInController = {
  log: async (req, res) => {
    try {
      const user = { password: "consultorio23" }; //

      if (user) {
        const password = user.password;
        const papaya = { papaya: "papaya" };

        const isMatch = req.body.password === password;
        if (isMatch) {
          const token = generateJwtToken(papaya); // Generate JWT token

          return res.json({ token: token }); // Return the token in the response
        }
      }

      return res.send("no");
    } catch (err) {
      res.status(400).json({ errors: 'Server error' });
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
