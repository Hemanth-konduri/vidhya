"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Users, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { assignStudentsToBatch } from "../../actions/assignStudentsToBatch";

interface Student {
  id: string;
  email: string;
  roll_no: string;
  batch_id?: string;
  batches?: { name: string };
}

interface Batch {
  id: string;
  name: string;
}

export default function TeacherAddStudentPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return;

      console.log("Fetching batches...");
      
      // Get all batches (simplified approach)
      const { data: batchData, error: batchError } = await supabase
        .from("batches")
        .select("id, name")
        .order("name");

      console.log("Batch data:", batchData, "Error:", batchError);
      setBatches(batchData || []);

      // Get all students with profiles data - using correct column names
      const { data: studentData, error: studentError } = await supabase
        .from("profiles")
        .select(`
          id, email, roll_no, batch_id,
          batches(name)
        `)
        .eq("role", "student")
        .not("email", "is", null)
        .order("email");

      console.log("Student data:", studentData, "Error:", studentError);
      setStudents(studentData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (student.email && student.email.toLowerCase().includes(searchLower)) ||
      (student.roll_no && student.roll_no.toLowerCase().includes(searchLower))
    );
  });

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch || selectedStudents.length === 0) {
      alert("Please select a batch and at least one student");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("batch_id", selectedBatch);
      selectedStudents.forEach(studentId => {
        formData.append("student_ids", studentId);
      });

      await assignStudentsToBatch(formData);
      alert("Students assigned successfully!");
      router.push("/dashboards/teacher");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-slate-900">Assign Students to Batch</h1>
          <p className="text-slate-600 mt-1">Search and assign existing students to your batches</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Batch Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Select Batch</h2>
            {batches.length === 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">No batches found. Please create batches first.</p>
              </div>
            ) : (
              <select 
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a batch ({batches.length} available)</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>{batch.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Student Search */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Search Students</h2>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by email or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900">
                Students ({filteredStudents.length})
              </h3>
              {selectedStudents.length > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  {selectedStudents.length} selected
                </span>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
              {searchTerm && filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No students found for "{searchTerm}"</p>
                  <p className="text-sm mt-2">Try searching with a different name or roll number</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No students available</p>
                  <p className="text-sm mt-2">Please add students to the system first</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {filteredStudents.map(student => (
                    <div
                      key={student.id}
                      className={`p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        selectedStudents.includes(student.id) ? 'bg-green-50 border-l-4 border-green-500' : ''
                      }`}
                      onClick={() => handleStudentSelect(student.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedStudents.includes(student.id) 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-slate-300'
                          }`}>
                            {selectedStudents.includes(student.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{student.email || 'No Email'}</p>
                            <p className="text-sm text-slate-600">Roll: {student.roll_no || 'No Roll'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {student.batch_id ? (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {student.batches?.name || 'Assigned'}
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              disabled={loading || !selectedBatch || selectedStudents.length === 0}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Assigning...' : `Assign ${selectedStudents.length} Student${selectedStudents.length !== 1 ? 's' : ''}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
