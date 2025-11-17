"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Image, FolderKanban, Zap, TrendingUp, Mail } from "lucide-react";
import PendingInvitations from "@/components/PendingInvitations";
import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/lib/api";

export default function Dashboard() {
    const { user, token } = useAuth();
    const [recentImages, setRecentImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        activeProjects: 0,
        inProgressProjects: 0,
        completedProjects: 0,
        totalImages: 0,
        imagesGenerated: 0
    });

    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    // Get user display name
    const getUserDisplayName = () => {
        if (user?.full_name) {
            return user.full_name;
        }
        if (user?.username) {
            return user.username;
        }
        if (user?.email) {
            return user.email.split('@')[0];
        }
        return "User";
    };

    // Fetch projects data
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Fetch projects
                const projectsResponse = await apiService.getProjects(token);
                if (projectsResponse?.projects) {
                    const projectsData = projectsResponse.projects;

                    // Calculate stats
                    const activeProjects = projectsData.length;
                    const inProgress = projectsData.filter(p => p.status === 'in_progress' || p.status === 'active').length;
                    const completed = projectsData.filter(p => p.status === 'completed').length;
                    const totalImages = projectsData.reduce((sum, p) => sum + (p.total_images || 0), 0);

                    setStats({
                        activeProjects,
                        inProgressProjects: inProgress,
                        completedProjects: completed,
                        totalImages,
                        imagesGenerated: totalImages // Using total images from projects as generated count
                    });
                }

                // Fetch recent images from ImageGenerationHistory
                const imagesResponse = await apiService.getRecentImages(token, 5);
                if (imagesResponse?.success && imagesResponse?.images) {
                    setRecentImages(imagesResponse.images);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    return (
        <div className="space-y-6 animate-fadeIn p-6 bg-gray-50 text-gray-900">
            {/* Welcome Section */}
            <div className="relative p-4 rounded-xl bg-white shadow-md border border-gray-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold">{greeting}, {getUserDisplayName()}</h1>
                </div>
            </div>

            {/* Credits & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Credits */}
                <Link href="/my-account/billing">
                    <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-center pb-2">
                            <span className="text-sm font-medium text-gray-500">Remaining Credits</span>
                            <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">850</div>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div className="bg-indigo-500 h-2 rounded-full w-[85%]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">of 1,000 credits • Pro Plan</p>
                        </div>
                    </div>
                </Link>

                {/* Images Generated */}
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center pb-2">
                        <span className="text-sm font-medium text-gray-500">Images Generated</span>
                        <Image className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {loading ? "..." : stats.imagesGenerated}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            {loading ? "Loading..." : "Total images generated"}
                        </p>
                    </div>
                </div>

                {/* Active Projects */}
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center pb-2">
                        <span className="text-sm font-medium text-gray-500">Active Projects</span>
                        <FolderKanban className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {loading ? "..." : stats.activeProjects}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            {loading ? "Loading..." : `${stats.inProgressProjects} in progress • ${stats.completedProjects} completed`}
                        </p>
                    </div>
                </div>
            </div>

            {/* ✅ Pending Invitations Section */}
            {/* <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-6 h-6 text-indigo-500" />
                    <div>
                        <h2 className="text-xl font-bold bg-[linear-gradient(135deg,hsl(250,70%,60%),hsl(260,75%,65%))] bg-clip-text text-transparent">
                            Pending Invitations
                        </h2>
                        <p className="text-gray-500 text-sm">Review and respond to project invitations</p>
                    </div>
                </div>

                <PendingInvitations /> {/* ✅ Plugged in full component */}
            {/* </div>  */}

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Plain Image */}
                    <Link href="/dashboard/images/white-bg">
                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group text-center">
                            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                                <Image className="w-5 h-5 text-indigo-500" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">Plain Image</h3>
                            <p className="text-xs text-gray-500">Clean product shots</p>
                        </div>
                    </Link>

                    {/* Themed Image */}
                    <Link href="/dashboard/images/replace-bg">
                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group text-center">
                            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-xl bg-yellow-50 group-hover:bg-yellow-100 transition">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">Themed Image</h3>
                            <p className="text-xs text-gray-500">Lifestyle shots</p>
                        </div>
                    </Link>

                    {/* Model Images */}
                    <Link href="/dashboard/images/ai-model">
                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group text-center">
                            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                                <Image className="w-5 h-5 text-indigo-500" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">Model Images</h3>
                            <p className="text-xs text-gray-500">AI or human models</p>
                        </div>
                    </Link>

                    {/* New Project */}
                    <Link href="/dashboard/projects/create">
                        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group text-center">
                            <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-xl bg-yellow-50 group-hover:bg-yellow-100 transition">
                                <FolderKanban className="w-5 h-5 text-yellow-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">New Project</h3>
                            <p className="text-xs text-gray-500">Full campaign photoshoots</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Images */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">My Recent Images</h2>
                {(() => {
                    if (loading) {
                        return (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="aspect-square overflow-hidden rounded-xl bg-gray-200 border border-gray-200 animate-pulse"
                                    />
                                ))}
                            </div>
                        );
                    }
                    if (recentImages.length > 0) {
                        return (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {recentImages.map((image) => {
                                    const imageSrc = image.image_url || "/placeholder.svg";
                                    return (
                                        <div
                                            key={image.id}
                                            className="aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={image.prompt || "Generated content"}
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "/placeholder.svg";
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                    return (
                        <div className="text-center py-8 text-gray-500">
                            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p>No recent images yet. Start generating images to see them here!</p>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
