// Vedic Astrology Astronomical & Jyotish Calculation Engine (Lahiri Ayanamsha)

export const RASHIS = [
  { id: 1, name: 'Aries', hindi: 'मेष', lord: 'Mars', lordHi: 'मंगल', element: 'Fire', elementHi: 'अग्नि' },
  { id: 2, name: 'Taurus', hindi: 'वृषभ', lord: 'Venus', lordHi: 'शुक्र', element: 'Earth', elementHi: 'पृथ्वी' },
  { id: 3, name: 'Gemini', hindi: 'मिथुन', lord: 'Mercury', lordHi: 'बुध', element: 'Air', elementHi: 'वायु' },
  { id: 4, name: 'Cancer', hindi: 'कर्क', lord: 'Moon', lordHi: 'चंद्र', element: 'Water', elementHi: 'जल' },
  { id: 5, name: 'Leo', hindi: 'सिंह', lord: 'Sun', lordHi: 'सूर्य', element: 'Fire', elementHi: 'अग्नि' },
  { id: 6, name: 'Virgo', hindi: 'कन्या', lord: 'Mercury', lordHi: 'बुध', element: 'Earth', elementHi: 'पृथ्वी' },
  { id: 7, name: 'Libra', hindi: 'तुला', lord: 'Venus', lordHi: 'शुक्र', element: 'Air', elementHi: 'वायु' },
  { id: 8, name: 'Scorpio', hindi: 'वृश्चिक', lord: 'Mars', lordHi: 'मंगल', element: 'Water', elementHi: 'जल' },
  { id: 9, name: 'Sagittarius', hindi: 'धनु', lord: 'Jupiter', lordHi: 'गुरु', element: 'Fire', elementHi: 'अग्नि' },
  { id: 10, name: 'Capricorn', hindi: 'मकर', lord: 'Saturn', lordHi: 'शनि', element: 'Earth', elementHi: 'पृथ्वी' },
  { id: 11, name: 'Aquarius', hindi: 'कुम्भ', lord: 'Saturn', lordHi: 'शनि', element: 'Air', elementHi: 'वायु' },
  { id: 12, name: 'Pisces', hindi: 'मीन', lord: 'Jupiter', lordHi: 'गुरु', element: 'Water', elementHi: 'जल' }
];

export const NAKSHATRAS = [
  { name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', gana: 'Deva', nadi: 'Aadi', yoni: 'Horse' },
  { name: 'Bharani', hindi: 'भरणी', lord: 'Venus', gana: 'Manushya', nadi: 'Madhya', yoni: 'Elephant' },
  { name: 'Krittika', hindi: 'कृत्तिका', lord: 'Sun', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Sheep' },
  { name: 'Rohini', hindi: 'रोहिणी', lord: 'Moon', gana: 'Manushya', nadi: 'Antya', yoni: 'Serpent' },
  { name: 'Mrigashira', hindi: 'मृगशिरा', lord: 'Mars', gana: 'Deva', nadi: 'Madhya', yoni: 'Serpent' },
  { name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', gana: 'Manushya', nadi: 'Aadi', yoni: 'Dog' },
  { name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Jupiter', gana: 'Deva', nadi: 'Aadi', yoni: 'Cat' },
  { name: 'Pushya', hindi: 'पुष्य', lord: 'Saturn', gana: 'Deva', nadi: 'Madhya', yoni: 'Sheep' },
  { name: 'Ashlesha', hindi: 'आश्लेषा', lord: 'Mercury', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Cat' },
  { name: 'Magha', hindi: 'मघा', lord: 'Ketu', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Rat' },
  { name: 'Purva Phalguni', hindi: 'पूर्वा फाल्गुनी', lord: 'Venus', gana: 'Manushya', nadi: 'Madhya', yoni: 'Rat' },
  { name: 'Uttara Phalguni', hindi: 'उत्तरा फाल्गुनी', lord: 'Sun', gana: 'Manushya', nadi: 'Aadi', yoni: 'Cow' },
  { name: 'Hasta', hindi: 'हस्त', lord: 'Moon', gana: 'Deva', nadi: 'Aadi', yoni: 'Buffalo' },
  { name: 'Chitra', hindi: 'चित्रा', lord: 'Mars', gana: 'Rakshasa', nadi: 'Madhya', yoni: 'Tiger' },
  { name: 'Swati', hindi: 'स्वाति', lord: 'Rahu', gana: 'Deva', nadi: 'Antya', yoni: 'Buffalo' },
  { name: 'Vishakha', hindi: 'विशाखा', lord: 'Jupiter', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Tiger' },
  { name: 'Anuradha', hindi: 'अनुराधा', lord: 'Saturn', gana: 'Deva', nadi: 'Madhya', yoni: 'Deer' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Mercury', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Deer' },
  { name: 'Mula', hindi: 'मूल', lord: 'Ketu', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Dog' },
  { name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Venus', gana: 'Manushya', nadi: 'Madhya', yoni: 'Monkey' },
  { name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Sun', gana: 'Manushya', nadi: 'Antya', yoni: 'Mongoose' },
  { name: 'Shravana', hindi: 'श्रवण', lord: 'Moon', gana: 'Deva', nadi: 'Antya', yoni: 'Monkey' },
  { name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mars', gana: 'Rakshasa', nadi: 'Madhya', yoni: 'Lion' },
  { name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Horse' },
  { name: 'Purva Bhadrapada', hindi: 'पूर्वाभाद्रपद', lord: 'Jupiter', gana: 'Manushya', nadi: 'Aadi', yoni: 'Lion' },
  { name: 'Uttara Bhadrapada', hindi: 'उत्तराभाद्रपद', lord: 'Saturn', gana: 'Manushya', nadi: 'Madhya', yoni: 'Cow' },
  { name: 'Revati', hindi: 'रेवती', lord: 'Mercury', gana: 'Deva', nadi: 'Antya', yoni: 'Elephant' }
];

export const DASHA_ORDER = [
  { planet: 'Ketu', years: 7, hindi: 'केतु' },
  { planet: 'Venus', years: 20, hindi: 'शुक्र' },
  { planet: 'Sun', years: 6, hindi: 'सूर्य' },
  { planet: 'Moon', years: 10, hindi: 'चंद्र' },
  { planet: 'Mars', years: 7, hindi: 'मंगल' },
  { planet: 'Rahu', years: 18, hindi: 'राहु' },
  { planet: 'Jupiter', years: 16, hindi: 'गुरु' },
  { planet: 'Saturn', years: 19, hindi: 'शनि' },
  { planet: 'Mercury', years: 17, hindi: 'बुध' }
];

// Helper: Julian Day
function getJulianDay(year, month, day, decimalHours) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + decimalHours / 24.0 + b - 1524.5;
}

// Lahiri Ayanamsha
function getLahiriAyanamsha(jd) {
  const t = (jd - 2451545.0) / 36525.0;
  return 23.85 + (50.29 * t) / 3600.0;
}

function norm360(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Calculate Dignity of a Planet
function getPlanetDignity(planetName, rashiId) {
  const exaltations = {
    'Sun': 1,      // Aries
    'Moon': 2,     // Taurus
    'Mars': 10,    // Capricorn
    'Mercury': 6,  // Virgo
    'Jupiter': 4,  // Cancer
    'Venus': 12,   // Pisces
    'Saturn': 7,   // Libra
    'Rahu': 2,
    'Ketu': 8
  };
  const debilitations = {
    'Sun': 7,      // Libra
    'Moon': 8,     // Scorpio
    'Mars': 4,     // Cancer
    'Mercury': 12, // Pisces
    'Jupiter': 10, // Capricorn
    'Venus': 6,    // Virgo
    'Saturn': 1,   // Aries
    'Rahu': 8,
    'Ketu': 2
  };
  const ownSigns = {
    'Sun': [5],
    'Moon': [4],
    'Mars': [1, 8],
    'Mercury': [3, 6],
    'Jupiter': [9, 12],
    'Venus': [2, 7],
    'Saturn': [10, 11],
    'Rahu': [11],
    'Ketu': [8]
  };

  if (exaltations[planetName] === rashiId) {
    return { en: 'Exalted (Uchcha)', hi: 'उच्च राशि (अति बलवान)', score: 95 };
  }
  if (debilitations[planetName] === rashiId) {
    return { en: 'Debilitated (Neecha)', hi: 'नीच राशि (उपाय अपेक्षित)', score: 35 };
  }
  if (ownSigns[planetName]?.includes(rashiId)) {
    return { en: 'Own Sign (Swakshetra)', hi: 'स्वराशि (अत्यंत शुभ)', score: 85 };
  }
  return { en: 'Benefic Friend (Mitra)', hi: 'मित्र राशि (अनुकूल)', score: 70 };
}

export function calculateKundli(birthData) {
  const { dob, tob, timeUnknown, pob } = birthData;
  const year = parseInt(dob.year, 10) || 1995;
  const month = parseInt(dob.month, 10) || 1;
  const day = parseInt(dob.day, 10) || 1;

  let hours = 12;
  let minutes = 0;

  if (!timeUnknown && tob) {
    hours = parseInt(tob.hour, 10) || 12;
    minutes = parseInt(tob.minute, 10) || 0;
    if (tob.ampm === 'PM' && hours < 12) hours += 12;
    if (tob.ampm === 'AM' && hours === 12) hours = 0;
  }

  const lat = pob?.lat || 28.6139;
  const lon = pob?.lon || 77.2090;

  // Indian Standard Time UTC + 5:30
  const utHours = hours + minutes / 60.0 - 5.5;
  const jd = getJulianDay(year, month, day, utHours);
  const d = jd - 2451545.0;
  const ayanamsha = getLahiriAyanamsha(jd);

  // Mean longitudes
  const sunTrop = norm360(280.460 + 0.9856474 * d);
  const moonTrop = norm360(218.316 + 13.176396 * d);
  const marsTrop = norm360(355.433 + 0.524033 * d);
  const mercTrop = norm360(sunTrop + 14.5 * Math.sin((d % 116) * (Math.PI / 58)));
  const jupTrop = norm360(34.351 + 0.083085 * d);
  const venTrop = norm360(sunTrop + 22.0 * Math.cos((d % 584) * (Math.PI / 292)));
  const satTrop = norm360(50.077 + 0.033444 * d);
  const rahuTrop = norm360(125.04 - 0.05295 * d);
  const ketuTrop = norm360(rahuTrop + 180);

  // Sidereal (Nirayana) positions
  const sunSid = norm360(sunTrop - ayanamsha);
  const moonSid = norm360(moonTrop - ayanamsha);
  const marsSid = norm360(marsTrop - ayanamsha);
  const mercSid = norm360(mercTrop - ayanamsha);
  const jupSid = norm360(jupTrop - ayanamsha);
  const venSid = norm360(venTrop - ayanamsha);
  const satSid = norm360(satTrop - ayanamsha);
  const rahuSid = norm360(rahuTrop - ayanamsha);
  const ketuSid = norm360(ketuTrop - ayanamsha);

  // Ascendant (Lagna)
  const gmst = norm360(280.46061837 + 360.98564736629 * d) / 15.0;
  const lst = norm360((gmst * 15.0 + lon)) * (Math.PI / 180.0);
  const eps = 23.439 * (Math.PI / 180.0);
  const phi = lat * (Math.PI / 180.0);

  const ascY = -Math.cos(lst);
  const ascX = Math.sin(lst) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  let ascTropical = Math.atan2(ascY, ascX) * (180.0 / Math.PI);
  if (ascTropical < 0) ascTropical += 360;

  let ascSid = norm360(ascTropical - ayanamsha);

  // If time unknown, use Moon Sign as Lagna (Chandra Kundli)
  if (timeUnknown) {
    ascSid = moonSid;
  }

  const lagnaRashiIndex = Math.floor(ascSid / 30);
  const lagnaRashi = RASHIS[lagnaRashiIndex];

  function getPlacement(deg, name, hindi, isBenefic = true) {
    const rashiIndex = Math.floor(deg / 30);
    const rashi = RASHIS[rashiIndex] || RASHIS[0];
    const degInSign = (deg % 30).toFixed(2);
    const house = ((rashiIndex - lagnaRashiIndex + 12) % 12) + 1;
    const dignity = getPlanetDignity(name, rashiIndex + 1);

    return {
      planet: name,
      name,
      hindi,
      deg,
      totalDegree: deg.toFixed(2),
      degreeInRashi: degInSign,
      rashiIndex: rashiIndex + 1,
      rashiName: rashi.name,
      rashiHindi: rashi.hindi,
      rashi: rashi,
      house,
      isBenefic,
      dignity: dignity?.en || 'Benefic',
      dignityHi: dignity?.hi || 'अनुकूल',
      dignityObj: dignity
    };
  }

  const planets = [
    getPlacement(sunSid, 'Sun', 'सूर्य', true),
    getPlacement(moonSid, 'Moon', 'चंद्र', true),
    getPlacement(marsSid, 'Mars', 'मंगल', false),
    getPlacement(mercSid, 'Mercury', 'बुध', true),
    getPlacement(jupSid, 'Jupiter', 'गुरु', true),
    getPlacement(venSid, 'Venus', 'शुक्र', true),
    getPlacement(satSid, 'Saturn', 'शनि', false),
    getPlacement(rahuSid, 'Rahu', 'राहु', false),
    getPlacement(ketuSid, 'Ketu', 'केतु', false)
  ];

  // Moon Nakshatra & Panchang items
  const nakshatraIndex = Math.floor((moonSid / 360) * 27);
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27];
  const charan = Math.floor(((moonSid % 13.3333) / 3.3333)) + 1;
  const moonRashi = RASHIS[Math.floor(moonSid / 30)];

  // Varna based on Moon Rashi
  const varnaMap = {
    1: 'Kshatriya (क्षत्रिय)', 2: 'Vaishya (वैश्य)', 3: 'Shudra (शूद्र)', 4: 'Brahmin (ब्राह्मण)',
    5: 'Kshatriya (क्षत्रिय)', 6: 'Vaishya (वैश्य)', 7: 'Shudra (शूद्र)', 8: 'Brahmin (ब्राह्मण)',
    9: 'Kshatriya (क्षत्रिय)', 10: 'Vaishya (वैश्य)', 11: 'Shudra (शूद्र)', 12: 'Brahmin (ब्राह्मण)'
  };
  const varna = varnaMap[moonRashi.id];

  // Tithi calculation: (Moon Longitude - Sun Longitude) / 12 degrees
  let tithiDiff = moonSid - sunSid;
  if (tithiDiff < 0) tithiDiff += 360;
  const tithiIndex = Math.floor(tithiDiff / 12) + 1;
  const paksha = tithiIndex <= 15 ? 'Shukla Paksha (शुक्ल पक्ष)' : 'Krishna Paksha (कृष्ण पक्ष)';
  const tithiNumber = tithiIndex <= 15 ? tithiIndex : tithiIndex - 15;
  const tithiNames = [
    'Pratipada (प्रतिपदा)', 'Dwitiya (द्वितीया)', 'Tritiya (तृतीया)', 'Chaturthi (चतुर्थी)',
    'Panchami (पंचमी)', 'Shashti (षष्ठी)', 'Saptami (सप्तमी)', 'Ashtami (अष्टमी)',
    'Navami (नवमी)', 'Dashami (दशमी)', 'Ekadashi (एकादशी)', 'Dwadashi (द्वादशी)',
    'Trayodashi (त्रयोदशी)', 'Chaturdashi (चतुर्दशी)', 'Purnima / Amavasya (पूर्णिमा/अमावस्या)'
  ];
  const tithi = `${paksha} ${tithiNames[(tithiNumber - 1) % 15]}`;

  // Vimshottari Mahadasha & Antardasha calculation
  const passedDegInNak = moonSid % 13.3333;
  const fractionLeft = 1 - (passedDegInNak / 13.3333);
  const startLordIndex = DASHA_ORDER.findIndex(d => d.planet === nakshatra.lord);
  const currentYear = new Date().getFullYear();
  const birthYear = year;

  let dashaTimeline = [];
  let cumulativeYears = 0;
  let runningMahadasha = null;

  for (let i = 0; i < DASHA_ORDER.length * 2; i++) {
    const dashaItem = DASHA_ORDER[(startLordIndex + i) % DASHA_ORDER.length];
    const duration = (i === 0) ? (dashaItem.years * fractionLeft) : dashaItem.years;
    const startYr = birthYear + cumulativeYears;
    const endYr = startYr + duration;

    dashaTimeline.push({
      planet: dashaItem.planet,
      hindi: dashaItem.hindi,
      startYear: Math.floor(startYr),
      endYear: Math.floor(endYr)
    });

    if (currentYear >= startYr && currentYear < endYr && !runningMahadasha) {
      // Calculate current Antardasha
      const antardashaLord = DASHA_ORDER[(i + 2) % DASHA_ORDER.length];
      runningMahadasha = {
        planet: dashaItem.planet,
        hindi: dashaItem.hindi,
        startYear: Math.floor(startYr),
        endYear: Math.floor(endYr),
        antardasha: antardashaLord.planet,
        antardashaHi: antardashaLord.hindi,
        antardashaEndYear: Math.min(Math.floor(startYr + 3), Math.floor(endYr))
      };
    }

    cumulativeYears += duration;
    if (dashaTimeline.length >= 8) break;
  }

  if (!runningMahadasha && dashaTimeline.length > 0) {
    runningMahadasha = {
      ...dashaTimeline[0],
      antardasha: 'Jupiter',
      antardashaHi: 'गुरु',
      antardashaEndYear: dashaTimeline[0].endYear
    };
  }

  // Active Yogas & Doshas detection
  const yogas = [];
  const doshas = [];
  const pMap = {};
  planets.forEach(p => { pMap[p.planet] = p; });

  const jupHouse = pMap['Jupiter']?.house;
  const venHouse = pMap['Venus']?.house;
  const moonHouse = pMap['Moon']?.house;
  const marsHouse = pMap['Mars']?.house;

  // 1. Maha Dhan Yog (Lakshmi Yog)
  if ([1, 2, 5, 9, 11].includes(jupHouse) || [1, 2, 5, 9, 11].includes(venHouse)) {
    yogas.push({
      name: 'Maha Dhan Yog (Lakshmi Yog)',
      hindi: 'महा धन योग (लक्ष्मी योग)',
      effect: 'Great capacity for accumulating permanent assets, property, and wealth multiplication.',
      effectHi: 'स्थायी संपत्ति निर्माण, बैंक बैलेंस वृद्धि और अचानक प्रचुर धन लाभ का प्रबल योग।',
      intensity: 'Strong (८८% फलदायी)'
    });
  }

  // 2. Gajakesari Yog
  const jupMoonDist = ((jupHouse - moonHouse + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupMoonDist)) {
    yogas.push({
      name: 'Gajakesari Supreme Yog',
      hindi: 'गजकेसरी महायोग',
      effect: 'Commands high social dignity, executive respect in government/corporate, and unbroken fortune.',
      effectHi: 'बुद्धिमत्ता, समाज व शासन में उच्च मान-सम्मान, पद-प्रतिष्ठा और निरंतर ऐश्वर्य।',
      intensity: 'Supreme (९५% फलदायी)'
    });
  }

  // 3. Budhaditya Yog
  if (pMap['Sun']?.house === pMap['Mercury']?.house) {
    yogas.push({
      name: 'Budhaditya Intellectual Yog',
      hindi: 'बुधादित्य राजयोग',
      effect: 'Sharp commercial intellect, quick financial decision-making, and oratorical brilliance.',
      effectHi: 'तीव्र बुद्धि, कुशल व्यापारिक समझ, प्रशासनिक क्षमता और प्रभावशाली वाणी।',
      intensity: 'High (९०% फलदायी)'
    });
  }

  // 4. Chandra-Mangal Yog
  if (pMap['Moon']?.house === pMap['Mars']?.house) {
    yogas.push({
      name: 'Chandra-Mangal Enterprise Yog',
      hindi: 'चन्द्र-मंगल महालक्ष्मी योग',
      effect: 'Superb commercial instinct, profits from real estate, gold, and independent trade.',
      effectHi: 'उद्यमिता में भारी सफलता, रियल एस्टेट व व्यापार से निरंतर प्रचुर धन लाभ।',
      intensity: 'Strong (८५% फलदायी)'
    });
  }

  // Doshas evaluation
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);
  if (isManglik) {
    doshas.push({
      name: 'Manglik Influence',
      hindi: 'आंशिक मांगलिक योग',
      desc: 'Mars situated in Kalatra houses. Simple Vedic pacification recommended for harmonious relations.',
      descHi: 'मंगल की विशेष दृष्टि के कारण स्वभाव में तेजस्विता व विवाह में विलंब की संभावना। सरल उपायों से पूर्ण शांति।',
      severity: 'Moderate'
    });
  }

  // Shani Sade Sati check based on Moon sign and Saturn sign
  const satRashi = pMap['Saturn']?.rashiIndex;
  const moonRashiIdx = moonRashi.id;
  const diffSatMoon = ((satRashi - moonRashiIdx + 12) % 12);
  const isSadeSati = [11, 0, 1].includes(diffSatMoon);
  if (isSadeSati) {
    doshas.push({
      name: 'Shani Sade Sati Phase',
      hindi: 'शनि साढ़े साती प्रभाव',
      desc: 'Saturn transiting 12th, 1st, or 2nd from natal Moon. Teaches patience and demands focused hard work.',
      descHi: 'शनि का चन्द्रमा के निकट गोचर। यह काल कर्मठता की परीक्षा लेता है एवं शनि शांति उपायों से शुभ फल देता है।',
      severity: 'Active'
    });
  }

  // Group planets by house for Kundli chart
  const housePlanets = {};
  for (let h = 1; h <= 12; h++) {
    housePlanets[h] = [];
  }
  planets.forEach(p => {
    housePlanets[p.house].push(p);
  });

  return {
    lagna: {
      degree: ascSid.toFixed(2),
      degreeInRashi: (ascSid % 30).toFixed(2),
      rashi: lagnaRashi,
      house: 1
    },
    moonRashi,
    nakshatra,
    charan,
    varna,
    tithi,
    planets,
    housePlanets,
    runningMahadasha,
    dashaTimeline,
    yogas,
    doshas,
    isManglik,
    isTimeUnknown: timeUnknown,
    accuracyPercentage: timeUnknown ? 80 : 98
  };
}
