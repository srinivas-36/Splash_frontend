
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
//     Sparkles,
//     Cube,
//     Camera,
//     Palette,
//     Users,
// } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// export function Sidebar({ collapsed, hovered, setHovered }) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { user } = useAuth();
//     const [openMenu, setOpenMenu] = useState(null);

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
//             className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white to-gray-50/80 border-r border-gray-200 shadow-2xl flex flex-col justify-between transition-all duration-500 z-40 backdrop-blur-sm ${sidebarWidth}`}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             {/* Enhanced Header */}
//             <div className="p-6 border-b border-gray-200/60 flex items-center justify-between bg-white/80 backdrop-blur-lg">
//                 <div className="flex items-center gap-3">
//                     {/* Enhanced Logo with glow effect */}
//                     <div className="relative group">
//                         <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
//                             <Sparkles className="w-6 h-6 text-white" />
//                             <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
//                         </div>
//                     </div>

//                     {/* Only show text when expanded */}
//                     {(!collapsed || hovered) && (
//                         <div className="space-y-1 animate-fade-in">
//                             <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
//                                 SplashAI
//                             </p>
//                             <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">Creative Studio</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             {/* User Section with Avatar */}
//             <div className="p-6 border-b border-gray-200/60 flex items-center bg-white/80 backdrop-blur-lg transition-all duration-500">
//                 <div className="flex items-center gap-3 w-full">
//                     {/* Avatar */}
//                     <div
//                         className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold text-lg shadow-md flex-shrink-0"
//                         title={user?.username || "User"}
//                     >
//                         {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
//                     </div>

//                     {/* Username text only when expanded */}
//                     {(!collapsed || hovered) && (
//                         <div className="overflow-hidden animate-fade-in">
//                             <p className="text-sm text-gray-600 font-semibold tracking-wider uppercase">
//                                 Welcome, {user.username}
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>


//             {/* Enhanced Navigation */}
//             <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
//                 <NavItem
//                     icon={<LayoutDashboard size={22} />}
//                     label="Dashboard"
//                     path="/dashboard"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <DropdownItem
//                     icon={<LayoutGrid size={22} />}
//                     label="Projects"
//                     isOpen={openMenu === "projects"}
//                     onClick={() => toggleMenu("projects")}
//                     subItems={[
//                         { label: "All Projects", path: "/dashboard/projects" },
//                         { label: "Completed", path: "/dashboard/projects/completed" },
//                         { label: "In Progress", path: "/dashboard/projects/ongoing" },
//                         { label: "Recent", path: "/dashboard/projects/recent" },
//                     ]}
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <DropdownItem
//                     icon={<Images size={22} />}
//                     label="AI Studio"
//                     isOpen={openMenu === "images"}
//                     onClick={() => toggleMenu("images")}
//                     subItems={[
//                         { label: "All Images", path: "/dashboard/images" },
//                         { label: "White Background", path: "/dashboard/images/white-bg" },
//                         { label: "Background Replace", path: "/dashboard/images/replace-bg" },
//                         { label: "AI 3D Model", path: "/dashboard/images/ai-model" },
//                         { label: "Real Model", path: "/dashboard/images/real-model" },
//                         { label: "Campaign Shots", path: "/dashboard/images/campaign" },

//                         { label: "History", path: "/dashboard/images/gallery" },

//                     ]}
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />

//                 <NavItem
//                     icon={<Clock size={22} />}
//                     label="Recent"
//                     path="/dashboard/recent"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />



//                 <NavItem
//                     icon={<Palette size={22} />}
//                     label="Templates"
//                     path="/dashboard/templates"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />
//             </nav>

//             {/* Enhanced New Project Button */}
//             {(!collapsed || hovered) ? (
//                 <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-lg">
//                     <button
//                         onClick={handlecreate}
//                         className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl py-4 px-6 font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform group overflow-hidden"
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                         <Plus size={22} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
//                         <span className="relative z-10 text-lg">New Project</span>
//                     </button>
//                 </div>
//             ) : (
//                 <div className="p-4 border-t border-gray-200/60 bg-white/50 backdrop-blur-lg">
//                     <button
//                         onClick={handlecreate}
//                         className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-4 font-bold flex items-center justify-center transition-all duration-500 shadow-2xl hover:shadow-3xl hover:scale-110 transform group"
//                         title="New Project"
//                     >
//                         <Plus size={22} className="transition-transform duration-500 group-hover:rotate-90" />
//                     </button>
//                 </div>
//             )}

//             {/* Enhanced Logout Section */}
//             <div className="p-4 border-t border-gray-200/60 bg-white/80 backdrop-blur-lg">
//                 <NavItem
//                     icon={<LogOut size={22} />}
//                     label="Logout"
//                     path="/login"
//                     router={router}
//                     isActive={isActive}
//                     expanded={!collapsed || hovered}
//                 />
//             </div>
//         </aside>
//     );
// }

// // Enhanced NavItem Component
// function NavItem({ icon, label, path, router, isActive, expanded }) {
//     const active = isActive(path);
//     const { logout } = useAuth();
//     return (
//         <button
//             onClick={() => {
//                 if (path === "/login") {
//                     logout();
//                 }
//                 router.push(path);
//             }}
//             className={`w-full relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group overflow-hidden ${active
//                 ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 shadow-lg border-l-4 border-purple-500 scale-[1.02]"
//                 : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-500/5 hover:to-blue-500/5 hover:text-purple-600 hover:scale-[1.02] hover:shadow-md"
//                 }`}
//             title={!expanded ? label : ""}
//         >
//             {/* Animated background */}
//             <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${active ? "opacity-100" : ""
//                 }`}></div>

//             <span className={`relative z-10 transition-all duration-500 ${active ? "text-purple-600 scale-110" : "text-gray-500 group-hover:text-purple-600 group-hover:scale-110"
//                 }`}>
//                 {icon}
//             </span>
//             {expanded && (
//                 <span className={`relative z-10 text-sm font-semibold transition-all duration-500 ${active ? "text-purple-600" : "text-gray-700 group-hover:text-purple-600"
//                     }`}>
//                     {label}
//                 </span>
//             )}
//             {active && (
//                 <div className="absolute right-3 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse shadow-lg"></div>
//             )}
//         </button>
//     );
// }

// // Enhanced DropdownItem Component
// function DropdownItem({ icon, label, subItems, isOpen, onClick, router, isActive, expanded }) {
//     const hasActiveSubItem = subItems.some(item => isActive(item.path));

//     return (
//         <div className="space-y-1">
//             <button
//                 onClick={onClick}
//                 className={`w-full relative flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-500 group overflow-hidden ${isOpen || hasActiveSubItem
//                     ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 shadow-lg scale-[1.02]"
//                     : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-500/5 hover:to-blue-500/5 hover:text-purple-600 hover:scale-[1.02] hover:shadow-md"
//                     }`}
//                 title={!expanded ? label : ""}
//             >
//                 <div className="flex items-center gap-4">
//                     <span className={`relative z-10 transition-all duration-500 ${isOpen || hasActiveSubItem ? "text-purple-600 scale-110" : "text-gray-500 group-hover:text-purple-600 group-hover:scale-110"
//                         }`}>
//                         {icon}
//                     </span>
//                     {expanded && (
//                         <span className={`relative z-10 text-sm font-semibold ${isOpen || hasActiveSubItem ? "text-purple-600" : "text-gray-700 group-hover:text-purple-600"
//                             }`}>
//                             {label}
//                         </span>
//                     )}
//                 </div>
//                 {expanded &&
//                     (isOpen ? (
//                         <ChevronDown size={18} className="text-purple-600 transition-transform duration-500 rotate-0 relative z-10" />
//                     ) : (
//                         <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-all duration-500 relative z-10" />
//                     ))}
//             </button>

//             {expanded && (
//                 <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                     }`}>
//                     <div className="pl-12 pr-4 mt-2 space-y-1">
//                         {subItems.map((item, idx) => {
//                             const active = isActive(item.path);
//                             return (
//                                 <button
//                                     key={item.path}
//                                     onClick={() => router.push(item.path)}
//                                     style={{ animationDelay: `${idx * 50}ms` }}
//                                     className={`w-full text-left text-sm py-3 px-4 rounded-xl transition-all duration-500 transform ${active
//                                         ? "text-purple-600 bg-gradient-to-r from-purple-500/10 to-blue-500/10 font-bold border-l-4 border-purple-500 shadow-md scale-[1.02]"
//                                         : "text-gray-500 hover:text-purple-600 hover:bg-gray-500/5 hover:translate-x-2 hover:font-semibold"
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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useImageGeneration } from "@/context/ImageGenerationContext";
import {
    LayoutDashboard,
    Image,
    FolderKanban,
    HelpCircle,
    User,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Palette,
    Users,
    Grid3x3,
    Images,
    MessageCircle,
    Bell,
    Settings,
    LogOut,
    BookOpen,
    FileQuestion,
    MessageSquare,
    CreditCard,
    Shield,
    FileText,
} from "lucide-react";

export function Sidebar({ collapsed, setCollapsed, hovered, setHovered }) {
    const [expandedItems, setExpandedItems] = useState(["Individual Generator"]);
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();
    const { isGenerating } = useImageGeneration();

    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },
        {
            label: "Individual Generator",
            icon: Image,
            path: "/dashboard/images",
            children: [
                { label: "Plain Image", icon: Palette, path: "/dashboard/images/white-bg" },
                { label: "Themed Image", icon: Sparkles, path: "/dashboard/images/replace-bg" },
                { label: "Model Images", icon: Users, path: "/dashboard/images/model-generation" },
                { label: "Campaign Images", icon: Grid3x3, path: "/dashboard/images/campaign" },
                { label: "My Images", icon: Images, path: "/dashboard/images/gallery" },
            ],
        },
        {
            label: "Projects",
            icon: FolderKanban,
            path: "/dashboard/projects",
        },
        {
            label: "Help & Learning",
            icon: HelpCircle,
            path: "/dashboard/help",
            children: [
                { label: "Feedback", icon: MessageSquare, path: "/dashboard/help/feedback" },
                { label: "Tutorials", icon: BookOpen, path: "/dashboard/help/tutorials" },
                { label: "Help Center", icon: FileQuestion, path: "/dashboard/help/help-center" },
            ],
        },
        {
            label: "My Account",
            icon: User,
            path: "/dashboard/account",
            children: [
                { label: "Profile", icon: User, path: "/dashboard/my-account/profile" },
                { label: "Subscription", icon: CreditCard, path: "/dashboard/my-account/billing" },
                { label: "Security", icon: Shield, path: "/dashboard/my-account/security" },
                { label: "Notifications", icon: Bell, path: "/dashboard/my-account/notification" },
                { label: "Prompt Master", icon: FileText, path: "/dashboard/my-account/prompt-master" },
            ],
        },
    ];

    const toggleExpanded = (label) => {
        if (isGenerating) return;
        setExpandedItems((prev) =>
            prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
        );
    };

    const handleLinkClick = (e, path) => {
        if (isGenerating) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };

    const isActive = (path, hasChildren = false) => {
        if (hasChildren) {
            return pathname === path || pathname.startsWith(path + "/");
        }
        return pathname === path;
    };

    // Determine if sidebar should appear expanded (either manually expanded or hovered when collapsed)
    const isExpanded = !collapsed || (collapsed && hovered);

    return (
        <aside
            className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-700 backdrop-blur-md bg-gray-900 text-white transition-all duration-300 
                ${isExpanded ? "w-64" : "w-20"}
            `}
            onMouseEnter={() => setHovered && setHovered(true)}
            onMouseLeave={() => setHovered && setHovered(false)}
        >
            {/* Header */}
            <div className="flex items-center h-16 px-3 border-b border-gray-800">
                {isGenerating ? (
                    <div className="flex items-center gap-2 flex-1 group cursor-not-allowed opacity-50">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center transition-transform duration-200">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        {isExpanded && (
                            <span className="text-lg font-semibold tracking-tight ml-2">
                                Splash AI Studio
                            </span>
                        )}
                    </div>
                ) : (
                    <Link href="/dashboard" className="flex items-center gap-2 flex-1 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        {isExpanded && (
                            <span className="text-lg font-semibold tracking-tight ml-2">
                                Splash AI Studio
                            </span>
                        )}
                    </Link>
                )}

                <button
                    onClick={() => !isGenerating && setCollapsed(!collapsed)}
                    disabled={isGenerating}
                    className={`ml-2 flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 transition ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {collapsed ? (
                        <ChevronRight className="w-6 h-6 text-white" />
                    ) : (
                        <ChevronLeft className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-2 overflow-y-auto h-[calc(100%-6.5rem)] pb-20">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.children ? (
                            <>
                                <button
                                    onClick={() => isExpanded && !isGenerating && toggleExpanded(item.label)}
                                    disabled={isGenerating}
                                    className={`w-full flex items-center cursor-pointer ${isExpanded ? "gap-3" : "justify-center"} 
              px-3 py-2 rounded-md text-sm font-medium transition-colors 
              ${isActive(item.path, true)
                                            ? "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <item.icon className={`${isExpanded ? "w-5 h-5" : "w-7 h-7"} transition-all`} />
                                    {isExpanded && (
                                        <>
                                            <span className="flex-1 text-left">{item.label}</span>
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform ${expandedItems.includes(item.label)
                                                    ? "rotate-90"
                                                    : ""
                                                    }`}
                                            />
                                        </>
                                    )}
                                </button>

                                {isExpanded && expandedItems.includes(item.label) && (
                                    <div className={`ml-6 mt-1 space-y-1 animate-fadeIn ${isGenerating ? 'pointer-events-none opacity-50' : ''}`}>
                                        {item.children.map((child) => (
                                            isGenerating ? (
                                                <div
                                                    key={child.path}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-not-allowed
                                                        ${isActive(child.path)
                                                            ? "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md"
                                                            : "text-gray-400"
                                                        }`}
                                                >
                                                    <child.icon className="w-4 h-4" />
                                                    <span>{child.label}</span>
                                                </div>
                                            ) : (
                                                <Link
                                                    key={child.path}
                                                    href={child.path}
                                                    onClick={(e) => handleLinkClick(e, child.path)}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                                                        ${isActive(child.path)
                                                            ? "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md"
                                                            : "text-gray-400 hover:text-white hover:bg-white/10"
                                                        }`}
                                                >
                                                    <child.icon className="w-4 h-4" />
                                                    <span>{child.label}</span>
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            isGenerating ? (
                                <div
                                    className={`flex items-center ${isExpanded ? "gap-3" : "justify-center my-3"} 
                                        px-3 py-2 rounded-md text-sm font-medium transition-colors my-3 cursor-not-allowed opacity-50
                                        ${isActive(item.path)
                                            ? "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md"
                                            : "text-gray-300"
                                        }`}
                                >
                                    <item.icon className={`transition-all w-5 h-5 ${isExpanded ? "" : "my-3"}`} />
                                    {isExpanded && <span>{item.label}</span>}
                                </div>
                            ) : (
                                <Link
                                    href={item.path}
                                    onClick={(e) => handleLinkClick(e, item.path)}
                                    className={`flex items-center ${isExpanded ? "gap-3" : "justify-center my-3"} 
                                        px-3 py-2 rounded-md text-sm font-medium transition-colors my-3
                                        ${isActive(item.path)
                                            ? "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <item.icon className={`transition-all w-5 h-5 ${isExpanded ? "" : "my-3"}`} />
                                    {isExpanded && <span>{item.label}</span>}
                                </Link>
                            )
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer (always visible) */}
            <div className="absolute bottom-0 left-0 w-full border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
                <div className="flex flex-col items-center justify-center gap-2 py-3 px-4">
                    {/* Logout button - visible both in collapsed and expanded */}
                    <button
                        onClick={() => !isGenerating && logout()}
                        disabled={isGenerating}
                        className={`flex items-center ${isExpanded ? "gap-3 w-full text-left" : "justify-center"} 
                            text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <LogOut className="w-5 h-5" />
                        {isExpanded && <span>Logout</span>}
                    </button>

                    {/* Footer icons (hidden when collapsed) */}
                    {isExpanded && (
                        <div className="flex justify-around w-full mt-2">
                            <button className="p-2 rounded-md hover:bg-white/10">
                                <MessageCircle className="w-5 h-5 text-gray-300 hover:text-white" />
                            </button>
                            <button className="p-2 rounded-md hover:bg-white/10 relative">
                                <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full" />
                            </button>
                            <button className="p-2 rounded-md hover:bg-white/10">
                                <Settings className="w-5 h-5 text-gray-300 hover:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
