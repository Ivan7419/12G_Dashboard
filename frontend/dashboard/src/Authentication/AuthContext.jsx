import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("site") || "")
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Monitor token and set authentication state
    useEffect(() => {
        setIsAuthenticated(!!token); // Update `isAuthenticated` when token changes
    }, [token]);

    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:5004/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            const res = await response.json();
            console.log(res);
            if (res) {
                if(res.token) {
                    setToken(res.token);
                    localStorage.setItem("site", res.token);
                    setIsAuthenticated(true);
                    navigate("/dashboard");
                }
                if (res.requires2FA) {
                    return { requires2FA: true, deviceId: data.deviceId };
                }
                console.log("Login successful without 2FA");
                return { requires2FA: false };
            }
        } catch (err) {
            console.error("Error:", err.message);
            setToken("");
            localStorage.removeItem("site");
            setIsAuthenticated(false);
            console.log("->"+isAuthenticated);
            return;
        }
    };

    const signupAction = async (data) => {
        try {
            const response = await fetch("http://localhost:5004/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Неверный код авторизации");
            }
            const res = await response.json();
            if (res) {
                if(res.token) {
                    setToken(res.token);
                    localStorage.setItem("site", res.token);
                    setIsAuthenticated(true);
                    navigate("/dashboard");
                }
                if (res.requires2FA) {
                    return { requires2FA: true, deviceId: data.deviceId };
                }
                console.log("Login successful without 2FA");
                return { requires2FA: false };
            }
        } catch (err) {
            console.error("Error:", err.message);
            setToken("");
            localStorage.removeItem("site");
            setIsAuthenticated(false);
            console.log("->"+isAuthenticated);
            return;
        }
    };

    const verify2FA = async (verificationCode, email, deviceId) => {
        try {
            const response = await fetch("http://localhost:5004/api/auth/verify-2fa-code?deviceId=" + deviceId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, verificationCode }),
            });

            if (!response.ok) {
                throw new Error("Invalid or expired 2FA code");
            }

            const res = await response.json();
            console.log("2FA verification successful:", res);

            // Proceed to the main application/dashboard after 2FA
            console.log("2FA complete, navigating to the dashboard...");
            setToken(res.token);
            localStorage.setItem("site", res.token);
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (err) {
            console.error("2FA Error:", err.message);
        }
    };

    const handle2FA = async (email, token) => {
        try {
            const response = await fetch("http://localhost:5004/api/Auth/send-2fa-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });
            if (!response.ok) {
                throw new Error("There was an error while sending 2FA code");
            }
            console.log("2FA code sent successfully");
        } catch (err) {
            console.error("2FA Error:", err.message);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{signupAction, isAuthenticated, token, user, loginAction, handle2FA, verify2FA, logOut}}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};