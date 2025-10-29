"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";
// import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load saved token & user from localStorage (client-side only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            }
            setIsLoading(false);
        }
    }, []);

    // LOGIN function
    const login = async (email, password) => {
        try {
            const data = await apiService.login(email, password);

            if (data?.token) {
                setToken(data.token);
                setUser({
                    email: data.user.email,
                    role: data.user.role,
                    sub_role: data.user.sub_role,
                });

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // toast.success("Login successful");
                router.push("/dashboard");
            } else {
                toast.error("Invalid login response");
            }

            return data;
        } catch (error) {
            toast.error("Login failed");
            console.error("Login error:", error);
        }
    };

    // LOGOUT function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        router.push("/login");
        // toast.success("Logged out successfully");
    };

    // Context value (only provide once token & user are loaded)
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
    };

    // Wait until loading finishes before rendering children
    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
