import * as assignmentsService
from "./assignments.service.js";



// 🔥 GET ALL
export const getAssignments =
async (req, res) => {

  try {

    const assignments =
      await assignmentsService
        .getAllAssignments();

    return res.status(200).json({

      success: true,

      message:
        "Assignments fetched successfully",

      data: assignments

    });

  } catch (error) {

    console.error(
      "❌ getAssignments error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch assignments"

    });
  }
};



// 🔥 GET ONE
export const getAssignmentById =
async (req, res) => {

  try {

    const { id } = req.params;

    const assignment =
      await assignmentsService
        .getAssignmentById(id);

    if (!assignment) {

      return res.status(404).json({

        success: false,

        message:
          "Assignment not found"

      });
    }

    return res.status(200).json({

      success: true,

      data: assignment

    });

  } catch (error) {

    console.error(
      "❌ getAssignmentById error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch assignment"

    });
  }
};



// 🔥 CREATE
export const createAssignment =
async (req, res) => {

  try {

    const {

      title,
      description,
      group_id,
      teacher_id,
      due_date,
      attachment_url,
      attachment_type,
      max_score,
      allow_comments,
      published

    } = req.body;




    // 🔥 BASIC VALIDATION
    if (
      !title ||
      !group_id ||
      !teacher_id
    ) {

      return res.status(400).json({

        success: false,

        message:
          "title, group_id and teacher_id are required"

      });
    }




    const assignment =
      await assignmentsService
        .createAssignment({

          title,
          description,
          group_id,
          teacher_id,
          due_date,
          attachment_url,
          attachment_type,
          max_score,
          allow_comments,
          published

        });




    return res.status(201).json({

      success: true,

      message:
        "Assignment created successfully",

      data: assignment

    });

  } catch (error) {

    console.error(
      "❌ createAssignment error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to create assignment"

    });
  }
};



// 🔥 UPDATE
export const updateAssignment =
async (req, res) => {

  try {

    const { id } = req.params;

    const updatedAssignment =
      await assignmentsService
        .updateAssignment(
          id,
          req.body
        );

    if (!updatedAssignment) {

      return res.status(404).json({

        success: false,

        message:
          "Assignment not found"

      });
    }

    return res.status(200).json({

      success: true,

      message:
        "Assignment updated successfully",

      data: updatedAssignment

    });

  } catch (error) {

    console.error(
      "❌ updateAssignment error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to update assignment"

    });
  }
};



// 🔥 DELETE
export const deleteAssignment =
async (req, res) => {

  try {

    const { id } = req.params;

    const deletedAssignment =
      await assignmentsService
        .deleteAssignment(id);

    if (!deletedAssignment) {

      return res.status(404).json({

        success: false,

        message:
          "Assignment not found"

      });
    }

    return res.status(200).json({

      success: true,

      message:
        "Assignment deleted successfully",

      data: deletedAssignment

    });

  } catch (error) {

    console.error(
      "❌ deleteAssignment error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to delete assignment"

    });
  }
};



// 🔥 CREATE SUBMISSION
export const createSubmission =
async (req, res) => {

  try {

    const {

      assignment_id,
      student_id,
      submission_text,
      attachment_url,
      attachment_type

    } = req.body;




    if (
      !assignment_id ||
      !student_id
    ) {

      return res.status(400).json({

        success: false,

        message:
          "assignment_id and student_id are required"

      });
    }




    const submission =
      await assignmentsService
        .createSubmission({

          assignment_id,
          student_id,
          submission_text,
          attachment_url,
          attachment_type

        });




    return res.status(201).json({

      success: true,

      message:
        "Submission created successfully",

      data: submission

    });

  } catch (error) {

    console.error(
      "❌ createSubmission error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to create submission"

    });
  }
};



// 🔥 GRADE SUBMISSION
export const gradeSubmission =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      grade,
      feedback
    } = req.body;




    const gradedSubmission =
      await assignmentsService
        .gradeSubmission(

          id,

          {
            grade,
            feedback
          }

        );




    if (!gradedSubmission) {

      return res.status(404).json({

        success: false,

        message:
          "Submission not found"

      });
    }




    return res.status(200).json({

      success: true,

      message:
        "Submission graded successfully",

      data: gradedSubmission

    });

  } catch (error) {

    console.error(
      "❌ gradeSubmission error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to grade submission"

    });
  }
};