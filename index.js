import explicitRenderHtml  from './index.html'
require('dotenv').config()


// This is the demo secret key. In prod, we recommend you store
// your secret key(s) safely.
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
	// The Turnstile token was successfully validated. Proceed with your application logic.
	// Validate login, redirect user, etc.
	// For this demo, we just echo the "/siteverify" response:
	return new Response(
		'Turnstile token successfully validated. \n' + JSON.stringify(outcome)
	)
}

export default {
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

		// Check if the request is for the root domain and return the HTML with the Turnstile widget.
		if (url.pathname === '/') {
			const html = await explicitRenderHtml()
			const response = new Response(html, {
				headers: { 'Content-Type': 'text/html' },
			})
			response.headers.set('Cache-Control', 'no-store')
			response.headers.set('Pragma', 'no-cache')
			return response
		}

		// The request is for a static asset, so just pass it through to the origin.
		return fetch(request)
	}
}
