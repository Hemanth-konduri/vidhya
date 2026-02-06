"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle the auth callback
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setError("Invalid or expired reset link");
      }
    };

    handleAuthCallback();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Password updated successfully!");
      router.push("/login");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-sm">
          
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
              Reset Password
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
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
            Create New Password
          </h3>
          <p className="text-sm text-indigo-100 leading-relaxed">
            Choose a strong password to secure your account.
          </p>
        </div>
      </div>
    </div>
  );
}