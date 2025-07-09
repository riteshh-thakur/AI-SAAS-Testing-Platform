import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScriptViewer from '../components/ScriptViewer';
import LogViewer from '../components/LogViewer';
import axios from 'axios';

const TestDetailsPage = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const res = await axios.get(`https://ai-saas-testing-platform.onrender.com/results/${id}`);
        setTestData(res.data);
      } catch (err) {
        console.error('Failed to fetch test details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [id]);

  if (loading) return <p className="p-6 text-white">Loading test details...</p>;

  if (!testData) return <p className="p-6 text-red-400">Test not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Test Details for: {testData.url}</h1>

      <ScriptViewer code={testData.script} />

      <h2 className="text-lg font-semibold mt-6 mb-2">Execution Logs</h2>
      <LogViewer logs={testData.logs} />

      <h2 className="text-lg font-semibold mt-6 mb-2">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {testData.screenshots?.map((src, index) => (
          <img
            key={index}
            src={`http://localhost:5000${src}`}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto border rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default TestDetailsPage;
