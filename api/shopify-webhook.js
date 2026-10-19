import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://aynzwvsnjqhcywfandbd.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function extractCustomerData(order, targetItem) {
  const props = Array.isArray(targetItem?.properties) ? targetItem.properties : [];
  const noteAttrs = Array.isArray(order.note_attributes) ? order.note_attributes : [];

  function getVal(keys) {
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const key of keyList) {
      // 1. Check line item properties (where Shopify store booking form saves data)
      const p = props.find(x => x.name && x.name.trim().toLowerCase() === key.toLowerCase());
      if (p && p.value && String(p.value).trim()) return String(p.value).trim();
      // 2. Check order note_attributes (cart level fallback)
      const n = noteAttrs.find(x => x.name && x.name.trim().toLowerCase() === key.toLowerCase());
      if (n && n.value && String(n.value).trim()) return String(n.value).trim();
    }
    return null;
  }

  // 1. Full Name
  const fullName = getVal(['Full Name', 'Name', 'Client Name', 'FullName', 'जातक का नाम']) ||
    [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ') ||
    order.billing_address?.name ||
    order.shipping_address?.name ||
    'Client';

  // 2. Gender
  const rawGender = getVal(['Gender', 'लिंग']) || 'Male';
  const gender = rawGender.toLowerCase().includes('fem') || rawGender.toLowerCase().includes('महिला') ? 'Female' : 'Male';

  // 3. Date of Birth -> formatted as DD/MM/YYYY
  let dob = '';
  const dobIso = getVal(['_dob_iso', 'dob_iso']);
  const dobRaw = getVal(['Date of Birth', 'DOB', 'Birth Date', 'जन्म तिथि']);
  if (dobIso && dobIso.includes('-')) {
    const parts = dobIso.split('-');
    if (parts.length === 3) {
      dob = `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
    }
  } else if (dobRaw) {
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dobRaw)) {
      dob = dobRaw;
    } else {
      const d = new Date(dobRaw);
      if (!isNaN(d.getTime())) {
        dob = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      } else {
        dob = dobRaw;
      }
    }
  }

  // 4. Time of Birth
  let tob = getVal(['Time of Birth', 'TOB', 'Birth Time', 'समय']) || '';
  const tob24h = getVal(['_tob_24h']);
  const timeKnown = getVal(['_time_known']);
  if (timeKnown === 'no' || timeKnown === 'false') {
    tob = 'Unknown / 12:00 PM';
  } else if (!tob && tob24h) {
    const [h, m] = tob24h.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    tob = `${String(hour).padStart(2, '0')}:${m || '00'} ${ampm}`;
  }

  // 5. Place of Birth
  const pob = getVal(['Place of Birth', 'POB', 'Birth Place', 'स्थान']) || 'New Delhi, India';

  // 6. WhatsApp / Phone
  const whatsapp = getVal(['_phone_e164', 'WhatsApp', 'WhatsApp Number', 'Phone', 'फोन']) ||
    order.customer?.phone ||
    order.billing_address?.phone ||
    order.phone ||
    'Not Provided';

  // 7. Language
  const rawLang = getVal(['Language', 'भाषा']) || 'हिंदी';
  const language = rawLang.toLowerCase().includes('eng') ? 'en' : 'hi';

  return {
    fullName,
    gender,
    dob: dob || '15/08/1995',
    tob: tob || '12:00 PM',
    pob,
    whatsapp,
    language
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  if (!supabase) {
    console.error('CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing.');
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const order = req.body;
    if (!order || !order.id || !order.line_items) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Identify target product
    const karzMuktiItem = order.line_items.find(function(item) {
      return item.title && item.title.toLowerCase().includes('karz mukti');
    });

    if (!karzMuktiItem) {
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    // Extract complete customer birth & form details from line item properties
    const client = extractCustomerData(order, karzMuktiItem);

    const record = {
      id: 'shopify_' + order.id,
      client_name: client.fullName,
      gender: client.gender,
      dob: client.dob,
      tob: client.tob,
      pob: client.pob,
      whatsapp: client.whatsapp,
      report_id: 'karz-mukti-remedy',
      report_title: 'Personalized Karz Mukti Report & Remedy',
      amount: parseFloat(order.total_price) || 299,
      payment_status: 'Completed',
      payment_method: order.gateway || 'Shopify Checkout',
      payment_id: order.checkout_id ? String(order.checkout_id) : 'shopify_' + order.id,
      lead_stage: 'completed',
      error_details: '',
      report_data: null,
      created_at: order.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('reports').upsert([record], { onConflict: 'id' });

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Database write failed: ' + error.message });
    }

    console.log(`✅ Successfully captured Shopify order ${order.name || order.id} for ${client.fullName} into Supabase!`);
    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
