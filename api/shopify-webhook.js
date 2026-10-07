import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  if (!supabase) {
    console.error('CRITICAL: Supabase credentials missing.');
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const order = req.body;
    if (!order || !order.id || !order.line_items) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const karzMuktiItem = order.line_items.find(item =>
      item.title && item.title.toLowerCase().includes('karz mukti')
    );

    if (!karzMuktiItem) {
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    const customer = order.customer || {};
    const shipping = order.shipping_address || {};
    const customerName = customer.first_name || shipping.first_name || 'Client';
    const phone = customer.phone || order.phone || shipping.phone || 'Not Provided';
    const noteAttrs = Array.isArray(order.note_attributes) ? order.note_attributes : [];
    const getNote = (key) => {
      const match = noteAttrs.find(n => n.name && n.name.toLowerCase() === key.toLowerCase());
      return match ? match.value : 'Not Provided';
    };

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
      return res.status(500).json({ error: 'Database write failed' });
    }

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
