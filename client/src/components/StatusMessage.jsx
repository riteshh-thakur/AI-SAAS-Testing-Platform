// client/src/components/StatusMessage.jsx
import React from 'react';

const StatusMessage = ({ type, message }) => {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    loading: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className={`rounded-md p-3 mb-4 text-sm ${colors[type]}`}>
      {message}
    </div>
  );
};

export default StatusMessage;
