import { createClient } from '@supabase/supabase-js';

// Initialize Supabase safely
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 2. Early return to prevent crashing if DB isn't connected
  if (!supabase) {
    console.error('CRITICAL: Supabase credentials missing.');
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const order = req.body;

    // 3. Safety Check: Ensure this is a valid Shopify payload
    if (!order || !order.id || !order.line_items) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // 4. Robust Filtering: Case-insensitive match for the product
    const karzMuktiItem = order.line_items.find(item => 
      item.title && item.title.toLowerCase().includes('karz mukti')
    );

    if (!karzMuktiItem) {
      // Return 200 so Shopify doesn't keep retrying ignored orders
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    // 5. Bulletproof Data Extraction (Never crash on null values)
    const customer = order.customer || {};
    const shipping = order.shipping_address || {};
    
    const customerName = customer.first_name || shipping.first_name || 'Client';
    const phone = customer.phone || order.phone || shipping.phone || 'Not Provided';
    
    const noteAttrs = Array.isArray(order.note_attributes) ? order.note_attributes : [];
    const getNote = (key) => {
      const match = noteAttrs.find(n => n.name?.toLowerCase() === key.toLowerCase());
      return match ? match.value : 'Not Provided';
    };

    // 6. Construct exact record format
    const record = {
      id: `shopify_${order.id}`,
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
      payment_id: order.checkout_id || `shopify_${order.id}`,
      lead_stage: 'completed',
      error_details: '',
      report_data: null,
      created_at: order.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 7. Upsert to Supabase
    const { error } = await supabase.from('reports').upsert([record], { onConflict: 'id' });

    if (error) {
      console.error(`Supabase Sync Error for order ${order.id}:`, error.message);
      // Return 500! This tells Shopify it failed, so Shopify will automatically RETRY sending it later.
      return res.status(500).json({ error: 'Failed to save to database' });
    }
    
    return res.status(200).json({ message: 'Success' });

  } catch (err) {
    console.error('Webhook Fatal Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
