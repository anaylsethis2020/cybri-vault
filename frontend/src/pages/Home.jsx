import React, { useState } from 'react';
import Header from '../components/Header';
import ResultsCard from '../components/ResultsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeDomain } from '../api/analyze';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await analyzeDomain(input);
      setResults(res);
    } catch (err) {
      setError('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <section className="w-full max-w-xl text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Scan a Domain or IP Address</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className="border rounded px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter domain or IP (e.g. example.com)"
              value={input}
              onChange={e => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              Scan Now
            </button>
          </form>
        </section>
        {loading && <LoadingSpinner />}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <section className="w-full flex flex-col gap-4 items-center">
          <ResultsCard title="Threat Report from VirusTotal">
            {results ? (
              <>
                <div className="font-bold text-red-600">{results.virusTotal.verdict}</div>
                <div className="text-gray-700">{results.virusTotal.details}</div>
              </>
            ) : (
              <div className="text-gray-400">No data yet. Submit a domain or IP to scan.</div>
            )}
          </ResultsCard>
          <ResultsCard title="AI Risk Summary">
            {results ? (
              <div className="text-gray-700">{results.aiSummary.summary}</div>
            ) : (
              <div className="text-gray-400">No summary yet. Submit a domain or IP to scan.</div>
            )}
          </ResultsCard>
        </section>
      </main>
    </div>
  );
}
