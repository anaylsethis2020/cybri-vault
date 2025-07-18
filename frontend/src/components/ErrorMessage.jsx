import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="max-w-2xl mx-auto bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 mt-4 rounded-md text-center">
    <span className="font-bold">Error:</span> {message}
  </div>
);

export default ErrorMessage;
