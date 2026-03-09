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
  stats: [
    { label: { en: '4 DAYS', zh: '4 天' } },
    { label: { en: '20-30 COMPANIES', zh: '20-30 家企业' } },
    { label: { en: '6+ COUNTRIES', zh: '6+ 国家' } },
    { label: { en: '40+ SPEAKERS', zh: '40+ 演讲嘉宾' } },
  ],
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
      en: 'Mother of FemTech, Former CEO & Chairwoman of Clue',
      zh: 'FemTech概念首倡者，Clue前首席执行官',
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
    id: 'vanessa-carpenter',
    name: 'Vanessa Julia Carpenter',
    title: {
      en: 'Cofounder, Nordic Women\'s Health Hub',
      zh: '联合创始人，北欧女性健康中心',
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
    id: 'abraham-morse',
    name: 'Abraham (Nick) Morse',
    title: {
      en: 'Urogynecology Specialist',
      zh: '泌尿妇科专家',
    },
    organization: 'Harvard Medical / Mayo Clinic',
    bio: {
      en: 'Harvard Medical School graduate, trained in OB/GYN at Johns Hopkins Hospital and urogynecology at Mayo Clinic. Focuses on pelvic floor health and peripartum risk management.',
      zh: '哈佛医学院毕业，历经约翰·霍普金斯医院妇产科培训及梅奥诊所泌尿妇科专科训练，聚焦盆底健康与围产期风险管理。',
    },
  },
  {
    id: 'amina-sugimoto',
    name: 'Amina Sugimoto',
    title: {
      en: 'Cofounder & CEO, Fermata',
      zh: '联合创始人兼CEO，Fermata',
    },
    organization: 'Fermata',
    bio: {
      en: 'Cofounder and CEO of Fermata, Japan\'s leading FemTech platform. Also serves as UN Women Asia-Pacific Youth Advisor, driving strategic commercialization of women\'s health innovation across Japan and Asia.',
      zh: '日本FemTech平台Fermata联合创始人兼CEO，联合国妇女署亚太区青年顾问，驱动女性健康创新在日本及泛亚洲市场的战略商业化。',
    },
  },
  {
    id: 'maryann-selfe',
    name: 'Maryann Selfe',
    title: {
      en: 'MD, Investment Solutions; Founder, FemmeHealth Alliance',
      zh: '投资解决方案董事总经理，FemmeHealth Alliance创始人',
    },
    organization: 'FemmeHealth Alliance',
    bio: {
      en: 'Managing Director of Investment Solutions at a Swiss-Luxembourg private bank. Founder of FemmeHealth Alliance, connecting European capital with women\'s health innovation through high-net-worth client networks.',
      zh: '瑞士卢森堡私人银行投资解决方案董事总经理、FemmeHealth Alliance创始人，链接欧洲资本与女性健康创新生态。',
    },
  },
];

export const agendaDays: AgendaDayData[] = [
  {
    day: 1,
    date: 'June 22, 2026',
    title: {
      en: 'Global Leaders Summit',
      zh: '巅峰视野·全球领袖峰会',
    },
    description: {
      en: 'Keynotes and panels from global industry pioneers and clinical experts, redefining China\'s position in the global women\'s health technology landscape.',
      zh: '站在全球视角，聆听产业先驱与临床权威的真知灼见，重新定义中国在全球女性健康科技版图中的坐标。',
    },
    highlights: {
      en: [
        'Investment trends and deal insights',
        'Ecosystem synergy driving industry acceleration',
        'China as strategic hub for cross-border deals',
        'Menopause & aging: the overlooked billion-dollar track',
        'Breakthrough innovations in endometriosis & chronic conditions',
        'Preventive health and consumer healthcare',
      ],
      zh: [
        '投资趋势与交易洞察',
        '生态协同促成产业加速',
        '中国的战略枢纽与交易主场',
        '更年期与女性健康老龄化：被忽视的千亿赛道',
        '子宫内膜异位症及慢性疾病的诊疗突破',
        '从被动治疗到主动健康',
      ],
    },
    cta: {
      label: { en: 'TICKET FOR CONFERENCE', zh: '购买峰会门票' },
      href: 'https://events.humanitix.com/cross-border-capital-and-partnerships-in-women-s-health-china/tickets',
      external: true,
    },
  },
  {
    day: 2,
    date: 'June 23, 2026',
    title: {
      en: 'Pitch Day - Capital Navigation',
      zh: '资本领航·全球女性健康创新路演日',
    },
    description: {
      en: 'Led by Bayer Women\'s Health, 20-30 of the most disruptive early and growth-stage women\'s health companies pitch to global investors.',
      zh: '由拜耳女性健康领导，从全球申请者中严选20-30家最具颠覆潜力的早期及成长期女性健康科技公司面对全球投资人。',
    },
    highlights: {
      en: [
        'Morning pitch sessions',
        'Afternoon deep-dive investor matching',
        'Bayer-sponsored pitch stage',
        'Global investor panel',
      ],
      zh: [
        '上午路演环节',
        '下午深度对接投资人',
        '拜耳赞助路演舞台',
        '全球投资人评委',
      ],
    },
    cta: {
      label: { en: 'APPLY FOR THE PITCH', zh: '申请路演' },
      href: '/shanghai-summit/pitch',
    },
  },
  {
    day: 3,
    date: 'June 24, 2026',
    title: {
      en: 'Park Visits & China Programme',
      zh: '园区参访与中国项目',
    },
    description: {
      en: 'Experience Shanghai Qiantan\'s innovation vitality through park visits, pharma & biotech company tours, hospital visits, and closed-door workshops.',
      zh: '让全球嘉宾亲身感受上海前滩的创新活力与产业温度，参访园区、药企、医院及闭门工作坊。',
    },
    highlights: {
      en: [
        'Innovation park tours',
        'Pharma & biotech company visits',
        'Hospital & clinic visits',
        'Closed-door workshops: policy, regulation, IP, data compliance',
      ],
      zh: [
        '创新园区参访',
        '跨国药企与本土龙头参访',
        '医院诊所参访',
        '闭门工作坊：政策扶持、监管通关、知识产权、数据安全',
      ],
    },
    cta: {
      label: { en: 'APPLY FOR THE PROGRAMME', zh: '申请中国项目' },
      href: '/shanghai-summit/programme',
    },
  },
  {
    day: 4,
    date: 'June 25, 2026',
    title: {
      en: 'Consumer Ecosystem & Market Observation',
      zh: '消费生态与市场观察',
    },
    description: {
      en: 'Step into Shanghai\'s world-leading consumer healthcare ecosystem. Visit e-commerce platforms, observe multinational ecosystems, and experience cultural consumption scenes.',
      zh: '走进上海领先的消费医疗产业生态，走访电商平台、观察跨国企业生态、体验文化消费场景。',
    },
    highlights: {
      en: [
        'E-commerce platform visits',
        'Multinational enterprise ecosystem observation',
        'Cultural experience activities',
        'Understanding Chinese women\'s health aesthetics & lifestyle',
      ],
      zh: [
        '电商平台走访',
        '跨国企业生态观察',
        '文化体验活动',
        '感受中国女性的生活美学与健康观念',
      ],
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
