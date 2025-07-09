// client/src/components/TestCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test, onRerun }) => {
  const { url, status, createdAt } = test;
  const navigate = useNavigate();

  const statusColors = {
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 flex flex-col gap-4 border">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-700">{url}</h2>
        <span className={`px-3 py-1 text-sm rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-500">Created: {new Date(createdAt).toLocaleString()}</p>

      <div className="flex gap-4">
        <button
          onClick={() => onRerun(test._id)}
          className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Rerun
        </button>
        <button
          onClick={() => navigate(`/test/${test._id}`)}
          className="px-4 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TestCard;
