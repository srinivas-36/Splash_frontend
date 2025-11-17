"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Key, Smartphone, Lock, Eye, MapPin, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

export const SecurityAccess = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [authenticatorAppEnabled, setAuthenticatorAppEnabled] = useState(false);

  const loginHistory = [
    { id: 1, device: "Chrome on MacBook Pro", location: "San Francisco, CA", time: "2 hours ago", current: true },
    { id: 2, device: "Safari on iPhone 14", location: "San Francisco, CA", time: "1 day ago", current: false },
    { id: 3, device: "Chrome on Windows", location: "New York, NY", time: "3 days ago", current: false },
  ];

  const colors = {
    foreground: "hsl(0, 0%, 15%)",
    mutedForeground: "hsl(0, 0%, 40%)",
    accent: "hsl(180, 45%, 45%)",
    accentBg: "hsla(180, 45%, 45%, 0.1)",
    mutedBg: "hsl(0, 0%, 97%)",
    destructive: "hsl(0, 75%, 55%)",
    border: "hsl(0, 0%, 90%)",
    cardBg: "hsl(0, 0%, 100%)",
    shadowElegant: "0 8px 30px -8px rgba(71, 71, 71, 0.15)",
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" style={{ animation: "fade-in 0.3s ease-in-out" }}>
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.foreground }}>
          Security & Access
        </h1>
        <p style={{ color: colors.mutedForeground }}>
          Manage your account security and access settings
        </p>
      </div>

      {/* Password Section */}
      <Card style={{ boxShadow: colors.shadowElegant, border: `1px solid ${colors.border}`, backgroundColor: colors.cardBg }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" style={{ color: colors.accent }} />
            <CardTitle style={{ color: colors.foreground }}>Password</CardTitle>
          </div>
          <CardDescription style={{ color: colors.mutedForeground }}>
            Update your password regularly to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Current Password", "New Password", "Confirm New Password"].map((label, idx) => (
            <div className="space-y-2" key={idx}>
              <Label>{label}</Label>
              <Input type="password" />
            </div>
          ))}
          <Button onClick={() => toast.success("Password updated successfully!")}>
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card style={{ boxShadow: colors.shadowElegant, border: `1px solid ${colors.border}`, backgroundColor: colors.cardBg }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" style={{ color: colors.accent }} />
                <CardTitle style={{ color: colors.foreground }}>Two-Factor Authentication</CardTitle>
              </div>
              <CardDescription style={{ color: colors.mutedForeground }}>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium min-w-[30px] text-right"
                style={{
                  color: twoFactorEnabled ? colors.accent : colors.mutedForeground,
                }}
              >
                {twoFactorEnabled ? "On" : "Off"}
              </span>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => {
                  setTwoFactorEnabled(checked);
                  if (checked) {
                    toast.success("Two-Factor Authentication enabled");
                  } else {
                    toast.success("Two-Factor Authentication disabled");
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="flex items-center justify-between p-4 rounded-lg"
            style={{ backgroundColor: colors.mutedBg }}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5" style={{ color: colors.mutedForeground }} />
              <div>
                <p className="font-medium" style={{ color: colors.foreground }}>
                  Authenticator App
                </p>
                <p className="text-sm" style={{ color: colors.mutedForeground }}>
                  Use an app to generate codes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium min-w-[30px] text-right"
                style={{
                  color: authenticatorAppEnabled ? colors.accent : colors.mutedForeground,
                }}
              >
                {authenticatorAppEnabled ? "On" : "Off"}
              </span>
              <Switch
                checked={authenticatorAppEnabled}
                onCheckedChange={(checked) => {
                  setAuthenticatorAppEnabled(checked);
                  if (checked) {
                    toast.success("Authenticator App enabled");
                  } else {
                    toast.success("Authenticator App disabled");
                  }
                }}
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setTwoFactorEnabled(true);
              setAuthenticatorAppEnabled(true);
              toast.success("Setting up 2FA...");
            }}
          >
            Enable Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card style={{ boxShadow: colors.shadowElegant, border: `1px solid ${colors.border}`, backgroundColor: colors.cardBg }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" style={{ color: colors.accent }} />
            <CardTitle style={{ color: colors.foreground }}>Active Sessions</CardTitle>
          </div>
          <CardDescription style={{ color: colors.mutedForeground }}>
            Manage devices where you're currently logged in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((session) => (
              <div key={session.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: colors.accentBg }}
                    >
                      <Smartphone className="w-5 h-5" style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium" style={{ color: colors.foreground }}>
                          {session.device}
                        </p>
                        {session.current && (
                          <Badge variant="outline" style={{ fontSize: "0.75rem" }}>
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: colors.mutedForeground }}>
                        <MapPin className="w-3 h-3" />
                        <span>{session.location}</span>
                        <span>•</span>
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.success("Session revoked")}
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {session.id !== loginHistory[loginHistory.length - 1].id && (
                  <Separator className="my-4" style={{ backgroundColor: colors.border }} />
                )}
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => toast.success("All other sessions revoked")}
          >
            Revoke All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card style={{ boxShadow: colors.shadowElegant, border: `1px solid ${colors.border}`, backgroundColor: colors.cardBg }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5" style={{ color: colors.accent }} />
            <CardTitle style={{ color: colors.foreground }}>API Keys</CardTitle>
          </div>
          <CardDescription style={{ color: colors.mutedForeground }}>
            Manage API keys for integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: colors.mutedBg }}
          >
            <p className="text-sm" style={{ color: colors.mutedForeground }}>
              No API keys created yet
            </p>
          </div>
          <Button variant="outline">Generate New API Key</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAccess;
