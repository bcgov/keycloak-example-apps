import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const { integrationID, environment } = req.query
    const accessToken = await fetchCssApiCredentials();

    // Get all roles for a given integration and Environment. 
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Roles/get_integrations__integrationId___environment__roles for details.
    if (req.method === 'GET') {
        const roles = await fetch(`${process.env.SSO_API_URL}/${integrationID}/${environment}/roles`, {
            headers: { authorization: `Bearer ${accessToken}` }
        })
        .then(handleStatusError)
        .then(res => res.json())
        res.status(200).json(roles)
    }

    // Create a new role in the provided integration and environment.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Roles/post_integrations__integrationId___environment__roles for details.
    else if (req.method === 'POST') {
        const roles = await fetch(`${process.env.SSO_API_URL}/${integrationID}/${environment}/roles`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: req.body,
            method: "POST"
        })
        if (roles.status >= 400) {
            const status = roles.status >= 500 ? 500 : 400
            const message = await roles.json()
            res.status(status).json(message)
        } else {
            res.status(200).send()
        }
    }
}

export default apiErrorHandler(handler);