import React, { useEffect, useState } from 'react';
import TestCard from '../components/TestCard';
import { getAllTests, rerunTestById } from '../services/api';

const DashboardPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getAllTests();
      setTests(data);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRerun = async (id) => {
    try {
      await rerunTestById(id);
      fetchTests(); // refresh list
    } catch (err) {
      alert('Failed to rerun test.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">📋 Recent Test Runs</h1>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : tests.length === 0 ? (
        <p className="text-gray-400">No test runs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <TestCard key={test._id} test={test} onRerun={handleRerun} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
