import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser && currentUser.email) {
                fetch('https://car-doctor-server-three-sandy.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: currentUser.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('token', data.token)
                    })
            }
            else {
                localStorage.removeItem('token')
            }

            console.log('current user', currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        facebookLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;