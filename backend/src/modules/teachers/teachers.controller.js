import teacherService
  from "./teachers.service.js";

const getAllTeachers = async (
  req,
  res
) => {

  try {

    const teachers =
      await teacherService
        .getAllTeachers();

    return res.status(200).json({
      success: true,
      data: teachers
    });

  } catch (error) {

    console.error(
      "GET TEACHERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching teachers"
    });

  }

};

const getTeacherById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const teacher =
      await teacherService
        .getTeacherById(id);

    if (!teacher) {

      return res.status(404).json({
        success: false,
        message:
          "Teacher not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    console.error(
      "GET TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching teacher"
    });

  }

};

const createTeacher = async (
  req,
  res
) => {

  try {

    const teacher =
      await teacherService
        .createTeacher(req.body);

    req.io?.emit(
      "teacher:created",
      teacher
    );

    return res.status(201).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    console.error(
      "CREATE TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error creating teacher"
    });

  }

};

const updateTeacher = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const teacher =
      await teacherService
        .updateTeacher(
          id,
          req.body
        );

    req.io?.emit(
      "teacher:updated",
      teacher
    );

    return res.status(200).json({
      success: true,
      data: teacher
    });

  } catch (error) {

    console.error(
      "UPDATE TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error updating teacher"
    });

  }

};

const deleteTeacher = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const deletedTeacher =
      await teacherService
        .deleteTeacher(id);

    req.io?.emit(
      "teacher:deleted",
      deletedTeacher
    );

    return res.status(200).json({
      success: true,
      data: deletedTeacher
    });

  } catch (error) {

    console.error(
      "DELETE TEACHER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error deleting teacher"
    });

  }

};

export default {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};