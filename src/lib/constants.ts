export const BUSINESS_NAME = 'BANT Colon Hydrotherapy';
export const BUSINESS_PHONE = '070 309 7174';
export const BUSINESS_WHATSAPP = '27703097174';
export const BUSINESS_EMAIL = 'info@bantcolon.co.za';
export const BUSINESS_ADDRESS = 'Shop 7, Cascades Shopping Centre, 757 Victoria Avenue, Little Falls, Roodepoort';
export const BUSINESS_HOURS = { open: 9, close: 17 }; // 9am - 5pm
export const SLOT_INTERVAL_MINUTES = 30;
export const LOCK_DURATION_MINUTES = 10;
export const PAYMENT_EXTENSION_MINUTES = 15;
export const NUM_DEVICES = 2;

export const WHATSAPP_URL = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent('Hi 🌿 I\'d like to book a Colon Hydrotherapy session')}`;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Benefits', href: '/benefits' },
  { label: 'FAQ', href: '/faq' },
] as const;

export const BENEFITS = [
  { title: 'Improved Digestion', description: 'Support your digestive system and promote regular, comfortable bowel movements.', image: '/images/benefits/digestion.jpeg' },
  { title: 'Reduced Bloating & Gas', description: 'Experience relief from uncomfortable bloating and excess gas.', image: '/images/benefits/detox-alt.jpeg' },
  { title: 'Increased Energy Levels', description: 'Feel more energised as your body functions more efficiently after cleansing.', image: '/images/benefits/muscle-recovery.jpeg' },
  { title: 'Improved Immune Function', description: 'Support your immune system and strengthen your body\'s natural defences.', image: '/images/benefits/detox.jpeg' },
  { title: 'Enhanced Mental Clarity', description: 'Many clients report improved focus and mental clarity after treatment.', image: '/images/benefits/sleep.jpeg' },
  { title: 'Reduced Inflammation', description: 'Help reduce inflammation throughout the body for improved overall wellbeing.', image: '/images/benefits/stress.jpeg' },
  { title: 'Skin Rejuvenation', description: 'Clearer, healthier-looking skin as toxins are removed from the body.', image: '/images/benefits/skin.jpeg' },
  { title: 'Relief from Constipation', description: 'Gentle relief from chronic constipation and improved bowel regularity.', image: '/images/benefits/digestion.jpeg' },
] as const;

export const FAQS = [
  {
    category: 'General',
    items: [
      {
        question: 'What is Colon Hydrotherapy?',
        answer: 'Colon hydrotherapy (also known as colonics) is a gentle cleansing procedure that uses warm, filtered water to help remove waste from the large intestine (colon). It is a wellness-based treatment aimed at supporting digestive comfort and overall wellbeing.',
      },
      {
        question: 'Where are you located?',
        answer: 'Shop 7, Cascades Shopping Centre, 757 Victoria Avenue, Little Falls, Roodepoort.',
      },
      {
        question: 'Can I book via WhatsApp?',
        answer: 'Yes! Booking is quick and easy via WhatsApp at 070 309 7174. You can also book directly through our website.',
      },
      {
        question: 'Do you offer packages?',
        answer: 'Yes, we offer single sessions, maintenance sessions, and multi-session detox packages. Ask us about current specials and packages.',
      },
    ],
  },
  {
    category: 'The Procedure',
    items: [
      {
        question: 'Does it hurt?',
        answer: 'No. The procedure is generally gentle and comfortable. Some clients may feel mild pressure, a sensation of fullness, or temporary cramping (rare and brief). Most clients describe the experience as relieving and refreshing.',
      },
      {
        question: 'How long does a session take?',
        answer: 'Initial session: approximately 90 minutes (includes consultation). Maintenance session: approximately 60 minutes. We take time to ensure you are comfortable and well-informed.',
      },
      {
        question: 'How many sessions do I need?',
        answer: 'This depends on your individual goals. First-time clients: 1-3 sessions. Maintenance: once every few weeks/month. Detox programmes: structured packages. We will guide you based on your needs — no pressure, no obligation.',
      },
      {
        question: 'What should I expect during the session?',
        answer: 'You will be in a private and professional environment, comfortably positioned. A trained therapist will guide you throughout. The process is discreet and controlled. You remain covered and your dignity is respected at all times.',
      },
      {
        question: 'How will I feel after the session?',
        answer: 'Most clients report feeling lighter, less bloated, more refreshed, and relaxed. Results vary from person to person.',
      },
    ],
  },
  {
    category: 'Health & Safety',
    items: [
      {
        question: 'Is the procedure safe?',
        answer: 'Yes. At BANT, we use modern, hygienic, closed-system equipment operated by trained professionals. Your safety, comfort, and dignity are our top priorities. Please note: Colon hydrotherapy is not a medical treatment and does not replace medical care.',
      },
      {
        question: 'Is the procedure hygienic?',
        answer: 'Absolutely. At BANT, we use single-use, disposable materials. Equipment is thoroughly sanitised. Strict hygiene protocols are followed. Your health and safety are non-negotiable.',
      },
      {
        question: 'Who should NOT have colon hydrotherapy?',
        answer: 'Colon hydrotherapy may not be suitable if you have certain medical conditions. Please inform us if you have: recent surgery, severe digestive conditions, pregnancy, or any medical conditions including diverticulitis, Crohn\'s disease, ulcerative colitis, severe haemorrhoids or tumours of the rectum, kidney or heart conditions, or any bowel, anal, or rectal pathologies. When in doubt, please consult your healthcare provider.',
      },
      {
        question: 'Are results guaranteed?',
        answer: 'No guarantees are made. Each body is different, and results vary. Our goal is to provide a safe, supportive wellness experience.',
      },
    ],
  },
  {
    category: 'Preparation & Aftercare',
    items: [
      {
        question: 'What should I do before my appointment?',
        answer: 'We recommend: Do not eat 2 hours before your appointment. Drink plenty of water up to one hour before. Eat light meals (avoid heavy foods). Avoid alcohol before your session. Detailed preparation guidance will be shared after booking.',
      },
      {
        question: 'What should I do after the session?',
        answer: 'Stay hydrated — we will give you a bottle of water after the session. Eat light, nourishing foods. Avoid heavy or processed meals immediately after. We will provide simple aftercare guidance.',
      },
      {
        question: 'Will I feel embarrassed?',
        answer: 'Not at all. Our environment is professional, private, respectful, and non-judgemental. We prioritise your comfort, dignity, and confidence.',
      },
    ],
  },
] as const;
