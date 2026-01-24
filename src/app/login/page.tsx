"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("User not found");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile) {
      setError("Unable to fetch role");
      setLoading(false);
      return;
    }

    if (profile.role === "admin") {
  router.push("/dashboards/admin");
}

if (profile.role === "teacher") {
  router.push("/dashboards/teacher");
}

if (profile.role === "student") {
  router.push("/dashboards/student");
}

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* LEFT SIDE – LOGIN */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Branding */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Vidhya <span className="text-indigo-600">LMS</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              XYZ College of Engineering
            </p>
          </div>

          {/* Message */}
          <div className="mb-8 text-center">
            <h2 className="text-xl font-medium text-slate-800">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Login to access your courses and academic resources
            </p>
          </div>

          {/* Form */}
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

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – BRAND / ILLUSTRATION */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-cyan-600 text-white px-12">
        <div className="max-w-md text-center">
          

          <h3 className="text-2xl font-semibold mb-3">
            Learn. Track. Succeed.
          </h3>

          <p className="text-sm text-indigo-100 leading-relaxed">
            A unified learning management system built for students,
            faculty, and administrators.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs">
              Secure
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs">
              Reliable
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs">
              Academic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}