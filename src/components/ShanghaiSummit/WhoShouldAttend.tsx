import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import { AnimatedLine } from '../ui/AnimatedLine';
import {
  Rocket,
  TrendingUp,
  Building2,
  Network,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface BilingualText {
  en: string;
  zh: string;
}

interface AudienceItem {
  id: string;
  title: BilingualText;
  highlight: BilingualText;
  description: BilingualText;
  icon: LucideIcon;
}

const audienceItems: AudienceItem[] = [
  {
    id: 'innovators',
    title: { en: 'Global Innovators', zh: '全球创新者' },
    highlight: { en: 'BUILDING', zh: '构建' },
    description: {
      en: "in women's health and looking for visibility, partnerships, capital, or sharper cross-border insight that travels globally",
      zh: '在女性健康领域寻求曝光、合作伙伴关系、资本或更敏锐的跨境洞察',
    },
    icon: Rocket,
  },
  {
    id: 'investors',
    title: { en: 'For Investors', zh: '投资者' },
    highlight: { en: 'SEEKING', zh: '寻求' },
    description: {
      en: "stronger understanding of the category, founder exposure, and government perspectives on China's role in the future of women's health.",
      zh: '更深入地了解该领域、接触创始人，以及政府对中国在女性健康未来中角色的观点。',
    },
    icon: TrendingUp,
  },
  {
    id: 'industry',
    title: { en: 'Industry Partners', zh: '行业合作伙伴' },
    highlight: { en: 'EXPLORING', zh: '探索' },
    description: {
      en: "innovation, strategic collaboration, market signals, and where women's health is gaining real global momentum.",
      zh: '创新、战略合作、市场信号，以及女性健康在全球获得真正发展势头的领域。',
    },
    icon: Building2,
  },
  {
    id: 'ecosystem',
    title: { en: 'For Ecosystem Leaders', zh: '生态系统领袖' },
    highlight: { en: 'CONVENING', zh: '召集' },
    description: {
      en: ', shaping, and supporting the field across policy, research, delivery, global exchange, and ecosystem development.',
      zh: '塑造和支持政策、研究、服务交付、全球交流和生态系统发展等领域。',
    },
    icon: Network,
  },
];

const sectionText = {
  label: { en: 'AUDIENCE', zh: '参会对象' },
  heading: { en: 'Who Should Be in the Room', zh: '谁应该在场' },
  subline: {
    en: "Designed for stakeholders who want to engage seriously with the future of women's health across markets.",
    zh: '专为希望认真参与跨市场女性健康未来的利益相关者而设计。',
  },
  cta: { en: 'View Programme', zh: '查看议程' },
};

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const easeCubic: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeCubic },
  },
};

const iconFloatVariants = {
  hover: {
    scale: 1.15,
    y: -4,
    transition: { duration: 0.4, ease: 'easeInOut' as const },
  },
};

const arrowVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

function AudienceCard({
  item,
  locale,
}: {
  item: AudienceItem;
  locale: 'en' | 'zh';
}) {
  const Icon = item.icon;

  return (
    <motion.a
      href="#programme"
      className="group relative flex flex-col bg-card border border-border overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg no-underline"
      variants={cardRevealVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: easeCubic }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: '#AA7C52', opacity: 0.4 }}
      />

      {/* Decorative icon watermark */}
      <motion.div
        className="absolute top-4 right-4 pointer-events-none"
        variants={iconFloatVariants}
      >
        <Icon
          size={56}
          strokeWidth={1}
          className="text-[#AA7C52]"
          style={{ opacity: 0.08 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
        <span className="text-[#AA7C52] font-medium tracking-[0.15em] text-xs uppercase mb-2">
          {item.highlight[locale]}
        </span>

        <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mb-3">
          {item.title[locale]}
        </h3>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 flex-grow">
          {item.description[locale]}
        </p>

        {/* CTA */}
        <div className="flex items-center text-sm font-medium text-[#AA7C52] mt-auto">
          <span className="tracking-wide uppercase text-xs">
            {sectionText.cta[locale]}
          </span>
          <motion.div variants={arrowVariants} className="ml-2">
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}

export function WhoShouldAttend() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  return (
    <div className="relative bg-background py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: easeCubic }}
        >
          <AnimatedLine variant="label" label={sectionText.label[locale]} />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-6 gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              {sectionText.heading[locale]}
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
            {sectionText.subline[locale]}
          </p>
        </motion.div>

        {/* Audience card grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {audienceItems.map((item) => (
            <AudienceCard key={item.id} item={item} locale={locale} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
