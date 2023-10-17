const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function for our authenticated routes
  authMiddleware: function (context) {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      if (token) {
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          return { user: data };
        } catch (err) {
          throw new AuthenticationError('Invalid or expired token');
        }
      }

      throw new AuthenticationError('Authentication token must be in the format "Bearer <token>"');
    }

    throw new AuthenticationError('Authorization header must be provided');
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
