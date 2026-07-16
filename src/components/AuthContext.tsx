import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string, phone: string, age: number) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Try reading cached profile first for instant availability
        let cachedProfile: UserProfile | null = null;
        try {
          const stored = localStorage.getItem(`wecare_user_profile_${currentUser.uid}`);
          if (stored) {
            cachedProfile = JSON.parse(stored);
            setUserProfile(cachedProfile);
          }
        } catch (e) {
          console.warn("localStorage read failed:", e);
        }

        // Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const remoteProfile = userDocSnap.data() as UserProfile;
            setUserProfile(remoteProfile);
            try {
              localStorage.setItem(`wecare_user_profile_${currentUser.uid}`, JSON.stringify(remoteProfile));
            } catch (e) {}
          } else if (!cachedProfile) {
            // Profile document doesn't exist in Firestore
            const fallbackProfile = {
              id: currentUser.uid,
              name: currentUser.displayName || '',
              email: currentUser.email || '',
              phone: currentUser.phoneNumber || '',
              age: 0,
              createdAt: new Date().toISOString()
            };
            setUserProfile(fallbackProfile);
            try {
              localStorage.setItem(`wecare_user_profile_${currentUser.uid}`, JSON.stringify(fallbackProfile));
            } catch (e) {}
          }
        } catch (error) {
          console.error("Error reading user profile from Firestore:", error);
          if (!cachedProfile) {
            setUserProfile({
              id: currentUser.uid,
              name: currentUser.displayName || '',
              email: currentUser.email || '',
              phone: currentUser.phoneNumber || '',
              age: 0,
              createdAt: new Date().toISOString()
            });
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string, name: string, phone: string, age: number) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const newUser = userCredential.user;

    // Save user profile data to Firestore
    const userProfileData: UserProfile = {
      id: newUser.uid,
      name,
      email,
      phone,
      age,
      createdAt: new Date().toISOString()
    };

    // Cache locally first so we always succeed locally
    try {
      localStorage.setItem(`wecare_user_profile_${newUser.uid}`, JSON.stringify(userProfileData));
    } catch (e) {
      console.warn("localStorage write failed:", e);
    }

    const userDocRef = doc(db, 'users', newUser.uid);
    try {
      await setDoc(userDocRef, userProfileData);
    } catch (error) {
      console.error("Firestore setDoc failed, profile saved in local cache:", error);
    }

    setUserProfile(userProfileData);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
