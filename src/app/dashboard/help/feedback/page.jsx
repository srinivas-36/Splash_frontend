"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Lightbulb, Bug, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

export const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState("feature-requests");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your feedback! We'll review it shortly.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-gray-800">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Feedback & Feature Requests
        </h1>
        <p className="text-gray-500">
          Help us improve Splash AI Studio with your suggestions
        </p>
      </div>

      {/* Feedback Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Lightbulb,
            title: "Feature Requests",
            description: "Suggest new features",
            color: "from-teal-500 to-teal-400",
            value: "feature-requests",
          },
          {
            icon: Bug,
            title: "Bug Reports",
            description: "Report issues",
            color: "from-red-500 to-red-400",
            value: "bug-reports",
          },
          {
            icon: Sparkles,
            title: "General Feedback",
            description: "Share your thoughts",
            color: "from-pink-500 to-rose-400",
            value: "general-feedback",
          },
        ].map((type, idx) => {
          const isActive = feedbackType === type.value;
          return (
            <div
              key={idx}
              onClick={() => setFeedbackType(type.value)}
              className={`cursor-pointer border rounded-xl p-6 text-center transition-all duration-300 shadow-md hover:-translate-y-1 ${
                isActive
                  ? "ring-2 ring-teal-500 bg-gradient-to-b from-white to-gray-50"
                  : "bg-white"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-r ${type.color} text-white`}
              >
                <type.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1">{type.title}</h3>
              <p className="text-sm text-gray-500">{type.description}</p>
            </div>
          );
        })}
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Submit Your Feedback</h2>
          <p className="text-sm text-gray-500 mt-1">
            We read every submission and use your feedback to improve.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Feedback Type</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger id="type" className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature-requests">Feature Request</SelectItem>
                  <SelectItem value="bug-reports">Bug Report</SelectItem>
                  <SelectItem value="general-feedback">General Feedback</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Improvement</SelectItem>
                  <SelectItem value="performance">Performance Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="Brief summary of your feedback"
                required
                className="border-gray-300 focus:ring-teal-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information..."
                rows={6}
                required
                className="border-gray-300 focus:ring-teal-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="border-gray-300 focus:ring-teal-500"
              />
              <p className="text-xs text-gray-500">
                We'll reach out if we need more information about your feedback.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition"
              size="lg"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-md">
        <div className="p-6">
          <h3 className="font-semibold mb-3 text-gray-800">
            Recent Updates Based on Your Feedback
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-1">✓</span>
              <span>
                Added human model upload feature with auto-background detection
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-1">✓</span>
              <span>Improved generation speed by 40% across all image types</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-500 mt-1">✓</span>
              <span>Introduced project collaboration with role-based permissions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
