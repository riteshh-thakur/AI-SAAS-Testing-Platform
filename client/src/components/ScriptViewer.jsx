// client/src/components/ScriptViewer.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const ScriptViewer = ({ code }) => {
  return (
    <div className="border rounded-md overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700">Generated Script</div>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default ScriptViewer;
