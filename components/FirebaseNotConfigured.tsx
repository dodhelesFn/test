import React from 'react';

const FirebaseNotConfigured: React.FC = () => {
  const codeSnippet = `
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};`;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-500/50">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-red-400 mt-4">Action Required: Configure Firebase</h1>
          <p className="text-gray-400 mt-2">
            This application cannot connect to the database because it has not been configured yet.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-lg font-semibold text-gray-200">How to fix this:</p>
          <ol className="list-decimal list-inside mt-2 space-y-2 text-gray-300">
            <li>
              Open the file: <code className="bg-gray-700 text-indigo-300 px-2 py-1 rounded-md text-sm">services/firebase.ts</code>
            </li>
            <li>
              Find the <code className="bg-gray-700 text-indigo-300 px-2 py-1 rounded-md text-sm">firebaseConfig</code> object.
            </li>
            <li>
              Replace the placeholder values (e.g., <code className="bg-gray-700 text-gray-400 px-1 rounded text-xs">"YOUR_API_KEY"</code>) with your actual Firebase project credentials.
            </li>
          </ol>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-400 mb-2">The code in that file should look like this:</p>
          <pre className="bg-gray-900 rounded-md p-4 text-sm overflow-x-auto">
            <code className="text-yellow-300">{codeSnippet.trim()}</code>
          </pre>
        </div>
         <p className="text-center text-xs text-gray-500 mt-8">
            You can get your Firebase configuration from your project's settings in the{' '}
            <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              Firebase Console
            </a>.
          </p>
      </div>
    </div>
  );
};

export default FirebaseNotConfigured;
