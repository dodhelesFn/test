
import React from 'react';

const FirestoreNotEnabled: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-yellow-500/50">
        <div className="text-center">
           <svg className="w-16 h-16 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12,1.75C6.34,1.75,1.75,6.34,1.75,12S6.34,22.25,12,22.25,22.25,17.66,22.25,12,17.66,1.75,12,1.75Zm-.88,6h1.75v5.25h-1.75V7.75Zm.88,10.5c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Z" />
           </svg>
          <h1 className="text-3xl font-bold text-yellow-300 mt-4">Could not connect to database</h1>
          <p className="text-gray-400 mt-2">
            The app is configured correctly, but it couldn't reach the Firestore database.
          </p>
           <p className="text-gray-400 mt-1 font-semibold">
            The most likely reason is that the database has not been created yet.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-lg font-semibold text-gray-200">Here's how to fix it:</p>
          <ol className="list-decimal list-inside mt-4 space-y-3 text-gray-300 bg-gray-900/50 p-4 rounded-lg">
            <li>
              Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-semibold hover:underline">Firebase Console</a> and select your project (<code className="bg-gray-700 text-indigo-300 px-2 py-1 rounded-md text-sm">testing-37378</code>).
            </li>
            <li>
              In the left-hand menu, click <strong className="text-white">Build</strong> &gt; <strong className="text-white">Firestore Database</strong>.
            </li>
            <li>
              Click the <strong className="text-white">"Create database"</strong> button.
            </li>
             <li>
              Choose <strong className="text-yellow-300">"Start in test mode"</strong> when prompted. This is important for development.
            </li>
            <li>
              Select a server location and click <strong className="text-white">"Enable"</strong>.
            </li>
             <li className="pt-2 border-t border-gray-700">
              Once the database is ready, come back here and <strong className="text-white">refresh this page</strong>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FirestoreNotEnabled;
