
import React, { useState, useEffect } from 'react';
import { onCommentsSnapshot, addComment } from './services/commentService';
import { isFirebaseConfigured } from './services/firebase';
import { Comment } from './types';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import Spinner from './components/Spinner';
import FirebaseNotConfigured from './components/FirebaseNotConfigured';
import FirestoreNotEnabled from './components/FirestoreNotEnabled'; // Import the new component

const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);
  const [showDbErrorScreen, setShowDbErrorScreen] = useState(false); // New state for specific error

  useEffect(() => {
    // First, check if the Firebase config file has been populated
    if (!isFirebaseConfigured()) {
      setIsConfigured(false);
      setIsLoading(false);
      return;
    }
    
    setIsConfigured(true);

    let unsubscribe: () => void;
    try {
      unsubscribe = onCommentsSnapshot(
        (newComments) => {
          setComments(newComments);
          setIsLoading(false);
          setError(null);
          setShowDbErrorScreen(false); // Reset on success
        },
        (err) => {
          console.error(err);
          // Check for the specific "unavailable" error code
          if ((err as { code?: string }).code === 'unavailable') {
            setShowDbErrorScreen(true);
          } else {
            // Handle other potential errors
            setError('An unexpected error occurred. Please check the console for details.');
          }
          setIsLoading(false);
        }
      );
    } catch (err) {
      // This will catch the synchronous error from commentService if db is null
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during initialization.');
      }
      setIsLoading(false);
    }
    
    // Cleanup subscription on unmount
    return () => {
        if (unsubscribe) {
            unsubscribe();
        }
    };
  }, []);

  const handleAddComment = async (name: string, text: string) => {
    if (!name.trim() || !text.trim()) {
      return;
    }
    try {
      await addComment({ name, text });
    } catch (err) {
        console.error("Error adding comment: ", err);
        setError("Failed to post comment. Please try again.");
    }
  };

  // Render a specific guide if Firebase is not configured
  if (!isConfigured) {
    return <FirebaseNotConfigured />;
  }
  
  // Render a specific guide if Firestore is not enabled
  if (showDbErrorScreen) {
    return <FirestoreNotEnabled />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Real-Time Comment Wall
          </h1>
          <p className="text-gray-400 mt-2">Powered by React & Firebase</p>
        </header>

        <main>
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Leave a Comment</h2>
            <CommentForm onSubmit={handleAddComment} />
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">Comments ({comments.length})</h2>
            {isLoading && <Spinner />}
            {error && <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
            {!isLoading && !error && <CommentList comments={comments} />}
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Anonymous Comment Wall. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
