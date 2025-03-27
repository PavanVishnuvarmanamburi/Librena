
// lib/firestore.ts
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Save a library to Firestore
export const saveLibrary = async (library: any) => {
  try {
    const docRef = await addDoc(collection(db, "libraries"), library);
    return docRef.id;
  } catch (error) {
    console.error("Error adding library: ", error);
    throw error;
  }
};

// Save a user to Firestore
export const registerUser = async (user: any) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef.id;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
};

// Get all libraries
export const fetchLibraries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "libraries"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching libraries: ", error);
    throw error;
  }
};
