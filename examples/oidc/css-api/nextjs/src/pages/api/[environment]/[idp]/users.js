import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const accessToken = await fetchCssApiCredentials();
    const {environment, idp, firstName, lastName, email, name, login } = req.query;

    // Append any supplied query parameters
    let url = `${process.env.SSO_API_URL}/${environment}/${idp}/users?`;
    Object.entries({firstName, lastName, email, name, login}).forEach(([key, val]) => {
        if (val) url += `${key}=${val}&`
    })
    
    // Get all users matching the search criteria.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Users for details.
    const users = await fetch(url, {
        headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(handleStatusError)
    .then(res => res.json());    
    res.status(200).json(users)
}

export default apiErrorHandler(handler);