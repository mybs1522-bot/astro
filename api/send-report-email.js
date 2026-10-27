import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://aynzwvsnjqhcywfandbd.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Astro Jeevan <reports@betterhut.in>';
const APP_BASE_URL = process.env.APP_BASE_URL || 'https://astro-liard-two.vercel.app';

const supabase = SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function formatTobForEmail(tob) {
  if (!tob) return 'अज्ञात (चन्द्र लग्न पद्धति अनुसार)';
  const s = String(tob).trim().toLowerCase();
  if (
    s === '' ||
    s === '12:00 pm' ||
    s === 'unknown / 12:00 pm' ||
    s.includes('unknown') ||
    s.includes('अज्ञात') ||
    s.includes('not provided') ||
    s.includes('उपलब्ध नहीं')
  ) {
    return 'अज्ञात (चन्द्र लग्न पद्धति अनुसार)';
  }
  return tob;
}

function buildReportEmailHtml({ fullName, dob, tob, pob, reports = [], orderName }) {
  const displayTob = formatTobForEmail(tob);
  const isCombo = reports.length > 1;
  const isDhanOnly = reports.length === 1 && reports[0].reportId === 'dhan-yog-report';

  let emailTitle = 'आपकी वैदिक कर्ज मुक्ति रिपोर्ट तैयार है';
  let introP = `आपके द्वारा अनुरोधित <strong>व्यक्तिगत कर्ज मुक्ति एवं ऋण मोचन महा-रिपोर्ट</strong> आचार्य जी द्वारा आपकी जन्म पत्रिका (कुंडली) के गहन विश्लेषण के उपरांत पूर्ण रूप से तैयार कर ली गई है।`;

  if (isCombo) {
    emailTitle = 'आपकी कर्ज मुक्ति एवं धन योग महा-रिपोर्ट्स तैयार हैं';
    introP = `आपके द्वारा अनुरोधित <strong>व्यक्तिगत कर्ज मुक्ति महा-रिपोर्ट</strong> एवं <strong>धन योग एवं महालक्ष्मी कृपा रिपोर्ट</strong> आचार्य जी द्वारा आपकी जन्म पत्रिका (कुंडली) के गहन विश्लेषण के उपरांत पूर्ण रूप से तैयार कर ली गई हैं।`;
  } else if (isDhanOnly) {
    emailTitle = 'आपकी वैदिक धन योग एवं महालक्ष्मी कृपा रिपोर्ट तैयार है';
    introP = `आपके द्वारा अनुरोधित <strong>व्यक्तिगत धन योग एवं महालक्ष्मी कृपा महा-रिपोर्ट</strong> आचार्य जी द्वारा आपकी जन्म पत्रिका (कुंडली) के गहन विश्लेषण के उपरांत पूर्ण रूप से तैयार कर ली गई है।`;
  }

  return `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>${emailTitle}</title>
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
                ${introP}
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
                    <td>${displayTob}</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 600;">जन्म स्थान (POB):</td>
                    <td>${pob || 'उपलब्ध नहीं'}</td>
                  </tr>
                </table>
              </div>

              ${isCombo ? `
              <h3 style="color: #92400e; font-size: 16px; margin-bottom: 12px;">आपके ऑर्डर में शामिल २ वैदिक महा-रिपोर्ट्स:</h3>
              <div style="background-color: #fefce8; border-left: 4px solid #ca8a04; padding: 12px 16px; margin-bottom: 20px; border-radius: 0 8px 8px 0; font-size: 14px; color: #713f12; line-height: 1.6;">
                <div><strong>१. कर्ज मुक्ति महा-रिपोर्ट:</strong> ६ठा व ८वां भाव परीक्षण, ऋण मोचन मंगल स्तोत्र व 24 माह वित्तीय मुक्ति समय-सीमा।</div>
                <div style="margin-top: 6px;"><strong>२. धन योग एवं महालक्ष्मी कृपा रिपोर्ट:</strong> २रा व ११वां भाव परीक्षण, महालक्ष्मी कुबेर योग, श्री सूक्त साधना व स्थायी धन संचय उपाय।</div>
              </div>
              ` : isDhanOnly ? `
              <h3 style="color: #92400e; font-size: 16px; margin-bottom: 12px;">आपकी 6-पेज की धन योग रिपोर्ट में क्या शामिल है:</h3>
              <ul style="font-size: 14px; line-height: 1.8; color: #4b5563; padding-left: 20px; margin-top: 0;">
                <li><strong>पेज 1:</strong> वैदिक जन्म पत्रिका, पंचांग आधार एवं ग्रह स्पष्ट सारणी</li>
                <li><strong>पेज 2:</strong> द्वितीय (धन) व एकादश (लाभ) भाव का गहन विश्लेषण एवं महालक्ष्मी योग</li>
                <li><strong>पेज 3:</strong> वर्तमान महादशा, गोचर एवं आकस्मिक धन आगमन चक्र</li>
                <li><strong>पेज 4:</strong> श्री सूक्त, कनकधारा एवं कुबेर धन आकर्षण अचूक वैदिक उपाय</li>
                <li><strong>पेज 5:</strong> लाल किताब के सिद्ध दान, चांदी यंत्र एवं तिजोरी वास्तु नियम</li>
                <li><strong>पेज 6:</strong> आगामी 24 माह की धन संचय एवं स्थायी समृद्धि समय-सीमा (Timeline)</li>
              </ul>
              ` : `
              <h3 style="color: #92400e; font-size: 16px; margin-bottom: 12px;">आपकी 6-पेज की कर्ज मुक्ति रिपोर्ट में क्या शामिल है:</h3>
              <ul style="font-size: 14px; line-height: 1.8; color: #4b5563; padding-left: 20px; margin-top: 0;">
                <li><strong>पेज 1:</strong> वैदिक जन्म पत्रिका, पंचांग आधार एवं ग्रह स्पष्ट सारणी</li>
                <li><strong>पेज 2:</strong> कर्ज कारक भाव (६ठा, ८वां, १२वां भाव) एवं मंगल-राहु योग विश्लेषण</li>
                <li><strong>पेज 3:</strong> वर्तमान महादशा एवं ऋण वृद्धि चक्र का सूक्ष्म परीक्षण</li>
                <li><strong>पेज 4:</strong> ऋण मोचन मंगल स्तोत्र एवं अचूक 5-मिनट के वैदिक दैनिक उपाय</li>
                <li><strong>पेज 5:</strong> लाल किताब के सिद्ध दान, यंत्र एवं सावधानियां</li>
                <li><strong>पेज 6:</strong> आगामी 24 माह की वित्तीय मुक्ति समय-सीमा (Timeline)</li>
              </ul>
              `}

              <div style="text-align: center; margin: 32px 0 20px 0;">
                ${reports.map((rep) => {
                  const isDhan = rep.reportId === 'dhan-yog-report';
                  const btnGrad = isDhan
                    ? 'linear-gradient(135deg, #065f46, #047857, #10b981)'
                    : 'linear-gradient(135deg, #b45309, #d97706, #f59e0b)';
                  const icon = isDhan ? '💰' : '📥';
                  const label = isCombo
                    ? (isDhan ? '२. धन योग एवं महालक्ष्मी रिपोर्ट देखें (PDF)' : '१. कर्ज मुक्ति महा-रिपोर्ट देखें (PDF)')
                    : (isDhan ? 'अपनी धन योग रिपोर्ट देखें एवं PDF डाउनलोड करें' : 'अपनी वैदिक रिपोर्ट देखें एवं PDF डाउनलोड करें');
                  return `
                  <div style="margin: 12px 0;">
                    <a href="${rep.url}" target="_blank" style="background: ${btnGrad}; color: #ffffff; padding: 15px 32px; border-radius: 50px; text-decoration: none; font-size: 15px; font-weight: 700; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.15); min-width: 260px;">
                      ${icon} ${label}
                    </a>
                  </div>
                  `;
                }).join('')}
                <div style="font-size: 12px; color: #9ca3af; margin-top: 12px;">
                  (लिंक पर क्लिक करके आप अपनी 6-पेज की रंगीन PDF रिपोर्ट कभी भी देख व डाउनलोड कर सकते हैं)
                </div>
              </div>

              <div style="border-top: 1px dashed #e5e7eb; padding-top: 20px; margin-top: 28px; font-size: 13px; color: #6b7280; line-height: 1.6;">
                <p style="margin: 0;">ईश्वर से आपके शीघ्र ऋण निवारण, प्रचुर धन-धान्य, सुख एवं समृद्धि की मंगल कामना करते हैं।</p>
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

    // Check if companion report exists (e.g. shopify_xxx_dhan_yog)
    const companionId = record.id.endsWith('_dhan_yog')
      ? record.id.replace('_dhan_yog', '')
      : `${record.id}_dhan_yog`;

    const { data: companionRecord } = await supabase
      .from('reports')
      .select('*')
      .eq('id', companionId)
      .maybeSingle();

    const reportsList = [];
    if (record.report_id === 'karz-mukti-remedy' || !record.id.endsWith('_dhan_yog')) {
      reportsList.push({
        id: record.id,
        reportId: record.report_id,
        title: record.report_title,
        url: `${APP_BASE_URL}/#/report/${record.id}`
      });
      if (companionRecord) {
        reportsList.push({
          id: companionRecord.id,
          reportId: companionRecord.report_id,
          title: companionRecord.report_title,
          url: `${APP_BASE_URL}/#/report/${companionRecord.id}`
        });
      }
    } else {
      if (companionRecord) {
        reportsList.push({
          id: companionRecord.id,
          reportId: companionRecord.report_id,
          title: companionRecord.report_title,
          url: `${APP_BASE_URL}/#/report/${companionRecord.id}`
        });
      }
      reportsList.push({
        id: record.id,
        reportId: record.report_id,
        title: record.report_title,
        url: `${APP_BASE_URL}/#/report/${record.id}`
      });
    }

    const emailHtml = buildReportEmailHtml({
      fullName: record.client_name,
      dob: record.dob,
      tob: record.tob,
      pob: record.pob,
      reports: reportsList,
      orderName: record.id
    });

    let emailSubject = `✨ प्रणाम ${record.client_name} जी - आपकी व्यक्तिगत कर्ज मुक्ति एवं वैदिक कुंडली महा-रिपोर्ट तैयार है | Astro Jeevan`;
    if (reportsList.length > 1) {
      emailSubject = `✨ प्रणाम ${record.client_name} जी - आपकी कर्ज मुक्ति एवं धन योग महा-रिपोर्ट्स तैयार हैं | Astro Jeevan`;
    } else if (record.report_id === 'dhan-yog-report') {
      emailSubject = `💰 प्रणाम ${record.client_name} जी - आपकी व्यक्तिगत धन योग एवं महालक्ष्मी कृपा रिपोर्ट तैयार है | Astro Jeevan`;
    }

    const emailPayload = {
      from: SENDER_EMAIL,
      to: email,
      subject: emailSubject,
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
