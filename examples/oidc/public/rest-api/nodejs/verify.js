const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const client = jwksClient({
  jwksUri: `${process.env.REALM_URI}/protocol/openid-connect/certs`,
  timeout: 3000,
  cache: true,
});

/**
 * Validate a received token's age, signature and claims.
 */
const validateToken = async (token) => {
  const decodedHeader = jwt.decode(token, { complete: true }).header;
  const signingKeys = await client.getSigningKey(decodedHeader.kid);

  // Throws an error if expired, invalid signature, or claims do not match. Returns the verified token otherwise.
  const verifiedToken = jwt.verify(token, signingKeys.publicKey, {
    algorithms: ['RS256'],
    audience: process.env.AUDIENCE,
    issuer: process.env.REALM_URI,
  });

  return verifiedToken;
};

/**
 * Middleware to validate bearer token from the authorization header.
 */
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // Remove Bearer substring from authorization header
  const token = authorization?.slice(7);
  if (!token) return res.status(401).end();
  
  try {
      await validateToken(token);
      next();
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};

module.exports = {
  authMiddleware,
};
