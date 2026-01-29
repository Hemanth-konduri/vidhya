"use client";

import { Users, BookOpen, MapPin, Award } from "lucide-react";

interface ClassData {
  id: string;
  name: string;
  classIncharge: string;
  totalStudents: number;
  branch: string;
  group: string;
  specialization: string;
}

export default function ClassProfileHeader({ classData }: { classData: ClassData }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
      
      <div className="flex items-start justify-between">
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{classData.name}</h2>
          <p className="text-blue-100 mb-6">Class Incharge: <span className="font-semibold">{classData.classIncharge}</span></p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm text-blue-100">Total Students</span>
              </div>
              <p className="text-2xl font-bold">{classData.totalStudents}</p>
            </div>

            <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm text-blue-100">Branch</span>
              </div>
              <p className="text-lg font-semibold">{classData.branch}</p>
            </div>

            <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4" />
                <span className="text-sm text-blue-100">Group</span>
              </div>
              <p className="text-lg font-semibold">{classData.group}</p>
            </div>

            <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm text-blue-100">Specialization</span>
              </div>
              <p className="text-lg font-semibold">{classData.specialization}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
