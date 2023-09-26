import { createRemoteJWKSet, jwtVerify } from 'jose';

// Create a json web key set from the public URI, handling key rotation and limiting calls.
// See https://github.com/panva/jose/blob/HEAD/docs/functions/jwks_remote.createRemoteJWKSet.md for details and additional configuration.
const JWKS = createRemoteJWKSet(new URL(`${process.env.SSO_ISSUER}/protocol/openid-connect/certs`))

/**
 * Retrieve the bearer token from a request. Throws an error message if expected header is missing or malformed.
 * 
 * @param {*} req - A request object
 * @returns String
 */
const getAuthorizationBearerToken = (req) => {
    const auth_header = req.headers?.authorization
    if (!auth_header) {
        throw 'No authorization header supplied'
    }
    if (!auth_header.startsWith('Bearer ')) {
        throw 'Auth header not formatted as bearer token.'
    }
    return auth_header.split('Bearer ')[1];
}

/**
 * Check if a request includes a valid access token. Can be used on routes that allow machine-to-machine integrations with 
 * a service account where there is no user session to check.
 * 
 * @param {*} req - A request object 
 * @returns {Object} - An object with "authenticated" key. If true, user is valid. Otherwise they are not authenticated.
 */
export const hasValidBearerToken = async (req) => {
    try {
        const token = getAuthorizationBearerToken(req)

        /* jwtVerify will throw an error if invalid. IMPORTANT: Must check the audience here to ensure the claim is from your client, 
           and not another client in the same realm. Without this check supplied, other applications could use their access tokens
           successfully. You can use the payload to view the verified token contents.
        */ 
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: process.env.SSO_ISSUER,
            audience: process.env.SSO_CLIENT_ID,
        })
        return { authenticated: true }
    } catch (e) {
        console.log(e)
        return { authenticated: false, error: e }
    }
}