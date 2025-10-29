"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Compute sidebar width dynamically
    const sidebarWidth = isMobile ? 0 : collapsed && !hovered ? 80 : 256; // px

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20">
            <Sidebar
                collapsed={collapsed}
                hovered={hovered}
                setHovered={setHovered}
                setCollapsed={setCollapsed}
                isMobile={isMobile}
            />

            <main
                className="flex-1 overflow-y-auto p-8 transition-all duration-300" // transition for smooth margin change
                style={{
                    marginLeft: `${sidebarWidth}px`,
                }}

            >
                <AuthProvider>  {children} </AuthProvider>
            </main>
        </div>
    );
}
