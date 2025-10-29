"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Check, X, Clock, Users, Loader2, CheckCircle, XCircle } from "lucide-react"
import { apiService } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function PendingInvitations() {
    const { token } = useAuth()
    const [invites, setInvites] = useState([])
    const [loading, setLoading] = useState(true)
    const [processingInvite, setProcessingInvite] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchInvites()
    }, [])

    const fetchInvites = async () => {
        try {
            setLoading(true)
            const data = await apiService.getAllInvites(token)
            setInvites(data.pending_invites || [])
        } catch (err) {
            console.error("Error fetching invites:", err)
            setErrorMessage("Failed to load invitations")
        } finally {
            setLoading(false)
        }
    }

    const handleAccept = async (inviteId, projectName) => {
        try {
            setProcessingInvite(inviteId)
            setErrorMessage("")
            await apiService.acceptInviteById(inviteId, token)
            setSuccessMessage(`You've joined ${projectName}! 🎉`)
            setTimeout(() => setSuccessMessage(""), 5000)
            // Refresh invites list
            fetchInvites()
        } catch (err) {
            setErrorMessage(err.message || "Failed to accept invitation")
        } finally {
            setProcessingInvite(null)
        }
    }

    const handleReject = async (inviteId) => {
        try {
            setProcessingInvite(inviteId)
            setErrorMessage("")
            await apiService.rejectInvite(inviteId, token)
            setSuccessMessage("Invitation declined")
            setTimeout(() => setSuccessMessage(""), 3000)
            // Refresh invites list
            fetchInvites()
        } catch (err) {
            setErrorMessage(err.message || "Failed to reject invitation")
        } finally {
            setProcessingInvite(null)
        }
    }

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "owner":
                return "bg-[#a020f0] text-white"
            case "editor":
                return "bg-[#7753ff] text-white"
            case "viewer":
                return "bg-[#708090] text-white"
            default:
                return "bg-gray-500 text-white"
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

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now - date) / 1000)

        if (diffInSeconds < 60) return "just now"
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        return `${Math.floor(diffInSeconds / 86400)}d ago`
    }

    if (loading) {
        return (
            <Card className="p-8 border-2 border-purple-100">
                <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#a020f0]" />
                </div>
            </Card>
        )
    }

    if (invites.length === 0) {
        return (
            <Card className="p-8 border-2 border-purple-100 text-center">
                <Mail className="w-12 h-12 text-[#708090] mx-auto mb-3 opacity-50" />
                <p className="text-[#708090] text-sm">No pending invitations</p>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {/* Success/Error Messages */}
            {successMessage && (
                <Card className="p-4 bg-green-50 border-2 border-green-200">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">{successMessage}</span>
                    </div>
                </Card>
            )}
            {errorMessage && (
                <Card className="p-4 bg-red-50 border-2 border-red-200">
                    <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-800 font-medium">{errorMessage}</span>
                    </div>
                </Card>
            )}

            {/* Invitations List */}
            {invites.map((invite) => (
                <Card
                    key={invite.id}
                    className="p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex items-start gap-4">
                        {/* Project Avatar */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a020f0] to-[#7753ff] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getInitials(invite.project_name)}
                        </div>

                        {/* Invitation Details */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a1a2e]">
                                        {invite.project_name}
                                    </h3>
                                    <p className="text-sm text-[#708090]">
                                        Invited by <span className="font-medium text-[#1a1a2e]">{invite.inviter_name}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={getRoleBadgeColor(invite.role)}>
                                        {invite.role}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-[#708090]">
                                        <Clock className="w-3 h-3" />
                                        {getTimeAgo(invite.created_at)}
                                    </div>
                                </div>
                            </div>

                            {/* Inviter Info */}
                            <div className="flex items-center gap-2 mb-4">
                                <Avatar className="w-6 h-6">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${invite.inviter_email}`}
                                    />
                                    <AvatarFallback className="text-xs">
                                        {getInitials(invite.inviter_name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-[#708090]">
                                    {invite.inviter_email}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() => handleAccept(invite.id, invite.project_name)}
                                    disabled={processingInvite === invite.id}
                                    className="flex-1 bg-gradient-to-r from-[#a020f0] to-[#7753ff] hover:from-[#8f1cda] hover:to-[#6642e6] text-white gap-2"
                                >
                                    {processingInvite === invite.id ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Accept
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => handleReject(invite.id)}
                                    disabled={processingInvite === invite.id}
                                    variant="outline"
                                    className="flex-1 border-[#e6e6e6] hover:bg-red-50 hover:border-red-300 hover:text-red-600 gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Decline
                                </Button>
                                <Link href={`/dashboard/projects/${invite.project_id}`}>
                                    <Button
                                        variant="outline"
                                        className="border-[#e6e6e6] hover:bg-[#f0e6ff] hover:border-[#a020f0]"
                                    >
                                        View Project
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

