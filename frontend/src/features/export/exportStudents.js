import {
  convertToCSV,
} from "./csvExport";

import {
  downloadFile,
} from "./downloadFile";

export const exportStudents =
(students = []) => {

  const formatted =
    students.map(

      (student) => ({

        first_name:
          student.first_name,

        last_name:
          student.last_name,

        email:
          student.email,

      })

    );




  const csv =
    convertToCSV(
      formatted
    );




  downloadFile({

    filename:
      "students.csv",

    content:
      csv,

  });

};