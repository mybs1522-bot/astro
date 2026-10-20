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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY environment variable is not configured' });
  }

  const { orderId, email, scheduleInHours } = req.body || {};

  if (!orderId || !email) {
    return res.status(400).json({ error: 'orderId and email are required' });
  }

  try {
    const { data: record, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !record) {
      return res.status(404).json({ error: 'Order not found in database' });
    }

    const reportUrl = `${APP_BASE_URL}/#/report/${record.id}`;
    const emailHtml = buildReportEmailHtml({
      fullName: record.client_name,
      dob: record.dob,
      tob: record.tob,
      pob: record.pob,
      reportUrl,
      orderName: record.id
    });

    const emailPayload = {
      from: SENDER_EMAIL,
      to: email,
      subject: `✨ प्रणाम ${record.client_name} जी - आपकी व्यक्तिगत कर्ज मुक्ति एवं वैदिक कुंडली महा-रिपोर्ट तैयार है | Astro Jeevan`,
      html: emailHtml
    };

    if (scheduleInHours && Number(scheduleInHours) > 0) {
      const scheduledTime = new Date(Date.now() + Number(scheduleInHours) * 60 * 60 * 1000).toISOString();
      emailPayload.scheduled_at = scheduledTime;
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    const resendData = await resendRes.json();
    return res.status(200).json({ success: true, resend: resendData });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
