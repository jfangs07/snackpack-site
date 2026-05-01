const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'A valid email is required.' });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'Subscription service is not configured.' });
  }

  try {
    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (response.ok) {
      return res.status(200).json({ ok: true });
    }

    const text = await response.text();
    if (response.status === 400 && /already|exist|subscrib/i.test(text)) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }

    console.error('Buttondown error', response.status, text);
    return res.status(500).json({ ok: false, error: 'Could not complete subscription.' });
  } catch (err) {
    console.error('Buttondown request failed', err);
    return res.status(500).json({ ok: false, error: 'Could not reach subscription service.' });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
