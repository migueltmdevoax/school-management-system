import * as studentsService
from "./students.service.js";




// 🟣 GET STUDENTS
export const getStudents =
async (req, res) => {

  try {

    const students =

      await studentsService
        .getAllStudents();




    return res.json(
      students
    );



  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        error.message,
    });
  }
};





// 🟣 CREATE STUDENT
export const createStudent =
async (req, res) => {

  try {

    const student =

      await studentsService.create(
        req.body
      );




    return res.status(201).json(
      student
    );



  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        error.message,
    });
  }
};





// 🟣 UPDATE STUDENT
export const updateStudent =
async (req, res) => {

  try {

    const updatedStudent =

      await studentsService.update(

        req.params.id,

        req.body
      );




    return res.json(
      updatedStudent
    );



  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        error.message,
    });
  }
};





// 🟣 DELETE STUDENT
export const deleteStudent =
async (req, res) => {

  try {

    const {

      id,

    } = req.params;




    await studentsService.remove(
      id
    );




    return res.json({

      message:
        "Student deleted",
    });



  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        error.message,
    });
  }
};