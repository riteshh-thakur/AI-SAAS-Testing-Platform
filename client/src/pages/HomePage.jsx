import React from 'react';
import URLInputForm from '../components/URLInputForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start px-6 pt-20">
      <h1 className="text-3xl font-bold text-white mb-4">AI SaaS Testing Platform</h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Enter your website URL below. Our AI will generate a test suite and run it using Playwright MCP.
      </p>
      <URLInputForm />
    </div>
  );
};

export default HomePage;
