// "use client";

// import { useState } from "react";
// import {
//     LayoutGrid,
//     Clock,
//     Images,
//     LogOut,
//     Plus,
//     ChevronDown,
//     ChevronRight,
//     LayoutDashboard,
// } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";

// export function Sidebar({ collapsed, hovered, setHovered }) {
//     const router = useRouter();
//     const pathname = usePathname();

//     const [openMenu, setOpenMenu] = useState(null);
//     // const [collapsed, setCollapsed] = useState(true); // default collapsed
//     // const [hovered, setHovered] = useState(false);   // hover temporary expand

//     const toggleMenu = (menu) => {
//         setOpenMenu(openMenu === menu ? null : menu);
//     };
//     const handlecreate = () => {
//         router.push("/dashboard/projects/create")
//     }

//     const isActive = (path) => pathname === path;

//     // Sidebar width: collapsed or expanded
//     const sidebarWidth = collapsed && !hovered ? "w-20" : "w-64";

//     return (
//         <aside
//             className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white via-white to-purple-50/30 border-r border-[#e6e6e6] shadow-xl flex flex-col justify-between transition-all duration-300 z-40 ${sidebarWidth}`}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             {/* Header */}
//             <div className="p-6 border-b border-purple-100 flex items-center justify-between backdrop-blur-sm">
//                 <div className="flex items-center gap-3">
//                     {/* Logo always visible - enhanced with gradient */}
//                     <div className="relative w-10 h-10 bg-gradient-to-br from-[#7753ff] via-[#a855f7] to-[#ec4899] rounded-xl flex items-center justify-center shadow-lg glow-effect transform transition-transform duration-300 hover:scale-110">
//                         <span className="text-white text-sm font-bold">S</span>
//                         <div className="absolute -inset-1 bg-gradient-to-br from-[#7753ff] to-[#ec4899] rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
//                     </div>

//                     {/* Only show text when expanded */}
//                     {(!collapsed || hovered) && (
//                         <div className="fade-in">
//                             <p className="text-xl font-bold bg-gradient-to-r from-[#7753ff] to-[#ec4899] bg-clip-text text-transparent">Splash</p>
//                             <p className="text-xs text-[#737373] font-semibold tracking-wider">AI STUDIO</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//                 <NavItem
//                     icon={<LayoutDashboard size={20} />}
//                     label="Dashboard"
//                     path="/dashboard"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <DropdownItem
//                     icon={<LayoutGrid size={20} />}
//                     label="Projects"
//                     isOpen={openMenu === "projects"}
//                     onClick={() => toggleMenu("projects")}
//                     subItems={[
//                         { label: "All Projects", path: "/dashboard/projects" },
//                         { label: "Completed", path: "/dashboard/projects/completed" },
//                         { label: "On Progress", path: "/dashboard/projects/ongoing" },
//                     ]}
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <DropdownItem
//                     icon={<Images size={20} />}
//                     label="Images"
//                     isOpen={openMenu === "images"}
//                     onClick={() => toggleMenu("images")}
//                     subItems={[
//                         { label: "All Images", path: "/dashboard/images" },
//                         { label: "White Background", path: "/dashboard/images/white-bg" },
//                         { label: "Background Replace", path: "/dashboard/images/replace-bg" },
//                         { label: "AI Model", path: "/dashboard/images/ai-model" },
//                         { label: "Real Model", path: "/dashboard/images/real-model" },
//                         { label: "Campaign Shots", path: "/dashboard/images/campaign" },
//                     ]}
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <NavItem
//                     icon={<Clock size={20} />}
//                     label="Recent"
//                     path="/dashboard/recent"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <NavItem
//                     icon={<LogOut size={20} />}
//                     label="Logout"
//                     path="/logout"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />
//             </nav>

//             {/* New Project Button */}
//             {(!collapsed || hovered) && (
//                 <div className="p-4 border-t border-purple-100">
//                     <button
//                         onClick={handlecreate}
//                         className="w-full relative bg-gradient-to-r from-[#7753ff] via-[#a855f7] to-[#7753ff] hover:from-[#884cff] hover:via-[#b565f8] hover:to-[#884cff] text-white rounded-xl py-3.5 px-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 glow-effect group overflow-hidden"
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                         <Plus size={20} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
//                         <span className="relative z-10">New Project</span>
//                     </button>
//                 </div>
//             )}
//         </aside>
//     );
// }

// // NavItem
// function NavItem({ icon, label, path, router, isActive, expanded }) {
//     const active = isActive(path);
//     return (
//         <button
//             onClick={() => router.push(path)}
//             className={`w-full relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
//                 ? "bg-gradient-to-r from-[#f0e6ff] to-[#fce7f3] text-[#7753ff] shadow-md border-l-4 border-[#7753ff] scale-105"
//                 : "text-[#1a1a1a] hover:bg-gradient-to-r hover:from-[#f9f5ff] hover:to-[#fef3f9] hover:scale-102 hover:shadow-sm"
//                 }`}
//             title={!expanded ? label : ""}
//         >
//             <span className={`transition-all duration-300 ${active ? "text-[#7753ff] scale-110" : "text-[#737373] group-hover:text-[#7753ff] group-hover:scale-110"}`}>
//                 {icon}
//             </span>
//             {expanded && (
//                 <span className={`text-sm font-semibold transition-all duration-300 ${active ? "text-[#7753ff]" : "text-[#1a1a1a]"}`}>
//                     {label}
//                 </span>
//             )}
//             {active && <div className="absolute right-2 w-2 h-2 rounded-full bg-[#7753ff] animate-pulse"></div>}
//         </button>
//     );
// }

// // DropdownItem
// function DropdownItem({ icon, label, subItems, isOpen, onClick, router, isActive, expanded }) {
//     return (
//         <div>
//             <button
//                 onClick={onClick}
//                 className={`w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${isOpen
//                         ? "bg-gradient-to-r from-[#f0e6ff] to-[#fce7f3] text-[#7753ff] shadow-md scale-105"
//                         : "text-[#1a1a1a] hover:bg-gradient-to-r hover:from-[#f9f5ff] hover:to-[#fef3f9] hover:scale-102"
//                     }`}
//                 title={!expanded ? label : ""}
//             >
//                 <div className="flex items-center gap-3">
//                     <span className={`transition-all duration-300 ${isOpen ? "text-[#7753ff] scale-110" : "text-[#737373] group-hover:text-[#7753ff] group-hover:scale-110"}`}>
//                         {icon}
//                     </span>
//                     {expanded && <span className={`text-sm font-semibold ${isOpen ? "text-[#7753ff]" : ""}`}>{label}</span>}
//                 </div>
//                 {expanded &&
//                     (isOpen ? (
//                         <ChevronDown size={18} className="text-[#7753ff] transition-transform duration-300 rotate-0" />
//                     ) : (
//                         <ChevronRight size={18} className="text-[#737373] group-hover:text-[#7753ff] transition-all duration-300" />
//                     ))}
//             </button>

//             {expanded && (
//                 <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
//                     <div className="pl-12 pr-4 mt-1 space-y-1">
//                         {subItems.map((item, idx) => {
//                             const active = isActive(item.path);
//                             return (
//                                 <button
//                                     key={item.path}
//                                     onClick={() => router.push(item.path)}
//                                     style={{ animationDelay: `${idx * 50}ms` }}
//                                     className={`w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-300 ${active
//                                             ? "text-[#7753ff] bg-gradient-to-r from-[#f5f0ff] to-[#fef5fa] font-semibold border-l-4 border-[#7753ff] shadow-sm scale-105"
//                                             : "text-[#555] hover:text-[#7753ff] hover:bg-[#faf8ff] hover:translate-x-1 hover:font-medium"
//                                         }`}
//                                 >
//                                     {item.label}
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



"use client";

import { useState } from "react";
import {
    LayoutGrid,
    Clock,
    Images,
    LogOut,
    Plus,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Sparkles,
    Cube,
    Camera,
    Palette,
    Users,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export function Sidebar({ collapsed, hovered, setHovered }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handlecreate = () => {
        router.push("/dashboard/projects/create")
    }

    const isActive = (path) => pathname === path;

    // Sidebar width: collapsed or expanded
    const sidebarWidth = collapsed && !hovered ? "w-20" : "w-64";

    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white to-gray-50/80 border-r border-gray-200 shadow-2xl flex flex-col justify-between transition-all duration-500 z-40 backdrop-blur-sm ${sidebarWidth}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Enhanced Header */}
            <div className="p-6 border-b border-gray-200/60 flex items-center justify-between bg-white/80 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                    {/* Enhanced Logo with glow effect */}
                    <div className="relative group">
                        <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <Sparkles className="w-6 h-6 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Only show text when expanded */}
                    {(!collapsed || hovered) && (
                        <div className="space-y-1 animate-fade-in">
                            <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                                SplashAI
                            </p>
                            <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Creative Studio</p>
                        </div>
                    )}
                </div>
            </div>
            {/* User Section with Avatar */}
            <div className="p-6 border-b border-gray-200/60 flex items-center bg-white/80 backdrop-blur-lg transition-all duration-500">
                <div className="flex items-center gap-3 w-full">
                    {/* Avatar */}
                    <div
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold text-lg shadow-md flex-shrink-0"
                        title={user?.username || "User"}
                    >
                        {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>

                    {/* Username text only when expanded */}
                    {(!collapsed || hovered) && (
                        <div className="overflow-hidden animate-fade-in">
                            <p className="text-sm text-gray-600 font-semibold tracking-wider uppercase">
                                Welcome, {user.username}
                            </p>
                        </div>
                    )}
                </div>
            </div>


            {/* Enhanced Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                <NavItem
                    icon={<LayoutDashboard size={22} />}
                    label="Dashboard"
                    path="/dashboard"
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />

                <DropdownItem
                    icon={<LayoutGrid size={22} />}
                    label="Projects"
                    isOpen={openMenu === "projects"}
                    onClick={() => toggleMenu("projects")}
                    subItems={[
                        { label: "All Projects", path: "/dashboard/projects" },
                        { label: "Completed", path: "/dashboard/projects/completed" },
                        { label: "In Progress", path: "/dashboard/projects/ongoing" },
                        { label: "Recent", path: "/dashboard/projects/recent" },
                    ]}
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />

                <DropdownItem
                    icon={<Images size={22} />}
                    label="AI Studio"
                    isOpen={openMenu === "images"}
                    onClick={() => toggleMenu("images")}
                    subItems={[
                        { label: "All Images", path: "/dashboard/images" },
                        { label: "White Background", path: "/dashboard/images/white-bg" },
                        { label: "Background Replace", path: "/dashboard/images/replace-bg" },
                        { label: "AI 3D Model", path: "/dashboard/images/ai-model" },
                        { label: "Real Model", path: "/dashboard/images/real-model" },
                        { label: "Campaign Shots", path: "/dashboard/images/campaign" },

                        { label: "History", path: "/dashboard/images/gallery" },

                    ]}
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />

                <NavItem
                    icon={<Clock size={22} />}
                    label="Recent"
                    path="/dashboard/recent"
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />



                <NavItem
                    icon={<Palette size={22} />}
                    label="Templates"
                    path="/dashboard/templates"
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />
            </nav>

            {/* Enhanced New Project Button */}
            {(!collapsed || hovered) ? (
                <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-lg">
                    <button
                        onClick={handlecreate}
                        className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl py-4 px-6 font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Plus size={22} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
                        <span className="relative z-10 text-lg">New Project</span>
                    </button>
                </div>
            ) : (
                <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-lg">
                    <button
                        onClick={handlecreate}
                        className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-4 font-bold flex items-center justify-center transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-110 transform group"
                        title="New Project"
                    >
                        <Plus size={22} className="transition-transform duration-500 group-hover:rotate-90" />
                    </button>
                </div>
            )}

            {/* Enhanced Logout Section */}
            <div className="p-4 border-t border-gray-200/60 bg-white/80 backdrop-blur-lg">
                <NavItem
                    icon={<LogOut size={22} />}
                    label="Logout"
                    path="/login"
                    router={router}
                    isActive={isActive}
                    expanded={!collapsed || hovered}
                />
            </div>
        </aside>
    );
}

// Enhanced NavItem Component
function NavItem({ icon, label, path, router, isActive, expanded }) {
    const active = isActive(path);
    const { logout } = useAuth();
    return (
        <button
            onClick={() => {
                if (path === "/login") {
                    logout();
                }
                router.push(path);
            }}
            className={`w-full relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group overflow-hidden ${active
                ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 shadow-lg border-l-4 border-purple-500 scale-[1.02]"
                : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-500/5 hover:to-blue-500/5 hover:text-purple-600 hover:scale-[1.02] hover:shadow-md"
                }`}
            title={!expanded ? label : ""}
        >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${active ? "opacity-100" : ""
                }`}></div>

            <span className={`relative z-10 transition-all duration-500 ${active ? "text-purple-600 scale-110" : "text-gray-500 group-hover:text-purple-600 group-hover:scale-110"
                }`}>
                {icon}
            </span>
            {expanded && (
                <span className={`relative z-10 text-sm font-semibold transition-all duration-500 ${active ? "text-purple-600" : "text-gray-700 group-hover:text-purple-600"
                    }`}>
                    {label}
                </span>
            )}
            {active && (
                <div className="absolute right-3 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse shadow-lg"></div>
            )}
        </button>
    );
}

// Enhanced DropdownItem Component
function DropdownItem({ icon, label, subItems, isOpen, onClick, router, isActive, expanded }) {
    const hasActiveSubItem = subItems.some(item => isActive(item.path));

    return (
        <div className="space-y-1">
            <button
                onClick={onClick}
                className={`w-full relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-500 group overflow-hidden ${isOpen || hasActiveSubItem
                    ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 shadow-lg scale-[1.02]"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-500/5 hover:to-blue-500/5 hover:text-purple-600 hover:scale-[1.02] hover:shadow-md"
                    }`}
                title={!expanded ? label : ""}
            >
                <div className="flex items-center gap-4">
                    <span className={`relative z-10 transition-all duration-500 ${isOpen || hasActiveSubItem ? "text-purple-600 scale-110" : "text-gray-500 group-hover:text-purple-600 group-hover:scale-110"
                        }`}>
                        {icon}
                    </span>
                    {expanded && (
                        <span className={`relative z-10 text-sm font-semibold ${isOpen || hasActiveSubItem ? "text-purple-600" : "text-gray-700 group-hover:text-purple-600"
                            }`}>
                            {label}
                        </span>
                    )}
                </div>
                {expanded &&
                    (isOpen ? (
                        <ChevronDown size={18} className="text-purple-600 transition-transform duration-500 rotate-0 relative z-10" />
                    ) : (
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-all duration-500 relative z-10" />
                    ))}
            </button>

            {expanded && (
                <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                    <div className="pl-12 pr-4 mt-2 space-y-1">
                        {subItems.map((item, idx) => {
                            const active = isActive(item.path);
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => router.push(item.path)}
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                    className={`w-full text-left text-sm py-3 px-4 rounded-xl transition-all duration-500 transform ${active
                                        ? "text-purple-600 bg-gradient-to-r from-purple-500/10 to-blue-500/10 font-bold border-l-4 border-purple-500 shadow-md scale-[1.02]"
                                        : "text-gray-500 hover:text-purple-600 hover:bg-gray-500/5 hover:translate-x-2 hover:font-semibold"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
