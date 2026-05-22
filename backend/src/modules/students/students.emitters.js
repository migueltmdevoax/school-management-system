import {

  emitToRole,

} from "../../realtime/emitters.js";



// 🟣 CREATED
export function emitStudentCreated(
  student
) {

  emitToRole(

    "admin",

    "student_created",

    student
  );



  emitToRole(

    "teacher",

    "student_created",

    student
  );
}





// 🟣 UPDATED
export function emitStudentUpdated(
  student
) {

  emitToRole(

    "admin",

    "student_updated",

    student
  );



  emitToRole(

    "teacher",

    "student_updated",

    student
  );
}





// 🟣 DELETED
export function emitStudentDeleted(
  studentId
) {

  emitToRole(

    "admin",

    "student_deleted",

    studentId
  );



  emitToRole(

    "teacher",

    "student_deleted",

    studentId
  );
}