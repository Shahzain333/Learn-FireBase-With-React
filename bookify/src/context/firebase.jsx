import { createContext, use, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
//Authentication from user import
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged 
} from 'firebase/auth'

// Import From Firebase FireStoe
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, Query, where } from 'firebase/firestore'
// Import From Firebase Storage
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const FirebaseContext = createContext(null)

//console.log(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Instance of Authentication
const firebaseAuth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service & Instanc of firestore
const firestore = getFirestore(firebaseApp);

// Initialize Storage & Instanc of Storage
const storage = getStorage(firebaseApp);

// Instance of Google Authentication Provider
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

  // Track the User make State and useEffect And onAUthStateChanged check the current user
  const [user,setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      
      //console.log("User", user)
      if(user){
        return setUser(user)
      }else {
        return setUser(null)
      }

    })

  }, [])
  
  // Function For Signup
  const signupUserWithEmailAndPassword = (email,password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email,password)
  } 
  
  // Function for sigIn
  const signinUserWithEmailAndPassword = (email,password) => {
    return signInWithEmailAndPassword(firebaseAuth,email, password)
  }

  // Function For SignIn With Google
  const signinWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider)
  }

  const isLoggedIn = user ? true : false

  //console.log("User :", user)

  // Funtion for Listing Books
  const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
    
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`)
    const uploadResult = await uploadBytes(imageRef, coverPic)
    
    return await addDoc(collection(firestore, 'books'), {
      name: name,
      isbnNumber: isbnNumber,
      price: price,
      imageUrl: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      userProfilePic: user.photoURL
    })
  }

  // function for List All Books
  const getListAllBooks = async () => {
    return await getDocs(collection(firestore, 'books'))
  }

  // Function to get Image URL from Storage
  const getImageUrl = async (imagePath) => {
    //const imageRef = ref(storage, imagePath)
    return await getDownloadURL(ref(storage, imagePath))
  }

  // function for Get Books By Id
  const getBooksById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  }

  // function for Buy Books
  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(firestore, 'books', bookId, "orders");
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    })
    return result;
  }

  // Function For MyFetchOrders
  const fetchMyBooks = async (userID) => {
    
    //if(!user) return null;

    const collectionRef = collection(firestore, 'books');
    const query = Query(collectionRef, where("userId", "==", userID));
    const result = await getDocs(query);
    //console.log("My Orders:", result);
    return result;

  }

  // Function for get orders
  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, 'books', bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
  }

  return (
    <FirebaseContext.Provider 
      value={{ 
        signupUserWithEmailAndPassword, 
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        getListAllBooks, 
        getImageUrl,
        getBooksById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
      }}>
        
        {props.children}

    </FirebaseContext.Provider>
  )
}