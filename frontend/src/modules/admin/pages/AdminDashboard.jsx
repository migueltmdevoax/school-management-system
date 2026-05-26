import {
  useMemo,
} from "react";

import {
  useGetStudentsQuery,
} from "../../../features/students/studentsApi";

import {
  useGetTeachersQuery,
} from "../../../features/teachers/api/teachersApi";

import {
  useGetAssignmentsQuery,
} from "../../../features/assignments/api/assignmentsApi";

import {
  useGetGradesQuery,
} from "../../../features/grades/api/gradesApi";



export default function AdminDashboard() {

  // 🔥 STUDENTS
  const {
    data: studentsResponse,
    isLoading: studentsLoading,
  } = useGetStudentsQuery();




  // 🔥 TEACHERS
  const {
    data: teachersResponse,
    isLoading: teachersLoading,
  } = useGetTeachersQuery();




  // 🔥 ASSIGNMENTS
  const {
    data: assignmentsResponse,
    isLoading: assignmentsLoading,
  } = useGetAssignmentsQuery();




  // 🔥 GRADES
  const {
    data: gradesResponse,
    isLoading: gradesLoading,
  } = useGetGradesQuery();




  // 🔥 SAFE DATA
  const students =
    studentsResponse?.data || [];

  const teachers =
    teachersResponse?.data || [];

  const assignments =
    assignmentsResponse?.data || [];

  const grades =
    gradesResponse?.data || [];




  // 🔥 LOADING
  const isLoading =
    studentsLoading ||
    teachersLoading ||
    assignmentsLoading ||
    gradesLoading;




  // 🔥 KPI ENGINE
  const metrics =
    useMemo(() => {

      const totalStudents =
        students.length;

      const totalTeachers =
        teachers.length;

      const totalAssignments =
        assignments.length;

      const totalGrades =
        grades.length;




      // 🔥 GROUP AVERAGE
      const groupAverage =
        totalGrades > 0

          ? (
              grades.reduce(
                (acc, grade) =>
                  acc + Number(grade.grade || 0),
                0
              ) / totalGrades
            ).toFixed(1)

          : "0.0";





      // 🔥 RISK STUDENTS
      const riskStudents =
        students.filter((student) => {

          const studentGrades =
            grades.filter(
              (g) =>
                String(g.student_id) ===
                String(student.id)
            );

          if (
            studentGrades.length === 0
          ) {
            return true;
          }

          const average =
            studentGrades.reduce(
              (acc, g) =>
                acc + Number(g.grade || 0),
              0
            ) / studentGrades.length;

          return average < 7;

        }).length;





      return {

        totalStudents,

        totalTeachers,

        totalAssignments,

        totalGrades,

        groupAverage,

        riskStudents,

      };

    }, [
      students,
      teachers,
      assignments,
      grades,
    ]);





  // 🔥 LOADING UI
  if (isLoading) {

    return (

      <div className="
        p-10
        text-white
      ">
        Loading dashboard...
      </div>

    );

  }






  return (

    <div className="
      p-6
      space-y-6
    ">

      {/* 🔥 HEADER */}
      <div>

        <h1 className="
          text-4xl
          font-black
          text-white
        ">
          🧠 Admin Dashboard
        </h1>

        <p className="
          text-gray-400
          mt-2
        ">
          Enterprise Academic Operations Center
        </p>

      </div>






      {/* 🔥 KPI GRID */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
      ">

        <KpiCard
          title="Students"
          value={metrics.totalStudents}
          icon="🎓"
        />



        <KpiCard
          title="Teachers"
          value={metrics.totalTeachers}
          icon="👨‍🏫"
        />



        <KpiCard
          title="Assignments"
          value={metrics.totalAssignments}
          icon="📚"
        />



        <KpiCard
          title="Grades"
          value={metrics.totalGrades}
          icon="📝"
        />



        <KpiCard
          title="Group Average"
          value={metrics.groupAverage}
          icon="📈"
        />



        <KpiCard
          title="At Risk"
          value={metrics.riskStudents}
          icon="🚨"
          danger
        />

      </div>







      {/* 🔥 QUICK INSIGHTS */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        {/* 🔥 RECENT STUDENTS */}
        <div className="
          bg-gray-900
          border
          border-gray-800
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-6
          ">

            <h2 className="
              text-2xl
              font-bold
              text-white
            ">
              🎓 Recent Students
            </h2>

          </div>





          <div className="
            space-y-3
          ">

            {students
              .slice(0, 5)
              .map((student) => (

                <div
                  key={student.id}
                  className="
                    bg-gray-800
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <h3 className="
                      text-white
                      font-semibold
                    ">
                      {student.name}
                    </h3>

                    <p className="
                      text-gray-400
                      text-sm
                    ">
                      ID: {student.id}
                    </p>

                  </div>





                  <div className="
                    text-sm
                    text-blue-400
                  ">
                    Active
                  </div>

                </div>

              ))}

          </div>

        </div>








        {/* 🔥 RECENT ASSIGNMENTS */}
        <div className="
          bg-gray-900
          border
          border-gray-800
          rounded-3xl
          p-6
        ">

          <div className="
            flex
            items-center
            justify-between
            mb-6
          ">

            <h2 className="
              text-2xl
              font-bold
              text-white
            ">
              📚 Recent Assignments
            </h2>

          </div>






          <div className="
            space-y-3
          ">

            {assignments
              .slice(0, 5)
              .map((assignment) => (

                <div
                  key={assignment.id}
                  className="
                    bg-gray-800
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <h3 className="
                      text-white
                      font-semibold
                    ">
                      {assignment.title}
                    </h3>

                    <p className="
                      text-gray-400
                      text-sm
                    ">
                      Due:
                      {" "}
                      {assignment.due_date || "N/A"}
                    </p>

                  </div>






                  <div className="
                    text-sm
                    text-purple-400
                  ">
                    Published
                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>

  );

}






function KpiCard({

  title,

  value,

  icon,

  danger,

}) {

  return (

    <div className={`
      bg-gray-900
      border
      ${
        danger
          ? "border-red-500/30"
          : "border-gray-800"
      }
      rounded-3xl
      p-6
      shadow-xl
    `}>

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-gray-400
            text-sm
          ">
            {title}
          </p>

          <h2 className="
            text-4xl
            font-black
            text-white
            mt-2
          ">
            {value}
          </h2>

        </div>





        <div className="
          text-4xl
        ">
          {icon}
        </div>

      </div>

    </div>

  );

}