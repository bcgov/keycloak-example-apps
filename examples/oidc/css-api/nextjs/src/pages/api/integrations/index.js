import { fetchCssApiCredentials, apiErrorHandler } from '@/utils'

async function handler(req, res) {
    const accessToken = await fetchCssApiCredentials();
    // Use the retrieved access token to make a request against the nextjs-api. 

    // Get all integrations owned by the team.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Integrations/get_integrations for details.
    const integrations = await fetch('https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations', {
        headers: { authorization: `Bearer ${accessToken}` }
    }).then(res => res.json());

    res.status(200).json(integrations)
}

export default apiErrorHandler(handler);