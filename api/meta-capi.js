import crypto from 'crypto';

const DEFAULT_PIXEL_ID = '4679956578947738';
const DEFAULT_CAPI_TOKEN = 'EAADE6Lnxf9MBSl1PEnbVjzfZATkGgCcZAzkfDaTeSrTYVEpvESH6mCY9I4kbB9vLWHZCZCWAC7FzojK1avmwZBg2mlwX0fePZASVD4qGVGPgk5QPUQWWkdjDf8C5dMLDvD9ZCNt8u0hdUhX6Q1n7SHBUEz5ojIsPd8RnZAc4p6XO2CZCS1ZAer3SuobHcIhevvPycZBPwZDZD';

function sha256(value) {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(String(value).trim().toLowerCase())
    .digest('hex');
}

function formatPhone(phone) {
  if (!phone) return undefined;
  let clean = String(phone).replace(/\D/g, '');
  if (clean.length === 10) clean = '91' + clean;
  return sha256(clean);
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      eventName,
      eventId,
      eventSourceUrl,
      customData = {},
      userData = {}
    } = req.body || {};

    if (!eventName) {
      return res.status(400).json({ error: 'eventName is required' });
    }

    const pixelId = process.env.VITE_META_PIXEL_ID || process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
    const capiToken = process.env.META_CAPI_TOKEN || DEFAULT_CAPI_TOKEN;

    // Extract client IP and user agent
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = forwarded
      ? forwarded.split(',')[0].trim()
      : req.socket?.remoteAddress;
    const clientUserAgent = req.headers['user-agent'];

    // Format and hash user data per Meta Conversions API specifications
    const formattedUserData = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent
    };

    if (userData.email) {
      formattedUserData.em = [sha256(userData.email)];
    } else {
      // Default fallback pseudo-identifier if email isn't provided
      formattedUserData.em = [sha256('client@astrojeevan.com')];
    }

    if (userData.phone) {
      const phHash = formatPhone(userData.phone);
      if (phHash) formattedUserData.ph = [phHash];
    }

    if (userData.name) {
      const fnHash = sha256(userData.name);
      if (fnHash) formattedUserData.fn = [fnHash];
    }

    if (userData.city) {
      const ctHash = sha256(userData.city.replace(/[^a-zA-Z]/g, ''));
      if (ctHash) formattedUserData.ct = [ctHash];
    }

    if (userData.state) {
      const stHash = sha256(userData.state);
      if (stHash) formattedUserData.st = [stHash];
    }

    if (userData.fbp) {
      formattedUserData.fbp = userData.fbp;
    }

    if (userData.fbc) {
      formattedUserData.fbc = userData.fbc;
    }

    const eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      event_source_url: eventSourceUrl || 'https://astrojeevan.com',
      action_source: 'website',
      user_data: formattedUserData,
      custom_data: customData
    };

    const fbEndpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${capiToken}`;

    const fbRes = await fetch(fbEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [eventPayload]
      })
    });

    const fbData = await fbRes.json();

    return res.status(200).json({
      success: true,
      event_id: eventPayload.event_id,
      meta_response: fbData
    });
  } catch (err) {
    console.error('[Meta CAPI Serverless Error]:', err);
    return res.status(500).json({
      error: 'Internal server error processing CAPI event',
      details: err.message
    });
  }
}
