import { fetchCssApiCredentials } from '@/utils'
import axios from 'axios'

export default async function handler(req, res) {
    const {integrationID, environment} = req.query
    const accessToken = await fetchCssApiCredentials();
    // Use the retrieved access token to make a request against the nextjs-api. 

    if (req.method === 'GET') {
        const roles = await fetch(`https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations/${integrationID}/${environment}/roles`, {
            headers: { authorization: `Bearer ${accessToken}` }
        }).then(res => res.json());
    
        res.status(200).json(roles)
    }

    else if (req.method === 'POST') {
        console.log(req.body)
        const roles = await fetch(`https://api-dev.loginproxy.gov.bc.ca/api/v1/integrations/${integrationID}/${environment}/roles`, {
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
            res.status(200).send('awwww yeahhhhh')
        }
    }
}
