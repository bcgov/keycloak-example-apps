import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { hasValidBearerToken } from '@/utils/auth'

export default async (req, res) => {
  let authenticated = false;
  let authError = '';

  // Check the next-auth session to see if a logged-in user is accessing the route.
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    authenticated = true;
  }

  // Otherwise, check if a valid, signed access token is supplied to allow for machine-to-machine calls.
  else {
    const { authenticated: m2mAuthenticated, error } = await hasValidBearerToken(req)
    authenticated = m2mAuthenticated;
    authError = error;
  }

  if (authenticated) {
    res.json({
      content:
        "This is protected content. You can access this content because you are authenticated.",
    })
  } else {
    res.status(401).json({error: authError})
  }
}