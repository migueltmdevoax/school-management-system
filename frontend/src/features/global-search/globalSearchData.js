export const globalSearchData = (

  students = [],

) => [

  ...students.map(
    (student) => ({

      id:
        `student-${student.id}`,

      type:
        "student",

      title:
        `${student.first_name} ${student.last_name}`,

      subtitle:
        student.email,

      path:
        "/app/students",

      icon:
        "👨‍🎓",

    })
  ),

];