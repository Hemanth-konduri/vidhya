"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the password reset link!");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-sm">
          
          <button 
            onClick={() => router.back()} 
            className="mb-6 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Vidhya <span className="text-indigo-600">LMS</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              XYZ College of Engineering
            </p>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-xl font-medium text-slate-800">
              Forgot Password?
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {message && (
              <p className="text-sm text-green-600 text-center">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-cyan-600 text-white px-12">
        <div className="max-w-md text-center">
          <h3 className="text-2xl font-semibold mb-3">
            Reset Your Password
          </h3>
          <p className="text-sm text-indigo-100 leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}