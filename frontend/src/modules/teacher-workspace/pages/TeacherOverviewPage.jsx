import {
  useGetAssignmentsQuery,
} from "../../../features/assignments/api/assignmentsApi";

import {
  useGetGradesQuery,
} from "../../../features/grades/api/gradesApi";

import {
  useGetStudentsQuery,
} from "../../../features/students/studentsApi";

import TeacherStatsCards
from "../components/TeacherStatsCards";

import PendingSubmissionsCard
from "../components/PendingSubmissionsCard";

import StudentRiskCard
from "../components/StudentRiskCard";

import TeacherActivityFeed
from "../components/TeacherActivityFeed";



export default function TeacherOverviewPage() {

  // 🔥 DATA
  const {
    data: assignmentsResponse,
    isLoading: assignmentsLoading,
  } = useGetAssignmentsQuery();



  const {
    data: gradesResponse,
    isLoading: gradesLoading,
  } = useGetGradesQuery();



  const {
    data: studentsResponse,
    isLoading: studentsLoading,
  } = useGetStudentsQuery();




  // 🔥 NORMALIZED
  const assignments =
    assignmentsResponse?.data || [];

  const grades =
    gradesResponse || [];

  const students =
    studentsResponse || [];




  // 🔥 LOADING
  const loading =
    assignmentsLoading ||
    gradesLoading ||
    studentsLoading;




  // 🔥 METRICS
  const totalAssignments =
    assignments.length;



  const totalGrades =
    grades.length;



  const totalStudents =
    students.length;




  // 🔥 PENDING SUBMISSIONS
  const pendingAssignments =
    assignments.filter(

      assignment =>

        Number(
          assignment.assigned_students || 0
        ) >

        Number(
          assignment.submissions_count || 0
        )
    );




  // 🔥 RISK STUDENTS
  const riskStudents =
    students.filter(

      student =>

        student?.metrics?.risk === "high"
    );




  if (loading) {

    return (

      <div className="
        p-10
        text-gray-400
      ">
        Loading teacher workspace...
      </div>
    );
  }




  return (

    <div className="
      p-6
      space-y-8
    ">

      {/* 🔥 HEADER */}
      <div>

        <h1 className="
          text-4xl
          font-black
          text-white
        ">
          👨‍🏫 Teacher Workspace
        </h1>

        <p className="
          text-gray-400
          mt-2
        ">
          Classroom intelligence center
        </p>

      </div>





      {/* 🔥 STATS */}
      <TeacherStatsCards

        assignmentsCount={
          totalAssignments
        }

        gradesCount={
          totalGrades
        }

        studentsCount={
          totalStudents
        }

        pendingCount={
          pendingAssignments.length
        }

      />






      {/* 🔥 MAIN GRID */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">

        {/* 🔥 LEFT */}
        <div className="
          xl:col-span-2
          space-y-6
        ">

          <PendingSubmissionsCard
            assignments={pendingAssignments}
          />



          <TeacherActivityFeed
            assignments={assignments}
            grades={grades}
          />

        </div>





        {/* 🔥 RIGHT */}
        <div className="
          space-y-6
        ">

          <StudentRiskCard
            students={riskStudents}
          />

        </div>

      </div>

    </div>
  );
}