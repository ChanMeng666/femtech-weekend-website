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
      bio: "前拜耳大中华区总裁。她拥有法学学士和硕士学位，职业生涯起步于澳大利亚和中国香港/内地的私人律师事务所，后于1997年加入拜耳大中华区法务部，开始其企业内部法律顾问的职业发展。Celina 大部分职业生涯都在拜耳度过，曾担任大中华区法务负责人（1998年至2011年），以及多个管理职位，包括拜耳北东南亚地区国家集团负责人（2011年至2014年）和拜耳大中华区总裁（2014年至2019年），全面负责拜耳在这些地区的运营事务。Celina 还曾担任多个商会、Enactus 中国的董事会成员，并担任如 Ladies Who Tech 等组织的顾问。她曾荣登《福布斯》\"全球最具影响力女性100强\"榜单（2016年与2017年），并于2018年获得 IESE 商学院颁发的\"国际友谊奖\"。",
    },
    {
      name: "Sandy Lv",
      role: "拜耳女性健康部门",
      bio: "Sandy 负责早期项目的创新与商业化（early venture partnership）。拜耳女性健康的一个重要方向是与来自政、产、学、研、和科技创新公司的伙伴携手共建女性健康生态圈，提升消除误解，提升疾病认识，为不同阶段的女性优质专业的全方位医疗服务。",
    },
    {
      name: "Nicole Bu",
      role: "医疗行业业务拓展",
      bio: "一位充满热情、自我驱动的医疗行业业务拓展人员，拥有3.5年从业经验，擅长医疗服务提供商销售、B2B医疗合作伙伴关系建立、销售运营优化以及客户关系管理，持续实现并超越关键绩效目标（OKRs）",
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