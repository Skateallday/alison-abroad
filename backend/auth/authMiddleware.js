import jwt from 'jsonwebtoken';

// Middleware for JWT token validation
function authenticateToken(req, res, next) {
  // Get the JWT token from the request cookie
  const token = req.cookies.jwtToken;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded token to the request object for further use
    req.decodedToken = decodedToken;

    // Call the next middleware
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: `Invalid token: ${error.message}` });
  }
}
export { authenticateToken };

