import { fetchCssApiCredentials, apiErrorHandler } from '@/utils'

async function handler(req, res) {
    const {integrationID} = req.query
    const accessToken = await fetchCssApiCredentials();

    // Get a specific integration's details.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Integrations/get_integrations__integrationId_ for details.
    const integrations = await fetch(`https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations/${integrationID}`, {
        headers: { authorization: `Bearer ${accessToken}` }
    }).then(res => res.json());

    res.status(200).json(integrations)
}

export default apiErrorHandler(handler)