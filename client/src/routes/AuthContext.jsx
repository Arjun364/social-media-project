// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken,setUserToken] = useState(null)
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
            }
        }
        setLoading(false); // done loading after checking sessionStorage
    }, []);

    useEffect(() => {
        console.log(`Current user: ${JSON.stringify(user)}`);
    }, [user]); // Logs whenever `user` changes

    const login = (userData,userToken) => {
        setUser(userData);
        setUserToken(userToken)
        sessionStorage.setItem('user', JSON.stringify(userData));
        // cookie generation of user token 
        document.cookie = `userToken=${userToken}; path=/; max-age=${60 * 60 * 24}; Secure; SameSite=Strict`;
    };

    const logout = () => {
        setTimeout(()=>
            {sessionStorage.removeItem('user')
                setUser(null);
                window.location.reload()
            },400)
    };

    return (
        <AuthContext.Provider value={{ user, login, logout ,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
