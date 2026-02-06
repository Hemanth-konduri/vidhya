"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "../../actions/createStudent";
import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

export default function AddStudentPage() {
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [deptData, batchData] = await Promise.all([
        supabase.from("departments").select("id, name").order("name"),
        supabase.from("batches").select("id, name").order("name")
      ]);
      setDepartments(deptData.data || []);
      setBatches(batchData.data || []);
    }
    fetchData();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);
    }
  };

  async function submit(fd: FormData) {
    if (profilePhoto) {
      fd.append("photo", profilePhoto);
    }
    try {
      await createStudent(fd);
      router.push("/dashboards/admin/students");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add Student</h1>
          <p className="text-slate-600 mt-1">Create new student admission record</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">

          {/* Profile Photo Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                {photoPreview ? (
                  <Image
                    src={photoPreview} 
                    alt="Preview" 
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 text-center">
                    <Upload className="w-6 h-6 mx-auto mb-1 opacity-50" />
                    <span className="text-xs">No photo</span>
                  </div>
                )}
              </div>
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 hover:bg-slate-50 transition">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">Click to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  className="input w-full" 
                  placeholder="e.g., John Doe"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Roll Number *
                </label>
                <input 
                  type="text" 
                  name="roll_no" 
                  className="input w-full" 
                  placeholder="e.g., CSE-001"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gender
                </label>
                <select name="gender" className="input w-full">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  name="dob" 
                  className="input w-full" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <textarea 
                  name="address" 
                  className="input w-full min-h-25" 
                  placeholder="Enter full address"
                />
              </div>

            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Academic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department *
                </label>
                <select name="department_id" className="input w-full" required>
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Batch
                </label>
                <select name="batch_id" className="input w-full">
                  <option value="">Select Batch</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="input w-full" 
                  placeholder="e.g., +91 9876543210"
                />
              </div>

            </div>
          </div>

          {/* Login Credentials */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Login Credentials</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email" 
                  className="input w-full" 
                  placeholder="e.g., student@college.edu"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password *
                </label>
                <input 
                  type="password" 
                  name="password" 
                  className="input w-full" 
                  placeholder="Enter secure password"
                  required 
                />
              </div>

            </div>
          </div>

          <div className="flex gap-4 pt-8 border-t border-slate-200">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition ml-auto"
            >
              Create Student
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}