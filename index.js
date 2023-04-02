import explicitRenderHtml from './index.html'
// import dotenv from 'dotenv'

require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

async function handlePost(request) {
  const body = await request.formData()
  // Turnstile injects a token in "cf-turnstile-response".
  const token = body.get('cf-turnstile-response')
  const ip = request.headers.get('CF-Connecting-IP')
  // Validate the token by calling the "/siteverify" API.
  let formData = new FormData()
  formData.append('secret', SECRET_KEY)
  formData.append('response', token)
  formData.append('remoteip', ip)
  const result = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      body: formData,
      method: 'POST',
    }
  )
  const outcome = await result.json()
  if (!outcome.success) {
    return new Response(
      'The provided Turnstile token was not valid! \n' + JSON.stringify(outcome)
    )
  }
 
  return new Response(
    'Turnstile token successfully validated. \n' + JSON.stringify(outcome)
  )
}
export default  {
  async fetch(request) {
    if (request.method === 'POST') {
      return await handlePost(request)
    }
    const url = new URL(request.url)
    if (url.pathname === '/explicit') {
      const body = await explicitRenderHtml()
      return new Response(body, {
				headers: { 'Content-Type': 'text/html' },
			})
    }
  
    if (url.pathname === '/') {
			const html = await explicitRenderHtml()
			const response = new Response(html, {
				headers: { 'Content-Type': 'text/html' },
			})
			response.headers.set('Cache-Control', 'no-store')
			response.headers.set('Pragma', 'no-cache')
			return response
		}

   
    return fetch(request)
  },
}