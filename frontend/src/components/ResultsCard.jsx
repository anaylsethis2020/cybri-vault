import React from 'react';

export default function ResultsCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
