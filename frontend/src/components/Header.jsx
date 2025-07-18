import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">cybri-vault</h1>
        <nav>
          <span className="text-sm">AI Cybersecurity Scanner</span>
        </nav>
      </div>
    </header>
  );
}
