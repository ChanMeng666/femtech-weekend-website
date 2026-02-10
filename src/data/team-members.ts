export interface TeamMemberData {
  id: string;
  name: string;
  role: { en: string; zh: string };
  bio: { en: string; zh: string };
  image: string;
  linkedin?: string;
}

export const teamMembers: TeamMemberData[] = [
  {
    id: "zhu-yihan",
    name: "Zhu Yihan",
    role: {
      en: "Founder & CEO",
      zh: "创始人兼首席执行官",
    },
    bio: {
      en: "Data, Balance Sheet Management and a global citizen with expertise in driving women's health innovation across borders.",
      zh: "数据专家，资产负债表管理专家，全球公民，擅长跨境推动女性健康创新。",
    },
    image: "/img/team/zhu-yihan-1.png",
  },
  {
    id: "michelle-li",
    name: "Michelle Li",
    role: {
      en: "Head of Partnerships",
      zh: "合作伙伴关系负责人",
    },
    bio: {
      en: "Expert in Private Equity investment and Due Diligence, specializing in connecting FemTech startups with strategic investors.",
      zh: "私募股权投资和尽职调查专家，专注于连接女性健康科技初创企业与战略投资者。",
    },
    image: "/img/team/michelle-li-1.png",
  },
  {
    id: "leaf-he",
    name: "Leaf He",
    role: {
      en: "Chief Operating Officer",
      zh: "首席运营官",
    },
    bio: {
      en: "Expert in Financial Advisory and community building, focused on creating sustainable ecosystem growth and operational excellence.",
      zh: "财务顾问和社区建设专家，专注于创建可持续的生态系统增长和卓越运营。",
    },
    image: "/img/team/leaf-he-1.png",
  },
  {
    id: "lingxi-zhang",
    name: "Lingxi Zhang",
    role: {
      en: "Chief Design Officer",
      zh: "首席设计官",
    },
    bio: {
      en: "Specializes in Animation, Video editing and story telling, creating compelling narratives for the FemTech community.",
      zh: "专注于动画、视频编辑和故事讲述，为女性健康科技社区创造引人入胜的叙事。",
    },
    image: "/img/team/lingxi-zhang-1.png",
  },
  {
    id: "chan-meng",
    name: "Chan Meng",
    role: {
      en: "Chief Technology Officer",
      zh: "首席技术官",
    },
    bio: {
      en: "Senior AI/ML Infrastructure Engineer with expertise in architecting robust technical foundations that power AI-driven health insights. Passionate about increasing representation in STEM fields and creating inclusive AI systems for diverse populations in women's health.",
      zh: "资深AI/ML基础架构工程师，擅长构建强大的技术基础，为AI驱动的健康见解提供支持。热衷于增加STEM领域的女性代表性，并为女性健康领域的多元化人群创建包容性AI系统。",
    },
    image: "/img/team/chan-meng-1.png",
  },
];

export const advisors: TeamMemberData[] = [
  {
    id: "celina-chew",
    name: "Celina Chew",
    role: {
      en: "Former President of Bayer Group Greater China",
      zh: "前拜耳大中华区总裁",
    },
    bio: {
      en: "Celina is the former President of Bayer for Greater China.  She holds Bachelor and Master degrees in law. She worked as a private practice lawyer before moving in-house to the Bayer Greater China Legal Department in 1997.  She was head of Legal in Greater China (1998-2011), then became Country Group Head for Bayer North ASEAN Region (2011-2014) and President of Bayer, Greater China (2014-2019) overseeing Bayer's operations in these regions. Celina has also been a Board member of various chambers of commerce, Enactus China and has acted as advisor to various organizations such as Ladies Who Tech, SilVR Adventures, Global Women Connect. She is honoured to be named in Forbes 100 Most Powerful Business Lists (2017 and 2018) and to receive an International Friendship Award from IESE in 2018, presented by the Queen of Spain. Celina is also featured in the book \"China CEO II: Voices of Experience from 25 Top Executives Leading MNCs in China\" by Juan Antonio Fernandez, Laurie Underwood.",
      zh: `Celina曾任拜耳集团大中华区总裁，拥有法学学士及硕士学位。在1997年加入拜耳大中华区法律部之前，她曾从事执业律师工作。1998至2011年间，她担任拜耳大中华区法律负责人，随后于2011至2014年出任拜耳北亚盟地区国家集团负责人，并于2014至2019年升任拜耳大中华区总裁，全面管理拜耳在上述区域的业务运营。Celina还担任过多个商会、创行中国（Enactus China）的董事会成员，并为\u201c科技女性\u201d（Ladies Who Tech）、\u201cSilVR Adventures\u201d、\u201c全球女性联结\u201d（Global Women Connect）等组织提供顾问服务。她曾荣登《福布斯》\u201c全球最具影响力女性百强榜\u201d（2017年及2018年），并于2018年获西班牙女王亲自颁授IESE国际友谊奖。此外，她的管理智慧被收录于胡安·安东尼奥·费尔南德斯与劳里·安德伍德合著的《中国CEO II：跨国企业在华领军者的25人经验实录》一书。`,
    },
    image: "/img/team/advisor-celina-chew.jpg",
  },
  {
    id: "sandy-lv",
    name: "Sandy Lv",
    role: {
      en: "Bayer Women's Health Department",
      zh: "拜耳女性健康部门",
    },
    bio: {
      en: "Sandy is responsible for innovation and commercialization in early venture partnerships. One of Bayer Women's Health's key focus areas is to collaboratively build a women's health ecosystem with partners from government, industry, academia, research, and technology innovation companies. The goal is to dispel misconceptions, raise awareness of diseases, and provide high-quality, professional, and comprehensive healthcare services for women at all stages of life.",
      zh: "Sandy 负责早期项目的创新与商业化（early venture partnership）。拜耳女性健康的一个重要方向是与来自政、产、学、研、和科技创新公司的伙伴携手共建女性健康生态圈，提升消除误解，提升疾病认识，为不同阶段的女性优质专业的全方位医疗服务。",
    },
    image: "/img/team/advisor-sandy-lv.jpg",
  },
  {
    id: "nicole-bu",
    name: "Nicole Bu",
    role: {
      en: "Healthcare Business Developer",
      zh: "医疗行业业务拓展",
    },
    bio: {
      en: "Over 7+ years in startups scaling at-home diagnostics, SaMD, and remote patient monitoring platforms, Nicole has spearheaded GTM strategies for new product launches and built high-conversion, AI-automated sales funnels, cultivating a network of 500+ providers across pulmonology, mental health, and primary care. Combining operational execution with data-driven decision-making (MS, Healthcare Decision Analysis, USC), Nicole bridges the gap between innovation and clinical adoption—driving growth for cutting-edge healthtech solutions.",
      zh: "在大健康初创企业深耕7年以上，专注于居家诊断、医疗设备软件（SaMD）和远程患者监护平台的规模化运营期间，Nicole主导了多款新品上市的全周期商业化战略，打造了高转化率的人工智能自动化销售漏斗，并构建了覆盖500余家呼吸科、精神健康及初级护理医疗机构的合作网络。凭借南加州大学医疗决策分析硕士的专业背景，Nicole将高效运营与数据驱动决策相结合，持续弥合技术创新与临床落地之间的鸿沟，为前沿数字健康解决方案开拓增长路径。",
    },
    image: "/img/team/advisor-nicole-bu.svg",
  },
  {
    id: "yvonne-lu",
    name: "Huiqi (Yvonne) Lu",
    role: {
      en: "Lecturer in Engineering Science, University of Oxford",
      zh: "牛津大学工程科学讲师",
    },
    bio: {
      en: "Dr Huiqi Yvonne Lu is a researcher in AI for health and sensor informatics and a Lecturer in Engineering Science at the University of Oxford. Her research focuses on AI for digital health and sensor signal processing, and wearable devices for health monitoring (human, machine, and environmental changes). Dr Lu has led and co-led clinical AI and mobile health projects in academic and commercial settings and filed one patent. She has served as the conference and workshop committee member at notable conferences, including ICLR (PMLDC), NeurIPs (ML4H), IJCAI(KDHD), and the PHM. Dr Lu actively contributes to the IEEE Standard Committee for P3191: Performance Monitoring of Machine Learning-enabled Medical Devices in Clinical Use. She is an Associate Editor of Nature npj Women's Health, a Chief Editor of a special collection of \"Advances in AI for Women's Health, Reproductive Health, and Maternal Care: Bridging Innovation and Healthcare\". She also holds an honorary Research Fellow position at the George Institute for Global Health, Imperial College London.",
      zh: `陆卉琪博士是牛津大学工程科学讲师，健康人工智能与传感器信息学的研究员。她的研究方向包括数字健康领域的人工智能与传感器信号处理，以及用于监测人体、设备和环境变化的可穿戴健康设备。陆博士曾在学术界和产业界领导或协同领导多项临床人工智能与移动健康项目，并已申请一项专利。她还担任多个国际知名会议及研讨会的委员会成员，包括 ICLR（PMLDC）、NeurIPS（ML4H）、IJCAI（KDHD）及 PHM。在标准制定方面，陆博士积极参与 IEEE 标准委员会 P3191——\u201c基于机器学习的医疗设备在临床使用过程中的性能监测\u201d 的编制工作。她同时是期刊 Nature npj Women's Health 的副主编，也是特刊《女性与母婴健康人工智能进展：创新与医疗的桥梁》的主编。此外，她还在伦敦帝国理工学院的乔治全球健康研究所担任名誉研究员。`,
    },
    image: "/img/team/advisor-yvvone.jpeg",
  },
];
