// lib/type.ts

export interface Library {
    id?: string; // Add this if you use it with Firestore .map(doc => ({ id: doc.id, ...doc.data() }))
    name: string;
    description: string;
    category: string;
    version: string;
    tags: string[];
    license: string;
    officialUrl: string;
    addedBy: string;
    createdAt: Date;
    isFeatured: boolean;
  }
  
  export interface FirestoreUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin?: boolean;
    createdAt?: Date;
  }
  