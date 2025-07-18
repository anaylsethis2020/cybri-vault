import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results) {
    return (
      <div className="text-gray-400 text-center py-8">No results yet. Submit a domain or IP to scan.</div>
    );
  }

  const { aiSummary, virusTotal } = results;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-cyan-700">Threat Report from VirusTotal</h2>
        <div className="mb-2">
          <span className="font-bold text-red-600">{virusTotal?.verdict || 'Unknown'}</span>
        </div>
        <div className="text-gray-700 mb-2">{virusTotal?.details || 'No details available.'}</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-cyan-700">AI Risk Summary</h2>
        <div className="text-gray-700 mb-2">{aiSummary?.summary || 'No summary available.'}</div>
      </div>
      <details className="bg-gray-100 rounded p-4 text-xs text-gray-600">
        <summary className="cursor-pointer font-semibold mb-2">Raw JSON</summary>
        <pre className="whitespace-pre-wrap break-words mt-2">{JSON.stringify(results, null, 2)}</pre>
      </details>
    </div>
  );
};

export default ResultsDisplay;
