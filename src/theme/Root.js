import React from 'react';
import { Chatbot } from '@site/src/components/Chatbot';

// This component wraps the root of your Docusaurus app
export default function Root({children}) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}