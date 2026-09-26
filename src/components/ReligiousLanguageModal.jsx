import React from 'react';
import { Sparkles, Check, Flame } from 'lucide-react';

export default function ReligiousLanguageModal({
  isOpen,
  selectedLanguage,
  onSelectLanguage,
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      {/* Decorative Aura Background */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFF8EE] via-[#FFFDF9] to-[#FFF3E0] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300 overflow-hidden text-center animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Sacred Mandir Border Motifs */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#89270B] via-[#E65100] to-[#89270B]" />
        
        {/* Divine Invocation */}
        <div className="flex items-center justify-center space-x-3 text-[#89270B] font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
          <span>|| शुभ लाभ ||</span>
          <span>•</span>
          <span>|| ॐ श्री गणेशाय नमः ||</span>
        </div>

        {/* Sacred Glowing Om Emblem */}
        <div className="relative my-4 flex justify-center items-center">
          {/* Outer Sunburst Glow */}
          <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-orange-300 to-yellow-200 blur-xl opacity-70 animate-pulse pointer-events-none" />
          
          {/* Om Medallion */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#89270B] via-[#B44D12] to-[#E65100] p-1 shadow-xl flex items-center justify-center border-2 border-yellow-300/80 group">
            <div className="w-full h-full rounded-full border border-dashed border-yellow-200/60 flex items-center justify-center bg-[#5D1905]">
              <span className="text-5xl font-serif text-yellow-300 select-none drop-shadow-[0_2px_8px_rgba(255,215,0,0.6)]">
                ॐ
              </span>
            </div>
          </div>
        </div>

        {/* Title & Blessings */}
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#3E2723] tracking-tight">
            Astro Jeevan (एस्ट्रो जीवन)
          </h2>
          <p className="text-xs sm:text-sm text-[#795548] font-medium max-w-sm mx-auto">
            कृपया अपनी रिपोर्ट एवं परामर्श के लिए अपनी पसंदीदा भाषा का चयन करें
          </p>
          <p className="text-[11px] text-amber-800/80 font-sans italic">
            (Please choose your preferred language for the report)
          </p>
        </div>

        {/* Language Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 text-left">
          
          {/* Hindi Card */}
          <div
            onClick={() => onSelectLanguage('hi')}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative select-none flex flex-col justify-between ${
              selectedLanguage === 'hi'
                ? 'border-[#B44D12] bg-[#FFF2E0] shadow-md ring-2 ring-[#B44D12]/20'
                : 'border-amber-200/80 bg-white hover:border-amber-400 hover:bg-amber-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B44D12] bg-amber-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>सर्वाधिक अनुशंसित</span>
              </span>
              {selectedLanguage === 'hi' && (
                <div className="w-5 h-5 rounded-full bg-[#B44D12] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="mt-3">
              <div className="text-xl font-bold font-serif text-[#3E2723]">हिंदी (Hindi)</div>
              <p className="text-xs text-gray-600 mt-0.5">
                शुद्ध देवनागरी लिपि, सरल व्याख्या एवं संस्कृत महामंत्र
              </p>
            </div>
          </div>

          {/* English Card */}
          <div
            onClick={() => onSelectLanguage('en')}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative select-none flex flex-col justify-between ${
              selectedLanguage === 'en'
                ? 'border-[#B44D12] bg-[#FFF2E0] shadow-md ring-2 ring-[#B44D12]/20'
                : 'border-amber-200/80 bg-white hover:border-amber-400 hover:bg-amber-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                Global Vedic
              </span>
              {selectedLanguage === 'en' && (
                <div className="w-5 h-5 rounded-full bg-[#B44D12] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="mt-3">
              <div className="text-xl font-bold text-[#3E2723]">English</div>
              <p className="text-xs text-gray-600 mt-0.5">
                Complete astronomical Kundli charts & Romanized mantras
              </p>
            </div>
          </div>

        </div>

        {/* Enter Button */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#89270B] via-[#B44D12] to-[#E65100] hover:from-[#6A1B07] hover:to-[#C2410C] active:scale-[0.98] text-white font-extrabold text-base tracking-wide shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
        >
          <Flame className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span>
            {selectedLanguage === 'hi' ? 'रिपोर्ट देखें एवं आगे बढ़ें' : 'Enter & View Report'}
          </span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">₹299</span>
        </button>

        {/* Traditional Footer Note */}
        <div className="mt-4 text-[11px] text-amber-900/70 flex items-center justify-center space-x-2">
          <span>॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</span>
        </div>

      </div>
    </div>
  );
}
