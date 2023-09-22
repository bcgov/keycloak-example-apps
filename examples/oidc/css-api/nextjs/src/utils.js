export const fetchCssApiCredentials = async () => {
    const postData = new URLSearchParams();
    postData.append('grant_type', 'client_credentials')
    postData.append('client_id', process.env.SSO_CLIENT_ID)
    postData.append('client_secret', process.env.SSO_CLIENT_SECRET)
    const result = await fetch(process.env.SSO_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: postData,
        next: {
            revalidate: 3000
        }
    }).then(res => res.json())

    return result.access_token
}