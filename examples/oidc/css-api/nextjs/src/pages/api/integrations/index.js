import { fetchCssApiCredentials, apiErrorHandler, handleStatusError } from '@/utils'

async function handler(req, res) {
    const accessToken = await fetchCssApiCredentials();

    // Get all integrations owned by the team.
    // See https://api.loginproxy.gov.bc.ca/openapi/swagger#/Integrations/get_integrations for details.
    const integrations = await fetch(`${process.env.SSO_API_URL}/integrations`, {
        headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(handleStatusError)
    .then(res => res.json());
    res.status(200).json(integrations)
}

export default apiErrorHandler(handler);