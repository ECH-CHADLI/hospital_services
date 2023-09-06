import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { createContext, useContext, useState, useEffect } from "react";

/* context provides a way to share data between components without passing them manually at every level */
const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState();
    const signUpContext = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInContext = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password); 
    }

    const logOutContext = () => {
        return signOut(auth);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []) //Since the useEffect hook has an empty dependency array ([]), it will only run once when the component mounts. This ensures that the listener is set up only once during the component's lifecycle.
  

    return(
        <UserContext.Provider value={{ signUpContext, logInContext, logOutContext, user }}>
            {children}
        </UserContext.Provider>
    )
}

/* costume hook */
export const UserAuth = () => {
    return useContext(UserContext);    
}