"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, Calendar, Zap, Check, Crown } from "lucide-react";
import { toast } from "react-hot-toast";

export const SubscriptionBilling = () => {
  const currentPlan = {
    name: "Pro",
    price: 49,
    credits: 5000,
    creditsUsed: 2550,
    renewDate: "2024-02-15",
  };

  const plans = [
    {
      name: "Starter",
      price: 19,
      credits: 1000,
      features: ["All image types", "Basic AI models", "5 active projects", "Email support"],
    },
    {
      name: "Pro",
      price: 49,
      credits: 5000,
      features: [
        "All image types",
        "Advanced AI models",
        "Unlimited projects",
        "Priority support",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: 199,
      credits: 25000,
      features: [
        "Everything in Pro",
        "Custom AI training",
        "Dedicated account manager",
        "SLA guarantee",
        "Advanced analytics",
      ],
    },
  ];

  const invoices = [
    { id: "INV-2024-001", date: "2024-01-15", amount: 49, status: "Paid" },
    { id: "INV-2023-012", date: "2023-12-15", amount: 49, status: "Paid" },
    { id: "INV-2023-011", date: "2023-11-15", amount: 49, status: "Paid" },
  ];

  const creditsPercentage = ((currentPlan.credits - currentPlan.creditsUsed) / currentPlan.credits) * 100;

  // --- Color Palette ---
  const colors = {
    foreground: "hsl(0, 0%, 15%)",
    mutedForeground: "hsl(0, 0%, 40%)",
    accent: "hsl(180, 45%, 45%)",
    accentBg: "hsla(180, 45%, 45%, 0.1)",
    destructive: "hsl(0, 84%, 60%)",
    success: "hsl(142, 76%, 36%)",
    muted: "hsl(46, 34%, 92%)",
    cardBg: "hsl(0, 0%, 100%)",
    border: "hsl(0, 0%, 90%)",
    shadowElegant: "0 8px 30px -8px rgba(71, 71, 71, 0.15)",
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto" style={{ animation: "fade-in 0.3s ease-in-out" }}>
      {/* Header */}
      <div>
        <h1 style={{ color: colors.foreground }} className="text-3xl font-bold mb-2">
          Subscription, Credits & Billing
        </h1>
        <p style={{ color: colors.mutedForeground }}>
          Manage your plan, credits, and billing information
        </p>
      </div>

      {/* Current Plan + Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <Card style={{ boxShadow: colors.shadowElegant, background: colors.cardBg }} className="lg:col-span-2">
          <CardHeader>
            <CardTitle style={{ color: colors.foreground }}>Current Plan</CardTitle>
            <CardDescription style={{ color: colors.mutedForeground }}>
              Your active subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: colors.foreground }} className="text-2xl font-bold">
                    {currentPlan.name} Plan
                  </h3>
                  <Badge style={{ backgroundColor: colors.accent, color: "#fff" }}>
                    <Crown className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <p style={{ color: colors.foreground }} className="text-3xl font-bold">
                  ${currentPlan.price}
                  <span style={{ color: colors.mutedForeground }} className="text-base font-normal">
                    /month
                  </span>
                </p>
              </div>
              <Button
                variant="outline"
                style={{
                  borderColor: colors.border,
                  color: colors.foreground,
                }}
              >
                Manage Plan
              </Button>
            </div>

            <Separator style={{ backgroundColor: colors.border }} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ color: colors.foreground }} className="text-sm font-medium">
                    Credits Remaining
                  </p>
                  <p style={{ color: colors.mutedForeground }} className="text-xs">
                    Renews on {currentPlan.renewDate}
                  </p>
                </div>
                <p style={{ color: colors.accent }} className="text-2xl font-bold">
                  {currentPlan.credits - currentPlan.creditsUsed}
                  <span style={{ color: colors.mutedForeground }} className="text-sm font-normal">
                    /{currentPlan.credits}
                  </span>
                </p>
              </div>
              <Progress
                value={creditsPercentage}
                className="h-3"
                style={{
                  backgroundColor: colors.muted,
                  "--progress-color": colors.accent,
                }}
              />
            </div>

            <div
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: colors.muted }}
            >
              <div>
                <p style={{ color: colors.foreground }} className="text-sm font-medium">
                  Need more credits?
                </p>
                <p style={{ color: colors.mutedForeground }} className="text-xs">
                  Purchase additional credits anytime
                </p>
              </div>
              <Button
                size="sm"
                style={{
                  background: `linear-gradient(to right, ${colors.accent}, hsla(180,45%,45%,0.8))`,
                  color: "#fff",
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Buy Credits
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card style={{ boxShadow: colors.shadowElegant, background: colors.cardBg }}>
          <CardHeader>
            <CardTitle style={{ color: colors.foreground }}>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <CreditCard className="w-8 h-8" style={{ color: colors.accent }} />
                <Badge variant="outline" style={{ borderColor: colors.border, color: colors.mutedForeground }}>
                  Default
                </Badge>
              </div>
              <p style={{ color: colors.foreground }} className="font-medium mb-1">
                •••• •••• •••• 4242
              </p>
              <p style={{ color: colors.mutedForeground }} className="text-sm">
                Expires 12/25
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: colors.border,
                color: colors.foreground,
              }}
            >
              Update Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <div>
        <h2 style={{ color: colors.foreground }} className="text-2xl font-bold mb-4">
          Available Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="shadow-md hover:-translate-y-1 transition-all"
              style={{
                boxShadow: plan.popular ? colors.shadowElegant : "0 4px 6px rgba(0,0,0,0.08)",
                border: plan.popular ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
              }}
            >
              {plan.popular && (
                <div
                  className="text-white text-center py-2 text-sm font-semibold"
                  style={{
                    background: `linear-gradient(to right, ${colors.accent}, hsla(180,45%,45%,0.8))`,
                  }}
                >
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle style={{ color: colors.foreground }}>{plan.name}</CardTitle>
                <div className="mt-4">
                  <p style={{ color: colors.foreground }} className="text-4xl font-bold">
                    ${plan.price}
                    <span style={{ color: colors.mutedForeground }} className="text-base font-normal">
                      /mo
                    </span>
                  </p>
                  <p style={{ color: colors.mutedForeground }} className="text-sm mt-1">
                    {plan.credits} credits/month
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.success }} />
                      <span style={{ color: colors.mutedForeground }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  style={{
                    background:
                      plan.name === currentPlan.name
                        ? colors.muted
                        : `linear-gradient(to right, ${colors.accent}, hsla(180,45%,45%,0.8))`,
                    color: plan.name === currentPlan.name ? colors.mutedForeground : "#fff",
                    cursor: plan.name === currentPlan.name ? "not-allowed" : "pointer",
                  }}
                  disabled={plan.name === currentPlan.name}
                  onClick={() => toast.success(`Upgrading to ${plan.name} plan...`)}
                >
                  {plan.name === currentPlan.name ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card style={{ boxShadow: colors.shadowElegant, background: colors.cardBg }}>
        <CardHeader>
          <CardTitle style={{ color: colors.foreground }}>Billing History</CardTitle>
          <CardDescription style={{ color: colors.mutedForeground }}>
            Your recent invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg transition-colors"
                style={{
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.accentBg }}
                  >
                    <Calendar className="w-5 h-5" style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <p style={{ color: colors.foreground }} className="font-medium">
                      {invoice.id}
                    </p>
                    <p style={{ color: colors.mutedForeground }} className="text-sm">
                      {invoice.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p style={{ color: colors.foreground }} className="font-semibold">
                      ${invoice.amount}
                    </p>
                    <Badge
                      variant="outline"
                      style={{ borderColor: colors.border, color: colors.mutedForeground }}
                      className="text-xs"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button size="icon" variant="ghost" style={{ color: colors.mutedForeground }}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionBilling;
