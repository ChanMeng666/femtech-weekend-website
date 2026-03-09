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
  cta?: {
    label: { en: string; zh: string };
    href: string;
    external?: boolean;
  };
}

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
    image: '/img/speakers/alice-zheng.png',
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
  {
    id: 'maaike-steinebach',
    name: 'Maaike Steinebach',
    title: {
      en: 'Founder, FemTech Future / FemTech NL',
      zh: '创始人，FemTech Future / FemTech NL',
    },
    organization: 'FemTech Future',
    bio: {
      en: 'Former Visa VP for Greater China and Executive Director for Hong Kong & Macau. Leveraging extensive networks from international finance hubs, she drives cross-border innovation and strategic resource integration in women\'s health.',
      zh: '前Visa大中华区副总裁兼香港及澳门执行董事，凭借广泛高端网络，全力推动女性健康领域的跨国创新合作与战略资源整合。',
    },
    image: '/img/speakers/maaike-steinebach.png',
  },
  {
    id: 'lindsay-davis',
    name: 'Lindsay Davis',
    title: {
      en: 'Founder, FemTech Association Asia',
      zh: '创始人，亚洲女性健康科技协会',
    },
    organization: 'FemTech Association Asia',
    bio: {
      en: 'Founder of FemTech Association Asia. Led strategic initiatives at UNESCAP, UN Women, and other agencies. Milken Institute Women\'s Health Asia-Pacific invited speaker and columnist, driving Asian women\'s health innovation and international multilateral collaboration.',
      zh: 'FemTech Association Asia创始人，曾于联合国亚太经社会、妇女署等机构主导多项战略倡议，米尔肯研究所女性健康亚太区特邀演讲嘉宾。',
    },
    image: '/img/speakers/lindsay-davis.png',
  },
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
      en: 'Conference',
      zh: '旗舰国际峰会',
    },
    description: {
      en: 'A flagship international conference bringing together global and Chinese leaders in women\'s health for a full day of keynotes, panels, and high-level networking.',
      zh: '旗舰国际峰会，汇聚全球与中国女性健康领袖，全天主题演讲、圆桌对话与高端交流。',
    },
    highlights: { en: [], zh: [] },
    cta: {
      label: { en: 'GET CONFERENCE TICKETS', zh: '获取峰会门票' },
      href: 'https://events.humanitix.com/cross-border-capital-and-partnerships-in-women-s-health-china/tickets',
      external: true,
    },
  },
  {
    day: 2,
    date: 'June 23, 2026',
    title: {
      en: 'Capital & Pitch Day',
      zh: '资本与路演日',
    },
    description: {
      en: 'Led by Bayer, a dedicated day of closed-door pitch sessions connecting 20-30 of the most promising early and growth-stage women\'s health companies with global investors and corporate partners.',
      zh: '由拜耳主导，闭门路演日汇聚20-30家最具潜力的早期及成长期女性健康企业，对接全球投资人与企业合作伙伴。',
    },
    highlights: { en: [], zh: [] },
    cta: {
      label: { en: 'SUBMIT PITCH APPLICATION', zh: '提交路演申请' },
      href: '/shanghai-summit/pitch',
    },
  },
  {
    day: 3,
    date: 'June 24-25, 2026',
    title: {
      en: 'China Ecosystem Visits',
      zh: '中国生态参访',
    },
    description: {
      en: 'Curated visits to Shanghai\'s innovation parks, pharma and biotech companies, hospitals, e-commerce platforms, and closed-door workshops on regulation, IP, and market access.',
      zh: '精心策划的上海创新园区、药企与生物科技公司、医院、电商平台参访，以及围绕监管、知识产权与市场准入的闭门工作坊。',
    },
    highlights: { en: [], zh: [] },
    cta: {
      label: { en: 'REQUEST FULL PROGRAMME ACCESS', zh: '申请完整项目' },
      href: '/shanghai-summit/programme',
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
  'Other',
];
