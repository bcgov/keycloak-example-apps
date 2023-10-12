import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const { integrationID, environment, rolename } = req.query
    const accessToken = await fetchCssApiCredentials();

    // Delete a role in a given integration and Environment. 
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Role-Mapping for details.
    if (req.method === 'DELETE') {
        await fetch(`${process.env.SSO_API_URL}/integrations/${integrationID}/${environment}/roles/${rolename}`, {
            headers: { authorization: `Bearer ${accessToken}` },
            method: 'DELETE'
        })
        .then(handleStatusError)
        res.status(200).send()
    }
}

export default apiErrorHandler(handler);