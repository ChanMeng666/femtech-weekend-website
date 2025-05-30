import React from 'react';
import Layout from '@theme/Layout';
import { JoinForm } from '@site/src/components/Ecosystem/JoinForm';
import { getEcosystemJoinTitle, getEcosystemJoinDescription } from '../../constants/ecosystem-join';

export default function JoinEcosystemPage() {
  const title = getEcosystemJoinTitle();
  const description = getEcosystemJoinDescription();
  
  return (
    <Layout
      title={title}
      description={description}
    >
      <div 
        className="min-h-screen w-full"
        style={{ 
          backgroundImage: 'url(/img/bg/abstract-flowing-lines-and-elegant-curves-represen1-0.png)', 
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundAttachment: 'scroll',
          position: 'relative'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/90 pointer-events-none"></div>
        
        <div className="relative z-10 pt-8 pb-24">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="py-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100">
                <JoinForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 