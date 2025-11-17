"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Bell, User, X, Check, Mail, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Topbar({ collapsed }) {
    const { token } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingInvite, setProcessingInvite] = useState(null);
    const notificationRef = useRef(null);

    const fetchInvites = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await apiService.getAllInvites(token);
            setInvites(data.pending_invites || []);
        } catch (err) {
            console.error("Error fetching invites:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch pending invitations on mount and when token changes
    useEffect(() => {
        fetchInvites();
    }, [fetchInvites]);

    // Refresh invites when notification sidebar is opened
    useEffect(() => {
        if (showNotifications) {
            fetchInvites();
        }
    }, [showNotifications, fetchInvites]);

    // Close notification sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                // Check if click is not on the bell icon
                const bellButton = event.target.closest('button[data-notification-button]');
                if (!bellButton) {
                    setShowNotifications(false);
                }
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const handleAccept = async (inviteId, projectName) => {
        try {
            setProcessingInvite(inviteId);
            await apiService.acceptInviteById(inviteId, token);
            fetchInvites();
        } catch (err) {
            console.error("Failed to accept invitation:", err);
        } finally {
            setProcessingInvite(null);
        }
    };

    const handleReject = async (inviteId) => {
        try {
            setProcessingInvite(inviteId);
            await apiService.rejectInvite(inviteId, token);
            fetchInvites();
        } catch (err) {
            console.error("Failed to reject invitation:", err);
        } finally {
            setProcessingInvite(null);
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "owner":
                return "bg-[#a020f0] text-white";
            case "editor":
                return "bg-[#7753ff] text-white";
            case "viewer":
                return "bg-[#708090] text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const pendingCount = invites.length;

    return (
        <>
            <header
                className={`fixed top-0 right-0 z-30 h-16 flex items-center  bg-white border-b border-white shadow px-6 transition-all duration-300 ${collapsed ? "left-16" : "left-64"
                    }`}
            >
                {/* Left Section */}


                {/* Middle Section (Search) */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border-b border-black text-black text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-black"
                        />
                        <Search className="absolute right-3 top-2.5 w-4 h-4 text-black" />
                    </div>
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <div className="relative" ref={notificationRef}>
                        <button
                            data-notification-button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <Bell className="w-5 h-5 text-black cursor-pointer" />
                            {pendingCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                    {pendingCount > 9 ? '9+' : pendingCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Sidebar Modal */}
                        {showNotifications && (
                            <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[600px] overflow-hidden flex flex-col">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-indigo-600" />
                                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                                        {pendingCount > 0 && (
                                            <Badge className="bg-indigo-600 text-white">
                                                {pendingCount}
                                            </Badge>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-8 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                                        </div>
                                    ) : invites.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 text-sm">No pending invitations</p>
                                        </div>
                                    ) : (
                                        <div className="p-4 space-y-3">
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                                Pending Invitations
                                            </p>
                                            {invites.map((invite) => (
                                                <div
                                                    key={invite.id}
                                                    className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all bg-white"
                                                >
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#a020f0] to-[#7753ff] flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                                                            {getInitials(invite.project_name)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold text-gray-900 text-sm truncate">
                                                                {invite.project_name}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 truncate">
                                                                Invited by {invite.inviter_name}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge className={`${getRoleBadgeColor(invite.role)} text-xs px-1.5 py-0`}>
                                                                    {invite.role}
                                                                </Badge>
                                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                                    <Clock className="w-3 h-3" />
                                                                    {getTimeAgo(invite.created_at)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            onClick={() => handleAccept(invite.id, invite.project_name)}
                                                            disabled={processingInvite === invite.id}
                                                            size="sm"
                                                            className="flex-1 bg-gradient-to-r from-[#a020f0] to-[#7753ff] hover:from-[#8f1cda] hover:to-[#6642e6] text-white text-xs h-8"
                                                        >
                                                            {processingInvite === invite.id ? (
                                                                <>
                                                                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Check className="w-3 h-3 mr-1" />
                                                                    Accept
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleReject(invite.id)}
                                                            disabled={processingInvite === invite.id}
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 border-gray-300 hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-xs h-8"
                                                        >
                                                            <X className="w-3 h-3 mr-1" />
                                                            Decline
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="flex items-center gap-2 p-2 rounded-md">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-black text-sm hidden md:inline">Profile</span>
                    </button>
                </div>
            </header>
        </>
    );
}
