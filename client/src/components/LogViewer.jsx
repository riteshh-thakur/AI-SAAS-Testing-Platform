// client/src/components/LogViewer.jsx
import React from 'react';

const LogViewer = ({ logs }) => {
  return (
    <div className="bg-black text-green-400 p-4 text-sm rounded-md font-mono overflow-auto h-64">
      <pre>{logs}</pre>
    </div>
  );
};

export default LogViewer;
