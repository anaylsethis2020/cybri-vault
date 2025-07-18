import React, { useState } from 'react';

const ScanForm = ({ onScan, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onScan(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xl mx-auto mb-6">
      <input
        type="text"
        className="border rounded px-4 py-2 text-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Enter domain or IP (e.g. example.com)"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="bg-cyan-600 text-white py-2 px-6 rounded font-semibold hover:bg-cyan-700 transition w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan Now'}
      </button>
    </form>
  );
};

export default ScanForm;
