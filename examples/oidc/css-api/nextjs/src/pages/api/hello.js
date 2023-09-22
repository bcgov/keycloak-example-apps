// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const postData = new URLSearchParams();
  postData.append('grant_type', 'client_credentials')
  postData.append('client_id', process.env.SSO_CLIENT_ID)
  postData.append('client_secret', process.env.SSO_CLIENT_SECRET)
  const { access_token: accessToken } = await fetch(`${process.env.SSO_ISSUER}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: postData
  }).then(res => res.json())

  // Use the retrieved access token to make a request against the nextjs-api. 
  const result = await fetch('http://localhost:3000/api/message', {
      headers: {authorization: `Bearer ${accessToken}`}
  }).then(res => res.json());

  res.status(200).json({ name: 'John Doe' })
}
