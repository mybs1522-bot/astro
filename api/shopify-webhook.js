import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://aynzwvsnjqhcywfandbd.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

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

    const karzMuktiItem = order.line_items.find(function(item) {
      return item.title && item.title.toLowerCase().includes('karz mukti');
    });

    if (!karzMuktiItem) {
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    const customer = order.customer || {};
    const shipping = order.shipping_address || {};
    const billing = order.billing_address || {};
    const customerName = customer.first_name || shipping.first_name || billing.first_name || 'Client';
    const phone = customer.phone || order.phone || billing.phone || shipping.phone || 'Not Provided';

    const noteAttrs = Array.isArray(order.note_attributes) ? order.note_attributes : [];
    function getNote(key) {
      for (var i = 0; i < noteAttrs.length; i++) {
        if (noteAttrs[i].name && noteAttrs[i].name.toLowerCase() === key.toLowerCase()) {
          return noteAttrs[i].value;
        }
      }
      return 'Not Provided';
    }

    const record = {
      id: 'shopify_' + order.id,
      client_name: customerName,
      gender: getNote('Gender'),
      dob: getNote('DOB'),
      tob: getNote('TOB'),
      pob: getNote('POB'),
      whatsapp: phone,
      report_id: 'karz-mukti-remedy',
      report_title: 'Personalized Karz Mukti Report & Remedy',
      amount: parseFloat(order.total_price) || 0,
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

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
