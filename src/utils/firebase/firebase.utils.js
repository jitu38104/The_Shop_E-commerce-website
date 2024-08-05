import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    writeBatch,
    collection,
    getFirestore,
    doc, getDoc, setDoc,
    query, getDocs
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBfJSa-BcjGMBnBj_UOEzRdK3On8cAEhpQ",
    authDomain: "e-commerce-shop-b6da2.firebaseapp.com",
    projectId: "e-commerce-shop-b6da2",
    storageBucket: "e-commerce-shop-b6da2.appspot.com",
    messagingSenderId: "224576714576",
    appId: "1:224576714576:web:143420f56b4b17897bde55"
};

const firebaseApp = initializeApp(firebaseConfig); //initializing firebase with config

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, collectionObj) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    collectionObj.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("DONE!");
}

export const getCollectionAndDocuments = async() => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    
    const snapshot = await getDocs(q);
    const categoryMap = snapshot.docs.reduce((acc, docSnap) => {
        const {title, items} = docSnap.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    
    return categoryMap;
} 


export const getDirectoryCollectionDoc = async() => {
    const collectionRef = collection(db, "directories");
    const q = query(collectionRef);

    const snapshot = await getDocs(q);
    const directoryMap = snapshot.docs.reduce((acc, docSnap) => {
        const {title} = docSnap.data();
        acc[title.toLowerCase()] = docSnap.data();
        return acc;
    }, {});
    
    return directoryMap;
}

export const createUserDocFromAuth = async(userAuth, dataInCaseOfEmailAndPassAuth={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...dataInCaseOfEmailAndPassAuth});
        } catch (error) {
            console.log("Error occured from Firebase",error.message);
        }
    }

    return userDocRef;
}

export const createUserAuthWithEmailAndPassword = async(email, passowrd) => {
    if(!email || !passowrd) return;

    return createUserWithEmailAndPassword(auth, email, passowrd);
}

export const logInWithEmailAndPassword = async(email, passowrd) => {
    if(!email || !passowrd) return;

    return signInWithEmailAndPassword(auth, email, passowrd);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callbackFunc) => {
    return onAuthStateChanged(auth, callbackFunc);
}
