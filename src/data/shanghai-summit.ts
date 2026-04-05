export interface SpeakerData {
  id: string;
  name: string;
  title: { en: string; zh: string };
  organization: string;
  bio: { en: string; zh: string };
  image?: string;
}

export interface AgendaDayData {
  day: number;
  date: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  highlights: { en: string[]; zh: string[] };
  image?: string;
  note?: { en: string; zh: string };
  cta?: {
    label: { en: string; zh: string };
    href: string;
    external?: boolean;
    variant?: 'solid' | 'outline';
    highlight?: boolean;
  };
}

export interface PartnerData {
  name: string;
  logo: string;
  url: string;
}

export const partners: PartnerData[] = [
  { name: 'PwC', logo: '/img/summit-partners/pwc.svg', url: 'https://www.pwc.co.uk/' },
  { name: 'Bayer', logo: '/img/summit-partners/bayer.svg', url: 'https://www.bayer.com/en/' },
  { name: 'HeraNova', logo: '/img/summit-partners/heranova.png', url: 'https://heranova.com/' },
  { name: 'GE Healthcare', logo: '/img/summit-partners/ge-healthcare.svg', url: 'https://www.gehealthcare.co.uk/' },
  { name: 'Fosun Health Capital', logo: '/img/summit-partners/fosun-health-capital.svg', url: 'http://www.fosunhealthcapital.com/' },
  { name: 'AVPN', logo: '/img/summit-partners/avpn.webp', url: 'https://avpn.asia/' },
  { name: 'Foreground', logo: '/img/summit-partners/foreground.png', url: 'https://foreground.vc/' },
  { name: 'Gobi Partners', logo: '/img/summit-partners/gobi.png', url: 'https://www.gobi.vc/' },
  { name: 'BD', logo: '/img/summit-partners/bd.svg', url: 'https://www.bd.com/en-uk' },
  { name: 'Roche', logo: '/img/summit-partners/roche.png', url: 'https://www.roche.com/' },
  { name: 'Raffles Medical', logo: '/img/summit-partners/raffles-medical.svg', url: 'https://www.rafflesmedicalchina.com/en/site/shanghai-hospital' },
  { name: 'Renji Hospital', logo: '/img/summit-partners/renji.png', url: 'https://www.renji.com/' },
  { name: 'Tigermed', logo: '/img/summit-partners/tigermed.png', url: 'https://www.tigermedgrp.com/zh/homepage' },
  { name: 'China Merchants Bank', logo: '/img/summit-partners/cmb.webp', url: 'https://www.cmbchina.com/' },
  { name: 'HSBC', logo: '/img/summit-partners/hsbc.svg', url: 'https://www.hsbc.co.uk/' },
  { name: 'Medtronic', logo: '/img/summit-partners/medtronic.webp', url: 'https://www.medtronic.com/uk-en/index.html' },
  { name: 'Ministry of Foreign Affairs of Denmark', logo: '/img/summit-partners/denmark-mfa.webp', url: 'https://um.dk/en/' },
  { name: 'British Consulate', logo: '/img/summit-partners/british-consulate.png', url: 'https://www.british-consulate.net/uk/United-Kingdom-Consular-Assistance-Shanghai' },
  { name: 'Government of Canada', logo: '/img/summit-partners/canada.svg', url: 'https://www.international.gc.ca/country-pays/china-chine/shanghai.aspx?lang=eng' },
  { name: 'Gates Foundation', logo: '/img/summit-partners/gates-foundation.svg', url: 'https://www.gatesfoundation.org/' },
];

export const SHANGHAI_COORDS = { lon: 121.47, lat: 31.23 };

export const FAB_COUNTRY_COORDS: Record<string, { lon: number; lat: number }> = {
  Canada: { lon: -106.35, lat: 56.13 },
  China: { lon: 104.20, lat: 35.86 },
  France: { lon: 2.21, lat: 46.23 },
  Ireland: { lon: -8.24, lat: 53.41 },
  Switzerland: { lon: 8.23, lat: 46.82 },
  Ukraine: { lon: 31.17, lat: 48.38 },
  Israel: { lon: 34.85, lat: 31.05 },
  Mexico: { lon: -102.55, lat: 23.63 },
  Denmark: { lon: 9.50, lat: 56.26 },
  'United Kingdom': { lon: -3.44, lat: 55.38 },
  Japan: { lon: 138.25, lat: 36.20 },
  'United States': { lon: -95.71, lat: 37.09 },
  Italy: { lon: 12.57, lat: 41.87 },
  Germany: { lon: 10.45, lat: 51.17 },
  Singapore: { lon: 103.82, lat: 1.35 },
  Vietnam: { lon: 108.28, lat: 14.06 },
  Philippines: { lon: 121.77, lat: 12.88 },
  Indonesia: { lon: 106.52, lat: -6.10 },
  Thailand: { lon: 100.99, lat: 15.87 },
  Korea: { lon: 127.77, lat: 35.91 },
  Bhutan: { lon: 90.43, lat: 27.51 },
  Malaysia: { lon: 101.98, lat: 4.21 },
  Norway: { lon: 8.47, lat: 60.47 },
  Sweden: { lon: 18.64, lat: 60.13 },
  Netherlands: { lon: 5.29, lat: 52.13 },
  Finland: { lon: 25.75, lat: 61.92 },
  Iceland: { lon: -19.02, lat: 64.96 },
  Greenland: { lon: -42.60, lat: 71.71 },
  Spain: { lon: -3.75, lat: 40.46 },
  Australia: { lon: 133.78, lat: -25.27 },
  Russia: { lon: 105.32, lat: 61.52 },
  Uzbekistan: { lon: 64.59, lat: 41.38 },
  Kazakhstan: { lon: 66.92, lat: 48.02 },
  Argentina: { lon: -63.62, lat: -38.42 },
  Brazil: { lon: -51.93, lat: -14.24 },
  Uruguay: { lon: -55.77, lat: -32.52 },
  UAE: { lon: 53.85, lat: 23.42 },
  Kenya: { lon: 37.91, lat: -0.02 },
  'South Africa': { lon: 22.94, lat: -30.56 },
};

export const FAB_FLYLINE_DATA = Object.entries(FAB_COUNTRY_COORDS).map(([name, coords]) => ({
  from: { id: name, ...coords },
  to: { id: 'shanghai', ...SHANGHAI_COORDS },
}));

export const SUMMIT_META = {
  dateRange: 'June 22-25, 2026',
  location: 'Shanghai, China',
  ticketUrl: 'https://events.humanitix.com/cross-border-capital-and-partnerships-in-women-s-health-china/tickets',
  heroDescription: {
    en: 'A 4-day China programme in Shanghai connecting global and Chinese leaders through a flagship conference, a dedicated capital and pitch day, and curated ecosystem visits.',
    zh: '为期四天的上海中国项目，通过旗舰峰会、资本与路演日及精选生态参访，连接全球与中国女性健康领袖。',
  },
  partnerLogos: [
    { src: '/img/summit-partners/clincase-logo.svg', alt: 'Clincase' },
    { src: '/img/summit-partners/femtech-across-borders-logo.svg', alt: 'FemTech Across Borders' },
  ],
} as const;

export const speakers: SpeakerData[] = [
  {
    id: 'ida-tin',
    name: 'Ida Tin',
    title: {
      en: 'Mother of FemTech, former CEO and chairwoman of Clue, Senior advisor on women\'s health, SPRIND',
      zh: 'FemTech概念首倡者，Clue前首席执行官兼董事长，SPRIND女性健康高级顾问',
    },
    organization: 'SPRIND',
    bio: {
      en: 'Mother of FemTech, former CEO and chairwoman of Clue. Senior advisor on women\'s health at SPRIND. Pioneered the global transition of women\'s health from a neglected field to an investable, scalable industry.',
      zh: 'FemTech概念首倡者，Clue前首席执行官，推动全球女性健康从"被忽视领域"迈向"可投资、可规模化"的产业升级进程。',
    },
    image: '/img/speakers/ida-tin.jpg',
  },
  {
    id: 'alice-zheng',
    name: 'Alice Zheng',
    title: {
      en: 'Partner, Foreground Capital',
      zh: '合伙人，Foreground Capital',
    },
    organization: 'Foreground Capital',
    bio: {
      en: 'Early-stage investor in women\'s health (Foreground Capital / formerly RH Capital). Former McKinsey San Francisco women\'s health investment research lead, combining clinical medicine and capital operations to support women\'s health innovation from research to commercialization.',
      zh: '女性健康领域早期投资人（Foreground Capital/前RH Capital），前麦肯锡旧金山女性健康投资研究带头人，兼具临床医学与资本运作双重背景。',
    },
    image: '/img/speakers/alice-zheng.jpeg',
  },
  {
    id: 'amina-sugimoto',
    name: 'Amina Sugimoto, DrPH',
    title: {
      en: 'Founder & CEO, Fermata Inc.',
      zh: '创始人兼CEO，Fermata Inc.',
    },
    organization: 'Fermata Inc.',
    bio: {
      en: 'Founder and CEO of Fermata, Japan\'s leading FemTech platform. DrPH, UN Women Asia-Pacific Youth Advisor, driving strategic commercialization of women\'s health innovation across Japan and Asia.',
      zh: '日本FemTech平台Fermata创始人兼CEO，公共卫生博士，联合国妇女署亚太区青年顾问，驱动女性健康创新在日本及泛亚洲市场的战略商业化。',
    },
    image: '/img/speakers/amina-sugimoto.jpg',
  },
  // Temporarily hidden speakers - Maaike and Lindsay
  // {
  //   id: 'maaike-steinebach',
  //   name: 'Maaike Steinebach',
  //   title: {
  //     en: 'Founder, FemTech Future / FemTech NL',
  //     zh: '创始人，FemTech Future / FemTech NL',
  //   },
  //   organization: 'FemTech Future',
  //   bio: {
  //     en: 'Former Visa VP for Greater China and Executive Director for Hong Kong & Macau. Leveraging extensive networks from international finance hubs, she drives cross-border innovation and strategic resource integration in women\'s health.',
  //     zh: '前Visa大中华区副总裁兼香港及澳门执行董事，凭借广泛高端网络，全力推动女性健康领域的跨国创新合作与战略资源整合。',
  //   },
  //   image: '/img/speakers/maaike-steinebach.png',
  // },
  // {
  //   id: 'lindsay-davis',
  //   name: 'Lindsay Davis',
  //   title: {
  //     en: 'Founder, FemTech Association Asia',
  //     zh: '创始人，亚洲女性健康科技协会',
  //   },
  //   organization: 'FemTech Association Asia',
  //   bio: {
  //     en: 'Founder of FemTech Association Asia. Led strategic initiatives at UNESCAP, UN Women, and other agencies. Milken Institute Women\'s Health Asia-Pacific invited speaker and columnist, driving Asian women\'s health innovation and international multilateral collaboration.',
  //     zh: 'FemTech Association Asia创始人，曾于联合国亚太经社会、妇女署等机构主导多项战略倡议，米尔肯研究所女性健康亚太区特邀演讲嘉宾。',
  //   },
  //   image: '/img/speakers/lindsay-davis.png',
  // },
  {
    id: 'vanessa-carpenter',
    name: 'Vanessa Julia Carpenter',
    title: {
      en: 'Cofounder, Nordic Women\'s Health Hub, Femtech Expert and Designer',
      zh: '联合创始人，北欧女性健康中心，女性健康科技专家与设计师',
    },
    organization: 'Nordic Women\'s Health Hub',
    bio: {
      en: 'Cofounder of the Nordic Women\'s Health Hub. Founder of the Nordic Hardware Women community, member of the Danish Design Council, and FemTech expert at the Danish Engineers Association. PhD from Aalborg University.',
      zh: '北欧女性健康中心联合创始人，北欧硬件女性社区发起人、丹麦设计委员会成员、丹麦工程师协会女性健康科技专家。',
    },
    image: '/img/speakers/vanessa-carpenter.png',
  },
  {
    id: 'judy-lux',
    name: 'Judy Lux',
    title: {
      en: 'Cofounder, Clincase',
      zh: '联合创始人，Clincase（德国旭东升）',
    },
    organization: 'Clincase',
    bio: {
      en: 'Pioneer connecting European and Chinese clinical trial infrastructure. Co-founded Clincase, an integrated platform for clinical trial electronic data capture (EDC) and clinical data management. Drives women\'s health research through digital trial infrastructure and cross-border collaboration.',
      zh: '连接欧洲与中国临床试验与研究基础设施领域先行者。联合创立Clincase——临床试验电子数据采集与临床数据管理一体化平台。',
    },
    image: '/img/speakers/judy-lux.jpg',
  },
  {
    id: 'abraham-morse',
    name: 'Abraham (Nick) Morse',
    title: {
      en: 'Director, Global Clinical Programs, Vira Health, Inc.',
      zh: '全球临床项目总监，Vira Health, Inc.',
    },
    organization: 'Vira Health',
    bio: {
      en: 'Director of Global Clinical Programs at Vira Health. Harvard Medical School graduate, trained in OB/GYN at Johns Hopkins Hospital and urogynecology at Mayo Clinic. Focuses on pelvic floor health and peripartum risk management.',
      zh: 'Vira Health全球临床项目总监，哈佛医学院毕业，历经约翰·霍普金斯医院妇产科培训及梅奥诊所泌尿妇科专科训练。',
    },
    image: '/img/speakers/abraham-morse.jpg',
  },
];

export const agendaDays: AgendaDayData[] = [
  {
    day: 1,
    date: 'June 22, 2026',
    title: {
      en: 'East-West Convergence & Dialogue',
      zh: '东西方融合与对话',
    },
    description: {
      en: 'The essential macro briefing. High-profile panels defining where Western innovation must meet Eastern market velocity in Women\'s Health.',
      zh: '核心宏观简报。高规格圆桌对话，定义西方创新与东方市场速度在女性健康领域的交汇点。',
    },
    highlights: { en: [], zh: [] },
    image: '/img/summit-programme/day1-conference.png',
    cta: {
      label: { en: 'Register for Access', zh: '注册参加' },
      href: 'https://events.humanitix.com/cross-border-capital-and-partnerships-in-women-s-health-china/tickets',
      external: true,
    },
  },
  {
    day: 2,
    date: 'June 23, 2026',
    title: {
      en: 'Deal-Flow Spotlight & Strategic Matchmaking',
      zh: '交易流聚焦与战略配对',
    },
    description: {
      en: 'Closed-Door. Engage in curated 1:1 matching and a Bayer-led pitch challenge with other domestic and international healthcare investors.',
      zh: '闭门环节。参与精心策划的1:1配对和由拜耳主导的路演挑战，与国内外医疗健康投资人深度互动。',
    },
    highlights: { en: [], zh: [] },
    image: '/img/summit-programme/day2-pitch.jpg',
    note: { en: 'Selected companies only | Application required', zh: '仅限入选企业 | 需提交申请' },
    cta: {
      label: { en: 'Apply to Pitch', zh: '申请路演' },
      href: '/shanghai-summit/pitch',
      variant: 'solid',
    },
  },
  {
    day: 3,
    date: 'June 24-25, 2026',
    title: {
      en: 'The Global Gateway',
      zh: '全球通道',
    },
    description: {
      en: 'Come for the China insight, leave with a Global partnership. While we dive deep into the "How-To" of China (Compliance, IP Protection, and Regulatory frameworks), the goal is Global Readiness. We provide access as a service that turns an internal champion into a warm global introduction. Best suited to visionary startups that understand China has far more to offer than market size alone — from learning and partnerships to sharper strategic perspective.',
      zh: '为中国洞察而来，带着全球合作而归。我们深入探讨中国的"实操指南"（合规、知识产权保护和监管框架），但目标是全球就绪。我们提供接入即服务，将企业内部推动者转化为真实的全球引荐。最适合有远见的初创企业——那些深谙中国的价值远不止市场规模的企业，还包括学习机会、合作关系和更敏锐的战略视角。',
    },
    highlights: { en: [], zh: [] },
    image: '/img/summit-programme/day3-gateway.jpg',
    note: { en: 'Curated access | Limited places', zh: '精选准入 | 名额有限' },
    cta: {
      label: { en: 'Request', zh: '申请' },
      href: '/shanghai-summit/programme',
      highlight: true,
    },
  },
];

export const PITCH_THEME = {
  en: 'BEYOND GENDER, BEYOND BORDERS: WOMEN\'S HEALTH FOR A SHARED FUTURE',
  zh: '超越性别与国界：面向共同未来的女性健康',
} as const;

export const COMPANY_TYPE_OPTIONS = [
  'Digital health / care delivery',
  'Medical device',
  'Diagnostics',
  'Biotech / therapeutics',
  'Consumer health / wellness brand',
  'Data / AI / infrastructure',
  'Other',
];

export const HEALTH_FOCUS_OPTIONS = [
  'Gynaecological Health',
  'Menstrual Health',
  'Reproductive Health / Contraception',
  'Sexual Health',
  'Maternity / Postpartum',
  'Perimenopause / Menopause',
  'Pelvic Health',
  'Oncology',
  'Chronic Conditions',
  'Mental / Neurological Health',
  "Women's General Health",
  'Other',
];

export const WORK_AREA_OPTIONS = [
  'Female Infertility',
  'Male Infertility',
  'Endometriosis',
  'PCOS',
  'Menopause',
  'Not listed',
];

export const BUSINESS_MODEL_OPTIONS = [
  'B2C (to patients)',
  'B2B (to clinics)',
  'B2B2C (clinics to patients)',
  'All of the above',
  'Other',
];

export const REVENUE_OPTIONS = [
  'Pre-Revenue',
  'Under USD$100K',
  'USD$100K - $1M',
  'USD$1M - $10M',
  'USD$10M+',
];

export const PROGRAMME_COHORTS = [
  { id: 'A', label: 'A: 19-23 Jan 2026 Shanghai', disabled: true, note: 'Fully Booked' },
  { id: 'B', label: 'B: 23-27 March 2026 Shanghai', disabled: false },
  { id: 'C', label: 'C: 11-15 May 2026 Shanghai', disabled: false },
  { id: 'D', label: 'D: 29 Jun - 3 Jul 2026 Shenzhen', disabled: false },
  { id: 'E', label: 'E: 14-18 September 2026 Shanghai', disabled: false },
  { id: 'F', label: 'F: 9-13 November 2026 Shenzhen', disabled: false },
];

export const PROGRAMME_COMPANY_STAGE_OPTIONS = [
  'Idea / MVP',
  'Early revenue',
  'Scaling',
  'Mature / profitable',
];

export const PROGRAMME_FUNDING_OPTIONS = [
  'Not raised',
  '<$500k',
  '$500k-$2m',
  '$2m-$10m',
  '$10m+',
];

export const PROGRAMME_CHINA_OBJECTIVES = [
  'Investor meetings',
  'Strategic partnerships (pharma/medtech/insurer/employer/research orgs)',
  'Distribution/channel partners',
  'Hospital/clinic pilots',
  'Regulatory pathway & compliance guidance',
  'Manufacturing/supply chain partners',
  'China GTM support',
];

export const PROGRAMME_TARGET_CUSTOMER_OPTIONS = [
  'Consumers (DTC)',
  'Hospitals/clinics',
  'Pharma/medtech partners',
  'Employers/insurers',
  'Government/public health',
  'Other',
];

export const PROGRAMME_CHINA_ENGAGEMENT_OPTIONS = [
  'No',
  'Explored only',
  'Already Selling',
  'Have Local Partner',
  'Have Entity',
];

export const PROGRAMME_CHINA_CONCERNS = [
  'Regulation',
  'IP',
  'Data compliance',
  'Pricing',
  'GTM',
  'Culture',
  'Finding the right partners',
  'Other',
];
