import React, { useState } from 'react';
import { generateTests, runTests } from '../services/api'; // ✅ make sure runTests is imported
import StatusMessage from './StatusMessage';

const URLInputForm = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Generating tests. Please wait...' });

    try {
      const generated = await generateTests(url); // ✅ generate
      setStatus({ type: 'loading', message: 'Running the test suite...' });

      await runTests(generated._id); // ✅ run test using ID from response
      setStatus({ type: 'success', message: 'Test executed successfully!' });

      setUrl('');
    } catch (errMessage) {
      setStatus({ type: 'error', message: errMessage });
    }
  };

  return (
    <form className="w-full max-w-xl mx-auto mt-10" onSubmit={handleSubmit}>
      {status.message && <StatusMessage type={status.type} message={status.message} />}

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (https://...)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Generate Tests
        </button>
      </div>
    </form>
  );
};

export default URLInputForm;
