import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReportCatalog from './components/ReportCatalog';
import AstroShubhLandingPage from './components/AstroShubhLandingPage';
import ReligiousLanguageModal from './components/ReligiousLanguageModal';
import ReportViewer from './components/ReportViewer';
import WhatsAppModal from './components/WhatsAppModal';
import AdminDashboard from './components/AdminDashboard';
import GurujiOrderSuccessModal from './components/GurujiOrderSuccessModal';
import { generateReport, enhanceExistingReportWithAi } from './utils/reportGenerator';
import { saveReportOrder, saveLeadCapture, updateLeadStatus } from './utils/supabaseClient';
import { openRazorpayCheckout } from './utils/razorpayClient';
import confetti from 'canvas-confetti';
import { REPORTS_DATA } from './data/reports';
import { SLUG_TO_REPORT_ID, REPORT_ID_TO_SLUG } from './data/landingPagesData';
import { ShieldCheck, Sparkles, Lock } from 'lucide-react';

function getInitialRoute() {
  if (typeof window === 'undefined') {
    return { view: 'catalog', reportId: 'career-growth-remedy' };
  }
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase().replace(/\/$/, '');

  // Check admin dashboard route (/admin, /admin/, #/admin, #admin)
  if (path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
    return { view: 'admin', reportId: 'career-growth-remedy' };
  }

  let targetSlug = null;
  if (window.location.pathname.includes('/landing/')) {
    const parts = window.location.pathname.split('/landing/');
    targetSlug = parts[1]?.split('/')[0]?.split('?')[0];
  } else if (window.location.hash.includes('/landing/')) {
    const parts = window.location.hash.split('/landing/');
    targetSlug = parts[1]?.split('/')[0]?.split('?')[0];
  }

  if (targetSlug && SLUG_TO_REPORT_ID[targetSlug]) {
    return { view: 'landing', reportId: SLUG_TO_REPORT_ID[targetSlug] };
  }

  return { view: 'catalog', reportId: 'career-growth-remedy' };
}

export default function App() {
  const initialRoute = getInitialRoute();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('astro_user_lang') || 'hi';
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(() => {
    // Only open if the user hasn't selected language yet and not on admin
    if (initialRoute.view === 'admin') return false;
    return !localStorage.getItem('astro_user_lang');
  });
  const [currentView, setCurrentView] = useState(initialRoute.view);
  const [selectedReportId, setSelectedReportId] = useState(initialRoute.reportId);
  const [withAddon, setWithAddon] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    dob: { day: '15', month: '08', year: '1995' },
    tob: { hour: '08', minute: '30', ampm: 'AM' },
    timeUnknown: false,
    pob: { name: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
    pobText: 'New Delhi, Delhi, India',
    whatsappNumber: '',
    gender: 'Male',
    language: localStorage.getItem('astro_user_lang') || 'hi',
    acceptedTerms: true
  });

  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [activeReportData, setActiveReportData] = useState(null);
  const [shouldAutoDownload, setShouldAutoDownload] = useState(false);
  const [isGurujiSuccessModalOpen, setIsGurujiSuccessModalOpen] = useState(false);
  const [gurujiOrderInfo, setGurujiOrderInfo] = useState(null);

  // Sync language selection between header and form
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setFormData(prev => ({ ...prev, language: lang }));
    localStorage.setItem('astro_user_lang', lang);
    setIsLanguageModalOpen(false);
  };

  const handleConfirmLanguage = () => {
    localStorage.setItem('astro_user_lang', language);
    setIsLanguageModalOpen(false);
  };

  // URL hash and pathname listener for direct URLs like /landing/CareerGrowth and /admin
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash.toLowerCase().replace(/\/$/, '');

      // Check admin dashboard route
      if (path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
        setCurrentView('admin');
        setIsLanguageModalOpen(false);
        return;
      }

      let targetSlug = null;

      if (window.location.pathname.includes('/landing/')) {
        const parts = window.location.pathname.split('/landing/');
        targetSlug = parts[1]?.split('/')[0]?.split('?')[0];
      } else if (window.location.hash.includes('/landing/')) {
        const parts = window.location.hash.split('/landing/');
        targetSlug = parts[1]?.split('/')[0]?.split('?')[0];
      }

      if (targetSlug && SLUG_TO_REPORT_ID[targetSlug]) {
        setSelectedReportId(SLUG_TO_REPORT_ID[targetSlug]);
        setCurrentView('landing');
      } else if (!hash || hash === '#' || hash === '#/' || hash === '#catalog') {
        setCurrentView('catalog');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  const handleSelectReport = (reportId) => {
    setSelectedReportId(reportId);
    const slug = REPORT_ID_TO_SLUG[reportId] || 'CareerGrowth';
    window.location.hash = `/landing/${slug}`;
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isOpeningPayment, setIsOpeningPayment] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);

  const handleLandingFormSubmit = async (hasAddon) => {
    setWithAddon(hasAddon);
    const amount = hasAddon ? 398 : 299;
    setIsOpeningPayment(true);

    const reportItem = REPORTS_DATA.find(r => r.id === selectedReportId);
    const reportTitle = language === 'hi'
      ? (reportItem?.titleHi || reportItem?.title || 'वैदिक ज्योतिष रिपोर्ट')
      : (reportItem?.title || 'Vedic Astrology Report');

    // ── STAGE 1: Capture lead IMMEDIATELY (before Razorpay even loads) ──
    const leadId = await saveLeadCapture({
      client_name: formData.fullName || 'Anonymous Client',
      gender: formData.gender || 'Male',
      dob: `${formData.dob.day}/${formData.dob.month}/${formData.dob.year}`,
      tob: formData.timeUnknown ? 'Unknown / 12:00 PM' : `${formData.tob.hour}:${formData.tob.minute} ${formData.tob.ampm}`,
      pob: formData.pobText || (typeof formData.pob === 'string' ? formData.pob : formData.pob?.name) || 'New Delhi, India',
      whatsapp: formData.whatsappNumber || 'Not Provided',
      report_id: selectedReportId,
      report_title: reportTitle,
      amount: amount
    });
    setCurrentLeadId(leadId);

    // ── STAGE 2: Open Razorpay and update status on every callback ──
    const opened = await openRazorpayCheckout({
      amount: amount,
      currency: 'INR',
      reportTitle: reportTitle,
      userName: formData.fullName || 'Client',
      userPhone: formData.whatsappNumber || '',
      userEmail: 'client@astrojeevan.com',
      onSuccess: (paymentResult) => {
        setIsOpeningPayment(false);
        // ── STAGE 3a: Payment SUCCESS — update lead → completed ──
        updateLeadStatus(leadId, {
          lead_stage: 'completed',
          payment_status: 'Completed',
          payment_method: 'Razorpay (Live Checkout)',
          payment_id: paymentResult.razorpay_payment_id || ''
        });
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
        handlePaymentSuccess(leadId, {
          paymentId: paymentResult.razorpay_payment_id,
          paymentMethod: 'Razorpay (Live Checkout)'
        });
      },
      onError: (err) => {
        setIsOpeningPayment(false);
        // ── STAGE 3b: Payment FAILED — capture error details ──
        updateLeadStatus(leadId, {
          lead_stage: 'payment_failed',
          payment_status: 'Failed',
          error_details: JSON.stringify({
            code: err.code || '',
            description: err.description || err.message || 'Unknown error',
            source: err.source || '',
            step: err.step || '',
            reason: err.reason || '',
            timestamp: new Date().toISOString()
          })
        });
        console.warn('Razorpay error:', err);
        alert(err.description || err.message || 'Razorpay Gateway could not be opened. Please verify your connection or try again.');
      },
      onDismiss: () => {
        setIsOpeningPayment(false);
        // ── STAGE 3c: Payment DISMISSED — user closed gateway without paying ──
        updateLeadStatus(leadId, {
          lead_stage: 'payment_dismissed',
          payment_status: 'Abandoned'
        });
      }
    });

    if (!opened) {
      setIsOpeningPayment(false);
      // ── STAGE 3d: Gateway FAILED TO OPEN — SDK/network issue ──
      updateLeadStatus(leadId, {
        lead_stage: 'gateway_failed',
        payment_status: 'Gateway Error',
        error_details: 'Razorpay SDK failed to load or open'
      });
    }
  };

  const handlePaymentSuccess = (leadId, paymentInfo = {}) => {
    // 1. Generate the verified report instantaneously in background for Admin
    const initialReport = generateReport(selectedReportId, formData, language);
    setActiveReportData(initialReport);
    setShouldAutoDownload(false); // DO NOT auto-download for customer

    const payId = paymentInfo?.paymentId || `pay_rzp_${Date.now().toString().slice(-6)}`;
    const payMethod = paymentInfo?.paymentMethod || 'Razorpay (Live Checkout)';
    const orderId = leadId || currentLeadId || `order_${Date.now()}`;

    // 2. Open Guruji consultation confirmation modal for the user
    setGurujiOrderInfo({
      orderId,
      paymentId: payId,
      clientName: formData.fullName || 'Anonymous Client',
      whatsapp: formData.whatsappNumber || '',
      reportTitle: initialReport?.title || 'Astrology Report',
      amount: withAddon ? 398 : 299
    });
    setIsGurujiSuccessModalOpen(true);

    // 2. Persist full order record (upserts the existing lead with report data)
    const orderRecord = {
      id: orderId,
      client_name: formData.fullName || 'Anonymous Client',
      gender: formData.gender || 'Male',
      dob: `${formData.dob.day}/${formData.dob.month}/${formData.dob.year}`,
      tob: formData.timeUnknown ? 'Unknown / 12:00 PM' : `${formData.tob.hour}:${formData.tob.minute} ${formData.tob.ampm}`,
      pob: formData.pobText || (typeof formData.pob === 'string' ? formData.pob : formData.pob?.name) || 'New Delhi, India',
      whatsapp: formData.whatsappNumber || 'Not Provided',
      report_id: selectedReportId,
      report_title: initialReport?.title || 'Astrology Report',
      amount: withAddon ? 398 : 299,
      payment_status: 'Completed',
      payment_method: payMethod,
      payment_id: payId,
      lead_stage: 'completed',
      report_data: initialReport
    };
    saveReportOrder(orderRecord);

    // 3. Seamlessly enrich with Gemini AI in the background
    enhanceExistingReportWithAi(initialReport).then((enhanced) => {
      if (enhanced && enhanced.isAiEnhanced) {
        setActiveReportData(enhanced);
        saveReportOrder({
          ...orderRecord,
          report_title: enhanced.title || orderRecord.report_title,
          report_data: enhanced
        });
      }
    }).catch(err => {
      console.warn('Background Gemini AI enhancement:', err);
    });
  };

  const handleGoHome = () => {
    if (window.location.pathname.toLowerCase().startsWith('/admin')) {
      try {
        window.history.pushState(null, '', '/');
      } catch {
        // ignore
      }
    }
    window.location.hash = '';
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoAdmin = (e) => {
    if (e) e.preventDefault();
    if (!window.location.pathname.toLowerCase().startsWith('/admin')) {
      try {
        window.history.pushState(null, '', '/admin');
      } catch {
        // ignore
      }
    }
    window.location.hash = '';
    setCurrentView('admin');
    setIsLanguageModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegenerateReport = async (apiKey) => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey);
    }
    if (activeReportData) {
      const enhanced = await enhanceExistingReportWithAi(activeReportData, apiKey);
      if (enhanced) {
        setActiveReportData(enhanced);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans text-gray-900 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Sacred Religious Language Gatekeeper Modal - only for storefront */}
      {currentView !== 'admin' && (
        <ReligiousLanguageModal
          isOpen={isLanguageModalOpen}
          selectedLanguage={language}
          onSelectLanguage={handleLanguageChange}
          onConfirm={handleConfirmLanguage}
        />
      )}

      {/* Header - only for storefront */}
      {currentView !== 'admin' && (
        <Header
          language={language}
          setLanguage={handleLanguageChange}
          onSelectHome={handleGoHome}
        />
      )}

      {/* Main Body */}
      <main className="flex-1">
        {currentView === 'admin' && (
          <AdminDashboard
            onNavigateStorefront={handleGoHome}
            onViewReport={(reportData) => {
              setActiveReportData(reportData);
              setCurrentView('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'catalog' && (
          <ReportCatalog
            selectedReportId={selectedReportId}
            onSelectReport={handleSelectReport}
            language={language}
          />
        )}

        {currentView === 'landing' && (
          <div>
            <div className="max-w-6xl mx-auto px-4 pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleGoHome}
                className="text-xs font-semibold text-gray-500 hover:text-[#b44d12] flex items-center space-x-1.5 transition-colors"
              >
                <span>← {language === 'hi' ? 'सभी 13 रिपोर्ट्स कैटलॉग पर वापस जाएं' : 'Back to All 13 Reports'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(true)}
                className="text-xs font-bold text-[#89270B] bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full border border-amber-300 transition-colors flex items-center space-x-1"
              >
                <span>ॐ</span>
                <span>{language === 'hi' ? 'भाषा बदलें (Hindi)' : 'Change Language (English)'}</span>
              </button>
            </div>
            
            <AstroShubhLandingPage
              reportId={selectedReportId}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleLandingFormSubmit}
              isOpeningPayment={isOpeningPayment}
              onNavigateHome={handleGoHome}
              onSelectReport={handleSelectReport}
              onChangeLanguage={() => setIsLanguageModalOpen(true)}
              language={language}
            />
          </div>
        )}

        {currentView === 'report' && (
          <ReportViewer
            reportData={activeReportData}
            onBack={handleGoHome}
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            language={language}
            autoDownload={shouldAutoDownload}
            onDownloadComplete={() => setShouldAutoDownload(false)}
            onRegenerateReport={handleRegenerateReport}
          />
        )}
      </main>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        reportData={activeReportData}
        language={language}
      />

      {/* Guruji Consultation Success & WhatsApp Delivery Notification Modal */}
      <GurujiOrderSuccessModal
        isOpen={isGurujiSuccessModalOpen}
        onClose={() => {
          setIsGurujiSuccessModalOpen(false);
          handleGoHome();
        }}
        orderInfo={gurujiOrderInfo || {}}
        language={language}
      />

      {/* Footer - only for storefront */}
      {currentView !== 'admin' && (
        <footer className="bg-[#26170d] text-amber-100/80 py-10 px-4 mt-16 border-t-4 border-[#b44d12] no-print">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-relaxed">
            <div>
              <div className="flex items-center space-x-2 text-white font-serif font-bold text-lg mb-2">
                <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-xs">ॐ</div>
                <span>Astro Jeevan (एस्ट्रो जीवन)</span>
              </div>
              <p className="text-amber-200/70">
                {language === 'hi'
                  ? 'शुद्ध वैदिक गणित, निरयण भाव गणना और लाल किताब आधारित सिद्ध उपाय। प्रत्येक जातक के लिए व्यक्तिगत विश्लेषण।'
                  : 'Authentic Vedic Nirayana planetary positions, Lahiri Ayanamsha calculations, and consecrated remedies.'}
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold text-sm mb-2.5">
                {language === 'hi' ? 'समर्पित लैंडिंग पेज (₹299)' : 'Dedicated Report Pages (₹299)'}
              </h5>
              <ul className="space-y-1.5 text-amber-200/70">
                <li>
                  <a href="#/landing/CareerGrowth" onClick={() => handleSelectReport('career-growth-remedy')} className="hover:text-amber-300">
                    • /landing/CareerGrowth (करियर उन्नति)
                  </a>
                </li>
                <li>
                  <a href="#/landing/KarzMukti" onClick={() => handleSelectReport('karz-mukti-remedy')} className="hover:text-amber-300">
                    • /landing/KarzMukti (कर्ज मुक्ति महा-उपाय)
                  </a>
                </li>
                <li>
                  <a href="#/landing/NaukriYog" onClick={() => handleSelectReport('naukri-yog-report')} className="hover:text-amber-300">
                    • /landing/NaukriYog (सरकारी व प्राइवेट नौकरी)
                  </a>
                </li>
                <li>
                  <a href="#/landing/DhanYog" onClick={() => handleSelectReport('dhan-yog-report')} className="hover:text-amber-300">
                    • /landing/DhanYog (महालक्ष्मी धन योग)
                  </a>
                </li>
                <li>
                  <a href="#/landing/ShaadiYog" onClick={() => handleSelectReport('shaadi-yog-report')} className="hover:text-amber-300">
                    • /landing/ShaadiYog (विवाह योग एवं मुहूर्त)
                  </a>
                </li>
                <li>
                  <a href="#/landing/HomeVastu" onClick={() => handleSelectReport('home-vastu-remedies')} className="hover:text-amber-300">
                    • /landing/HomeVastu (घर वास्तु दोष निवारण)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-sm mb-2.5">
                {language === 'hi' ? 'सुरक्षा एवं सहायता' : 'Security & Trust'}
              </h5>
              <div className="space-y-2 text-amber-200/70">
                <p className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'hi' ? '१००% सुरक्षित एवं गोपनीय डेटा' : '100% Confidential Data Encryption'}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{language === 'hi' ? 'मात्र ₹२९९ पारदर्शी मूल्य' : 'Flat ₹299 Transparent Pricing'}</span>
                </p>
                <div className="pt-2 border-t border-amber-900/60 mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-amber-300/60">
                    © {new Date().getFullYear()} Astro Jeevan. All rights reserved.
                  </span>
                  <a
                    href="#/admin"
                    onClick={handleGoAdmin}
                    className="inline-flex items-center space-x-1 text-[11px] text-amber-300/80 hover:text-amber-200 bg-black/20 hover:bg-black/40 px-2 py-0.5 rounded border border-amber-800/50 transition-colors"
                  >
                    <Lock className="w-3 h-3 text-amber-400" />
                    <span>{language === 'hi' ? 'एडमिन पोर्टल' : 'Admin Portal'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
