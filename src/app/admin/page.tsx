"use client";

import { useState } from "react";
import { createTeacher } from "./actions/createTeacher";
import LogoutButton from "@/components/logout-button";

export default function AdminPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreateTeacher(formData: FormData) {
    setMessage(null);
    try {
      await createTeacher(formData);
      setMessage("✅ Teacher created successfully");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      <LogoutButton />

      <hr />

      <h2>Create Teacher</h2>

      <form action={handleCreateTeacher}>
        <input
          name="email"
          type="email"
          placeholder="Teacher Email"
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Temporary Password"
          required
        />
        <br /><br />

        <input
          name="teacher_id"
          placeholder="Teacher ID (unique)"
          required
        />
        <br /><br />

        <button type="submit">Create Teacher</button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}