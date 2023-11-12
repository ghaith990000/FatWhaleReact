import { createContext, useContext, useState, useEffect} from 'react';
import { auth } from './firebase';
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe= onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            console.log("State is changing");
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredentials.user);
            console.log("Coming from the state", user);
        }catch (error){
            console.error('Login failed', error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        }catch(error){
            console.error('Logout failed', error.message);
        }
    };

    const value = {
        user, login, logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>

};

export const useAuth = () => {
    return useContext(AuthContext);
}