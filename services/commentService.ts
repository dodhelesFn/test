import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { COMMENTS_COLLECTION } from '../constants';
import { Comment } from '../types';

const checkDb = () => {
    if (!db) {
        const errorMsg = "Firebase is not initialized. Please check your configuration in services/firebase.ts.";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
};


export const addComment = async (data: { name: string; text: string }) => {
  checkDb();
  try {
    const commentData = {
      ...data,
      timestamp: serverTimestamp(),
    };
    const commentsCollection = collection(db!, COMMENTS_COLLECTION);
    await addDoc(commentsCollection, commentData);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error('Failed to add comment.');
  }
};

export const onCommentsSnapshot = (
  onUpdate: (comments: Comment[]) => void, 
  onError: (error: Error) => void
): (() => void) => {
  checkDb();
  const commentsCollection = collection(db!, COMMENTS_COLLECTION);
  const q = query(commentsCollection, orderBy('timestamp', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() } as Comment);
    });
    onUpdate(comments);
  }, (error) => {
    console.error("Error fetching comments: ", error);
    onError(error);
  });

  return unsubscribe;
};
