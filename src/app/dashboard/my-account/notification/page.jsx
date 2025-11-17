"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, MessageSquare, Sparkles, TrendingUp } from "lucide-react";

export const NotificationsPreferences = () => {
  const colors = {
    foreground: "hsl(0, 0%, 15%)",
    mutedForeground: "hsl(0, 0%, 40%)",
    accent: "hsl(180, 45%, 45%)",
    accentBg: "hsla(180, 45%, 45%, 0.1)",
    border: "hsl(0, 0%, 90%)",
    cardBg: "hsl(0, 0%, 100%)",
    shadowElegant: "0 8px 30px -8px rgba(71, 71, 71, 0.15)",
  };

  const initialSettings = {
    "gen-email": true,
    "gen-push": true,
    "proj-email": true,
    "proj-push": false,
    "proj-collab": true,
    "usage-low": true,
    "usage-renewal": true,
    "usage-summary": false,
    "prod-features": true,
    "prod-tips": true,
    "market-offers": false,
    "market-news": false,
  };

  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (id) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const notificationCategories = [
    {
      icon: Sparkles,
      title: "Generation Updates",
      description: "Get notified when your images are generated",
      settings: [
        { id: "gen-email", label: "Email notifications" },
        { id: "gen-push", label: "Push notifications" },
      ],
    },
    {
      icon: MessageSquare,
      title: "Project Activity",
      description: "Updates about projects and collaborations",
      settings: [
        { id: "proj-email", label: "Email notifications" },
        { id: "proj-push", label: "Push notifications" },
        { id: "proj-collab", label: "Collaborator invites" },
      ],
    },
    {
      icon: TrendingUp,
      title: "Usage & Credits",
      description: "Alerts about credits and subscription",
      settings: [
        { id: "usage-low", label: "Low credit warnings" },
        { id: "usage-renewal", label: "Subscription renewals" },
        { id: "usage-summary", label: "Weekly usage summary" },
      ],
    },
    {
      icon: Bell,
      title: "Product Updates",
      description: "New features and improvements",
      settings: [
        { id: "prod-features", label: "New features" },
        { id: "prod-tips", label: "Tips and tutorials" },
      ],
    },
    {
      icon: Mail,
      title: "Marketing",
      description: "Promotional content and offers",
      settings: [
        { id: "market-offers", label: "Special offers" },
        { id: "market-news", label: "Newsletter" },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto" style={{ animation: "fade-in 0.3s ease-in-out" }}>
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: colors.foreground }}
        >
          Notifications & Preferences
        </h1>
        <p style={{ color: colors.mutedForeground }}>
          Choose what updates you want to receive
        </p>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        {notificationCategories.map((category, idx) => (
          <Card
            key={idx}
            className="transition-all"
            style={{
              backgroundColor: colors.cardBg,
              boxShadow: colors.shadowElegant,
              border: `1px solid ${colors.border}`,
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.accentBg }}
                >
                  <category.icon className="w-5 h-5" style={{ color: colors.accent }} />
                </div>
                <div>
                  <CardTitle
                    className="text-lg"
                    style={{ color: colors.foreground }}
                  >
                    {category.title}
                  </CardTitle>
                  <CardDescription style={{ color: colors.mutedForeground }}>
                    {category.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {category.settings.map((setting, settingIdx) => (
                <div key={setting.id}>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor={setting.id}
                      className="flex-1 cursor-pointer"
                      style={{ color: colors.foreground }}
                    >
                      {setting.label}
                    </Label>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium min-w-[30px] text-right"
                        style={{
                          color: settings[setting.id] ? colors.accent : colors.mutedForeground,
                        }}
                      >
                        {settings[setting.id] ? "On" : "Off"}
                      </span>
                      <Switch
                        id={setting.id}
                        checked={settings[setting.id]}
                        onCheckedChange={() => handleToggle(setting.id)}
                      />
                    </div>
                  </div>
                  {settingIdx !== category.settings.length - 1 && (
                    <Separator
                      className="mt-4"
                      style={{ backgroundColor: colors.border }}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPreferences;
