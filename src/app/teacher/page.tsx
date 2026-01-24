"use client";

import { useState } from "react";
import { createStudent } from "./actions/createStudent";
import LogoutButton from "@/components/logout-button";

export default function TeacherPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreateStudent(formData: FormData) {
    setMessage(null);
    try {
      await createStudent(formData);
      setMessage("✅ Student created successfully");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teacher Dashboard</h1>

      <LogoutButton />

      <hr />

      <h2>Create Student</h2>

      <form action={handleCreateStudent}>
        <input
          name="email"
          type="email"
          placeholder="Student Email"
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
          name="roll_no"
          placeholder="Roll Number (unique)"
          required
        />
        <br /><br />

        <button type="submit">Create Student</button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}