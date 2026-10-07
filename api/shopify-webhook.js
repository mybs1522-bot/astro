import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with the Service Role Key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const order = req.body;

    // Check if the order contains the Karz Mukti product
    const hasKarzMukti = order.line_items?.some(item => 
      item.title.includes('Personalized Karz Mukti Report')
    );

    if (!hasKarzMukti) {
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    // Extract Customer Data
    const customerName = order.customer?.first_name || order.shipping_address?.first_name || 'Client';
    const phone = order.customer?.phone || order.phone || 'Not Provided';
    
    // Shopify stores custom cart details in note_attributes
    const noteAttrs = order.note_attributes || [];
    const getNote = (key) => noteAttrs.find(n => n.name === key)?.value;

    // Save the order to Supabase as a "Completed Lead" for your report generator
    const record = {
      id: `shopify_${order.id}`,
      client_name: customerName,
      dob: getNote('DOB') || 'Not Provided',
      tob: getNote('TOB') || 'Not Provided',
      pob: getNote('POB') || 'Not Provided',
      whatsapp: phone,
      report_id: 'karz-mukti-remedy',
      report_title: 'Personalized Karz Mukti Report & Remedy',
      amount: parseFloat(order.total_price),
      payment_status: 'Completed',
      payment_method: 'Shopify Webhook',
      lead_stage: 'completed',
      created_at: new Date().toISOString()
    };

    await supabase.from('reports').upsert([record], { onConflict: 'id' });
    
    return res.status(200).json({ message: 'Successfully captured Shopify order into Supabase!' });

  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
