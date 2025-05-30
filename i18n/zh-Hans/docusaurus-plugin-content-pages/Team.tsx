import React from 'react';
import { TeamMember, TeamMemberProps } from '../../../src/components/AboutUs/TeamMember';
import { getTeamMeetOurTeamTitle, getTeamDescription } from '../../../src/constants/about-us-components';

export function Team() {
  const title = getTeamMeetOurTeamTitle();
  const description = getTeamDescription();
  
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Zhu Yihan",
      role: "创始人兼首席执行官",
      bio: "数据专家，资产负债表管理专家，全球公民，擅长跨境推动女性健康创新。",
      image: "/img/team/zhu-yihan.jpg",
    },
    {
      name: "Michelle Li",
      role: "合作伙伴关系负责人",
      bio: "私募股权投资和尽职调查专家，专注于连接女性健康科技初创企业与战略投资者。",
      image: "/img/team/michelle-li.jpg",
    },
    {
      name: "Leaf He",
      role: "首席运营官",
      bio: "财务顾问和社区建设专家，专注于创建可持续的生态系统增长和卓越运营。",
      image: "/img/team/leaf-he.jpg",
    },
    {
      name: "Joji Lee",
      role: "首席营销官",
      bio: "专注于公关、消费者营销和活动组织，为女性健康创新提升全球影响力。",
      image: "/img/team/joji-lee.jpg",
    },
    {
      name: "Lingxi Zhang",
      role: "首席设计官",
      bio: "专注于动画、视频编辑和故事讲述，为女性健康科技社区创造引人入胜的叙事。",
      image: "/img/team/lingxi-zhang.jpg",
    },
    {
      name: "Chan Meng",
      role: "首席技术官",
      bio: "资深AI/ML基础架构工程师，擅长构建强大的技术基础，为AI驱动的健康见解提供支持。热衷于增加STEM领域的女性代表性，并为女性健康领域的多元化人群创建包容性AI系统。",
      image: "/img/team/chan-meng.jpg",
    }
  ];

  return (
    <div className="bg-muted/30 py-24 sm:py-32">
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
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
} 