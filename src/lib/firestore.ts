import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Library, FirestoreUser } from "./type";

// ✅ Save a library to Firestore
export const saveLibrary = async (library: Library): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "libraries"), library);
    return docRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding library:", error.message);
    } else {
      console.error("Unknown error adding library");
    }
    throw error;
  }
};

// ✅ Save a user to Firestore by UID
export const registerUser = async (user: FirestoreUser): Promise<string> => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin || false,
      createdAt: new Date(),
    });
    return user.uid;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
    } else {
      console.error("Unknown error registering user");
    }
    throw error;
  }
};

// ✅ Get all libraries
export const fetchLibraries = async (): Promise<Library[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "libraries"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Library));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching libraries:", error.message);
    } else {
      console.error("Unknown error fetching libraries");
    }
    throw error;
  }
};

// ✅ Get user by UID (for profile)
export const getUserByUID = async (uid: string): Promise<FirestoreUser | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as FirestoreUser : null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
    } else {
      console.error("Unknown error fetching user");
    }
    throw error;
  }
};

// ✅ Update user info
export const updateUser = async (uid: string, updates: Partial<FirestoreUser>): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updates);
    console.log("User updated successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
    } else {
      console.error("Unknown error updating user");
    }
    throw error;
  }
};
