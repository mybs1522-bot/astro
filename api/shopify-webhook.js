import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://aynzwvsnjqhcywfandbd.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Astro Jeevan <reports@betterhut.in>';
const APP_BASE_URL = process.env.APP_BASE_URL || 'https://astro-liard-two.vercel.app';

const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function buildReportEmailHtml({ fullName, dob, tob, pob, reportUrl, orderName }) {
  return `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>आपकी वैदिक कर्ज मुक्ति रिपोर्ट तैयार है</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fcf9f2; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2d261e;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fcf9f2; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(180, 83, 9, 0.08); border: 1px solid #fef3c7;">
          <tr>
            <td style="background: linear-gradient(135deg, #78350f, #b45309, #d97706); padding: 32px 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 28px; font-weight: bold; letter-spacing: 1px;">॥ ॐ श्री गणेशाय नमः ॥</div>
              <div style="font-size: 22px; margin-top: 8px; font-weight: 700; color: #fef3c7;">एस्ट्रो जीवन • वैदिक ज्योतिष संस्थान</div>
              <div style="font-size: 13px; color: #fde68a; margin-top: 4px;">100% शुद्ध निरयण लाहिरी अयनांश आधारित वैदिक गणना</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 28px;">
              <h2 style="color: #78350f; font-size: 20px; margin-top: 0;">प्रणाम ${fullName || 'जातक'} जी 🙏</h2>
              <p style="font-size: 15px; line-height: 1.6; color: #451a03;">
                आपके द्वारा अनुरोधित <strong>व्यक्तिगत कर्ज मुक्ति एवं ऋण मोचन महा-रिपोर्ट</strong> आचार्य जी द्वारा आपकी जन्म पत्रिका (कुंडली) के गहन विश्लेषण के उपरांत पूर्ण रूप से तैयार कर ली गई है।
              </p>
              <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 18px 20px; margin: 24px 0;">
                <div style="font-size: 13px; font-weight: bold; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                  🔮 जातक जन्म विवरण (Reference: ${orderName || 'Order'})
                </div>
                <table width="100%" style="font-size: 14px; color: #374151; line-height: 1.8;">
                  <tr>
                    <td width="40%" style="color: #78350f; font-weight: 600;">जातक का नाम:</td>
                    <td style="font-weight: 700;">${fullName || 'आदरणीय जातक'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 600;">जन्म तिथि (DOB):</td>
                    <td>${dob || 'उपलब्ध नहीं'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 600;">जन्म समय (TOB):</td>
                    <td>${tob || 'उपलब्ध नहीं'}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 600;">जन्म स्थान (POB):</td>
                    <td>${pob || 'उपलब्ध नहीं'}</td>
                  </tr>
                </table>
              </div>
              <h3 style="color: #92400e; font-size: 16px; margin-bottom: 12px;">आपकी 6-पेज की रिपोर्ट में क्या शामिल है:</h3>
              <ul style="font-size: 14px; line-height: 1.8; color: #4b5563; padding-left: 20px; margin-top: 0;">
                <li><strong>पेज 1:</strong> वैदिक जन्म पत्रिका, पंचांग आधार एवं ग्रह स्पष्ट सारणी</li>
                <li><strong>पेज 2:</strong> कर्ज कारक भाव (६ठा, ८वां, १२वां भाव) एवं मंगल-राहु योग विश्लेषण</li>
                <li><strong>पेज 3:</strong> वर्तमान महादशा एवं ऋण वृद्धि चक्र का सूक्ष्म परीक्षण</li>
                <li><strong>पेज 4:</strong> ऋण मोचन मंगल स्तोत्र एवं अचूक 5-मिनट के वैदिक दैनिक उपाय</li>
                <li><strong>पेज 5:</strong> लाल किताब के सिद्ध दान, यंत्र एवं सावधानियां</li>
                <li><strong>पेज 6:</strong> आगामी 24 माह की वित्तीय मुक्ति समय-सीमा (Timeline)</li>
              </ul>
              <div style="text-align: center; margin: 36px 0 24px 0;">
                <a href="${reportUrl}" target="_blank" style="background: linear-gradient(135deg, #b45309, #d97706); color: #ffffff; padding: 16px 36px; border-radius: 50px; text-decoration: none; font-size: 16px; font-weight: 700; display: inline-block; box-shadow: 0 4px 15px rgba(180, 83, 9, 0.3);">
                  📥 अपनी वैदिक रिपोर्ट देखें एवं PDF डाउनलोड करें
                </a>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                  (लिंक पर क्लिक करके आप अपनी 6-पेज की रंगीन PDF रिपोर्ट कभी भी डाउनलोड कर सकते हैं)
                </div>
              </div>
              <div style="border-top: 1px dashed #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 13px; color: #6b7280; line-height: 1.6;">
                <p style="margin: 0;">ईश्वर से आपके शीघ्र ऋण निवारण, सुख, समृद्धि एवं उत्तम स्वास्थ्य की मंगल कामना करते हैं।</p>
                <p style="margin: 4px 0 0 0; font-weight: 700; color: #78350f;">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fef3c7; padding: 20px 24px; text-align: center; font-size: 12px; color: #78350f; border-top: 1px solid #fde68a;">
              <div><strong>एस्ट्रो जीवन (Astro Jeevan) - वैदिक ज्योतिष संस्थान</strong></div>
              <div style="margin-top: 4px; color: #92400e;">आधिकारिक सहायता: support@betterhut.in</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function extractCustomerData(order, targetItem) {
  const props = Array.isArray(targetItem?.properties) ? targetItem.properties : [];
  const noteAttrs = Array.isArray(order.note_attributes) ? order.note_attributes : [];

  function getVal(keys) {
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const key of keyList) {
      const p = props.find(x => x.name && x.name.trim().toLowerCase() === key.toLowerCase());
      if (p && p.value && String(p.value).trim()) return String(p.value).trim();
      const n = noteAttrs.find(x => x.name && x.name.trim().toLowerCase() === key.toLowerCase());
      if (n && n.value && String(n.value).trim()) return String(n.value).trim();
    }
    return null;
  }

  const fullName = getVal(['Full Name', 'Name', 'Client Name', 'FullName', 'जातक का नाम']) ||
    [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ') ||
    order.billing_address?.name ||
    order.shipping_address?.name ||
    'Client';

  const rawGender = getVal(['Gender', 'लिंग']) || 'Male';
  const gender = rawGender.toLowerCase().includes('fem') || rawGender.toLowerCase().includes('महिला') ? 'Female' : 'Male';

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

  const pob = getVal(['Place of Birth', 'POB', 'Birth Place', 'स्थान']) || 'New Delhi, India';

  const whatsapp = getVal(['_phone_e164', 'WhatsApp', 'WhatsApp Number', 'Phone', 'फोन']) ||
    order.customer?.phone ||
    order.billing_address?.phone ||
    order.phone ||
    'Not Provided';

  const rawLang = getVal(['Language', 'भाषा']) || 'हिंदी';
  const language = rawLang.toLowerCase().includes('eng') ? 'en' : 'hi';

  return { fullName, gender, dob: dob || '15/08/1995', tob: tob || '12:00 PM', pob, whatsapp, language };
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

    const karzMuktiItem = order.line_items.find(function(item) {
      return item.title && item.title.toLowerCase().includes('karz mukti');
    });

    if (!karzMuktiItem) {
      return res.status(200).json({ message: 'Ignored, wrong product.' });
    }

    const client = extractCustomerData(order, karzMuktiItem);
    const customerEmail = order.email || order.contact_email || order.customer?.email || '';

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
      error_details: customerEmail ? `email:${customerEmail}` : '',
      report_data: null,
      created_at: order.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('reports').upsert([record], { onConflict: 'id' });

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Database write failed: ' + error.message });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SCHEDULE 24-HOUR DELAYED EMAIL VIA RESEND
    // ─────────────────────────────────────────────────────────────────────────
    if (!RESEND_API_KEY) {
      console.warn('[Resend Warning] RESEND_API_KEY environment variable is not configured. Email scheduling skipped.');
    } else if (customerEmail && customerEmail.includes('@') && !customerEmail.includes('example.com')) {
      const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const reportUrl = `${APP_BASE_URL}/#/report/${record.id}`;
      const emailHtml = buildReportEmailHtml({
        fullName: client.fullName,
        dob: client.dob,
        tob: client.tob,
        pob: client.pob,
        reportUrl,
        orderName: order.name || `BH-${order.order_number}` || String(order.id)
      });

      const emailPayload = {
        from: SENDER_EMAIL,
        to: customerEmail,
        subject: `✨ प्रणाम ${client.fullName} जी - आपकी व्यक्तिगत कर्ज मुक्ति एवं वैदिक कुंडली महा-रिपोर्ट तैयार है | Astro Jeevan`,
        html: emailHtml,
        scheduled_at: scheduledAt
      };

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });
        const emailData = await emailRes.json();
        console.log(`[Resend] Successfully scheduled 24h email for ${customerEmail}:`, emailData);
      } catch (mailErr) {
        console.error('[Resend Error]:', mailErr);
      }
    }

    return res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
