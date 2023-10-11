import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const { integrationID, environment, username } = req.query
    const accessToken = await fetchCssApiCredentials();

    // Add a role to the provided user.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Role-Mapping for details.
    if (req.method === 'POST') {
        const roles = await fetch(`${process.env.SSO_API_URL}/integrations/${integrationID}/${environment}/users/${username}/roles`, {
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