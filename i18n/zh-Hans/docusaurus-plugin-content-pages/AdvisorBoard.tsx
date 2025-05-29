import React from 'react';
import { TeamMember, TeamMemberProps } from '../../../src/components/AboutUs/TeamMember';
import { getAdvisorBoardTitle, getAdvisorBoardDescription } from '../../../src/constants/about-us-components';

export function AdvisorBoard() {
  const title = getAdvisorBoardTitle();
  const description = getAdvisorBoardDescription();
  
  const advisors: TeamMemberProps[] = [
    {
      name: "Celina Chew",
      role: "前拜耳大中华区总裁",
      bio: `Celina曾任拜耳集团大中华区总裁，拥有法学学士及硕士学位。在1997年加入拜耳大中华区法律部之前，她曾从事执业律师工作。1998至2011年间，她担任拜耳大中华区法律负责人，随后于2011至2014年出任拜耳北亚盟地区国家集团负责人，并于2014至2019年升任拜耳大中华区总裁，全面管理拜耳在上述区域的业务运营。Celina还担任过多个商会、创行中国（Enactus China）的董事会成员，并为"科技女性"（Ladies Who Tech）、"SilVR Adventures"、"全球女性联结"（Global Women Connect）等组织提供顾问服务。她曾荣登《福布斯》"全球最具影响力女性百强榜"（2017年及2018年），并于2018年获西班牙女王亲自颁授IESE国际友谊奖。此外，她的管理智慧被收录于胡安·安东尼奥·费尔南德斯与劳里·安德伍德合著的《中国CEO II：跨国企业在华领军者的25人经验实录》一书。`,
      image: "/img/team/advisor-celina-chew.jpg",
    },
    {
      name: "Sandy Lv",
      role: "拜耳女性健康部门",
      bio: `Sandy 负责早期项目的创新与商业化（early venture partnership）。拜耳女性健康的一个重要方向是与来自政、产、学、研、和科技创新公司的伙伴携手共建女性健康生态圈，提升消除误解，提升疾病认识，为不同阶段的女性优质专业的全方位医疗服务。`,
      image: "/img/team/advisor-sandy-lv.jpg",
    },
    {
      name: "Nicole Bu",
      role: "医疗行业业务拓展",
      bio: `在大健康初创企业深耕7年以上，专注于居家诊断、医疗设备软件（SaMD）和远程患者监护平台的规模化运营期间，Nicole主导了多款新品上市的全周期商业化战略，打造了高转化率的人工智能自动化销售漏斗，并构建了覆盖500余家呼吸科、精神健康及初级护理医疗机构的合作网络。凭借南加州大学医疗决策分析硕士的专业背景，Nicole将高效运营与数据驱动决策相结合，持续弥合技术创新与临床落地之间的鸿沟，为前沿数字健康解决方案开拓增长路径。`,
      image: "/img/team/advisor-nicole-bu.svg",
    }
  ];

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {advisors.map((advisor, index) => (
            <TeamMember key={index} {...advisor} />
          ))}
        </div>
      </div>
    </div>
  );
} 