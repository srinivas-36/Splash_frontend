"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/lib/api";
export default function SignupForm() {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (formData.password !== formData.confirm_password) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await apiService.register(formData.full_name, formData.username, formData.email, formData.password);
            router.push("/login");
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#0c1421] mb-2">Sign Up</h1>
                <p className="text-lg text-[#313957]">Create your account to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-[#0c1421]">Full Name</label>
                    <Input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-[#f3f9fa] border border-[#e6e6e6] rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0c1421]">Username</label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe123"
                        required
                        className="w-full px-4 py-3 bg-[#f3f9fa] border border-[#e6e6e6] rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0c1421]">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                        className="w-full px-4 py-3 bg-[#f3f9fa] border border-[#e6e6e6] rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0c1421]">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        required
                        className="w-full px-4 py-3 bg-[#f3f9fa] border border-[#e6e6e6] rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-[#0c1421]">Confirm Password</label>
                    <Input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="w-full px-4 py-3 bg-[#f3f9fa] border border-[#e6e6e6] rounded-lg"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#5533ff] hover:bg-[#4422dd] text-white font-semibold rounded-full"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </Button>
            </form>

            {message && (
                <p className="mt-4 text-center text-sm text-[#313957]">{message}</p>
            )}

            <div className="mt-8 text-center">
                <p className="text-sm text-[#313957]">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-[#5533ff] hover:opacity-80">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
