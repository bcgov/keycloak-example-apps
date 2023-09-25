import { fetchCssApiCredentials } from '@/utils'

export default async function handler(req, res) {
    const accessToken = await fetchCssApiCredentials();
    // Use the retrieved access token to make a request against the nextjs-api. 
    const integrations = await fetch('https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations', {
        headers: { authorization: `Bearer ${accessToken}` }
    }).then(res => res.json());

    res.status(200).json(integrations)
}
