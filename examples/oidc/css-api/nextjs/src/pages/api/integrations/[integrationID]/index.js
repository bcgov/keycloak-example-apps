import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const {integrationID} = req.query
    const accessToken = await fetchCssApiCredentials();

    // Get a specific integration's details.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Integrations/get_integrations__integrationId_ for details.
    const integration = await fetch(`${process.env.SSO_API_URL}/${integrationID}`, {
        headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(handleStatusError)
    .then(res => res.json())
    res.status(200).json(integration)
}

export default apiErrorHandler(handler)