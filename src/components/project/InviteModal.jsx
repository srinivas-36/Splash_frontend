"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { X, UserPlus, Crown, Edit3, Eye, Search, Loader2 } from "lucide-react"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function InviteModal({ isOpen, onClose, onInvite, loading, projectId }) {
    const { token } = useAuth()
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState("viewer")
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [availableUsers, setAvailableUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)

    const roles = [
        {
            value: "owner",
            label: "Owner",
            icon: Crown,
            description: "Full access and can manage team",
            color: "text-[#a020f0]",
            bgColor: "bg-[#f0e6ff]",
        },
        {
            value: "editor",
            label: "Editor",
            icon: Edit3,
            description: "Can edit and contribute",
            color: "text-[#7753ff]",
            bgColor: "bg-[#e8e3ff]",
        },
        {
            value: "viewer",
            label: "Viewer",
            icon: Eye,
            description: "Can only view the project",
            color: "text-[#708090]",
            bgColor: "bg-[#f5f5f5]",
        },
    ]

    useEffect(() => {
        if (isOpen && projectId) {
            fetchAvailableUsers()
        }
    }, [isOpen, projectId])

    const fetchAvailableUsers = async () => {
        try {
            setLoadingUsers(true)
            const data = await apiService.getAvailableUsers(projectId, token)
            setAvailableUsers(data.available_users || [])
        } catch (err) {
            console.error("Error fetching available users:", err)
            setError("Failed to load available users")
        } finally {
            setLoadingUsers(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!selectedUser) {
            setError("Please select a user to invite")
            return
        }

        try {
            await onInvite(selectedUser.email, selectedRole)
            // Reset form on success
            setSelectedUser(null)
            setSelectedRole("viewer")
            setSearchQuery("")
            onClose()
        } catch (err) {
            setError(err.message || "Failed to send invitation")
        }
    }

    const getInitials = (name) => {
        if (!name) return "?"
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const filteredUsers = availableUsers.filter(user =>
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#a020f0] to-[#7753ff] p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Invite Team Member</h2>
                                <p className="text-white/80 text-sm mt-1">
                                    Select an existing user to invite to this project
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        {/* Search Users */}
                        <div>
                            <label htmlFor="search-input" className="block text-sm font-medium text-[#1a1a2e] mb-2">
                                Search Users
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#708090]" />
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full pl-11 pr-4 py-3 border border-[#e6e6e6] rounded-xl focus:ring-2 focus:ring-[#a020f0] focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Available Users List */}
                        <div>
                            <div className="block text-sm font-medium text-[#1a1a2e] mb-3">
                                Available Users ({filteredUsers.length})
                            </div>
                            <div className="border border-[#e6e6e6] rounded-xl max-h-64 overflow-y-auto">
                                {loadingUsers ? (
                                    <div className="flex items-center justify-center p-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-[#a020f0]" />
                                    </div>
                                ) : filteredUsers.length === 0 ? (
                                    <div className="p-8 text-center text-[#708090]">
                                        {searchQuery ? "No users found matching your search" : "No available users to invite"}
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[#e6e6e6]">
                                        {filteredUsers.map((user) => (
                                            <button
                                                key={user.id}
                                                type="button"
                                                onClick={() => setSelectedUser(user)}
                                                className={`w-full p-4 flex items-center gap-3 hover:bg-[#f8f9ff] transition-colors text-left ${selectedUser?.id === user.id ? "bg-[#f0e6ff] border-l-4 border-[#a020f0]" : ""
                                                    }`}
                                            >
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(user.full_name || user.username)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="font-medium text-[#1a1a2e]">
                                                        {user.full_name || user.username}
                                                    </p>
                                                    <p className="text-xs text-[#708090]">
                                                        {user.email}
                                                    </p>
                                                </div>
                                                {selectedUser?.id === user.id && (
                                                    <Badge className="bg-[#a020f0] text-white text-xs">
                                                        Selected
                                                    </Badge>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <span className="text-lg">⚠️</span>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Role Selection */}
                        {selectedUser && (
                            <div>
                                <div className="block text-sm font-medium text-[#1a1a2e] mb-3">
                                    Select Role for {selectedUser.full_name || selectedUser.username}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {roles.map((role) => {
                                        const Icon = role.icon
                                        return (
                                            <button
                                                key={role.value}
                                                type="button"
                                                onClick={() => setSelectedRole(role.value)}
                                                className={`p-4 rounded-xl border-2 transition-all text-left ${selectedRole === role.value
                                                    ? "border-[#a020f0] bg-[#f0e6ff] shadow-md scale-105"
                                                    : "border-[#e6e6e6] hover:border-[#a020f0]/50"
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg ${role.bgColor} flex items-center justify-center mb-3`}>
                                                    <Icon className={`w-5 h-5 ${role.color}`} />
                                                </div>
                                                <h3 className="font-bold text-[#1a1a2e] mb-1">
                                                    {role.label}
                                                </h3>
                                                <p className="text-xs text-[#708090]">
                                                    {role.description}
                                                </p>
                                                {selectedRole === role.value && (
                                                    <Badge className="mt-2 bg-[#a020f0] text-white text-xs">
                                                        Selected
                                                    </Badge>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-[#e6e6e6] flex gap-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            variant="outline"
                            className="flex-1 py-3 bg-transparent border-[#e6e6e6] hover:bg-[#f5f5f5]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !selectedUser}
                            className="flex-1 py-3 bg-gradient-to-r from-[#a020f0] to-[#7753ff] hover:from-[#8f1cda] hover:to-[#6642e6] text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Send Invitation
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
