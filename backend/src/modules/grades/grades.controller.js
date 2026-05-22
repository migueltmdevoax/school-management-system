import * as gradesService from "./grades.service.js";

import { calculateStudentRisk }
from "../risk/risk.service.js";

import {
  emitStudentRiskUpdated,
  emitStudentMetricsUpdated
} from "../../realtime/emitters.js";



// 🟣 CREATE GRADE
export const createGrade = async (req, res) => {

  try {

    console.log("🟣 createGrade controller reached");

    const {
      assignment_student_id,
      grade,
      feedback
    } = req.body;



    // 🛡️ VALIDATIONS
    if (!assignment_student_id || grade === undefined) {

      return res.status(400).json({
        error: "Missing data"
      });
    }

    if (grade < 0 || grade > 100) {

      return res.status(400).json({
        error: "Invalid grade range"
      });
    }



    // 💾 SAVE GRADE
    const result =
      await gradesService.create({
        assignment_student_id,
        grade,
        feedback
      });

    console.log("✅ grade created", result);



    // 🧠 TEMPORAL AVERAGE
    // luego será real desde DB
    const average = Number(grade);



    // 🚨 CALCULATE RISK
    const risk =
      calculateStudentRisk(average);

    console.log("🚨 calculated risk", risk);



    // 💥 REALTIME RISK EVENT
    emitStudentRiskUpdated({
      studentId: result.studentId,
      parentId: result.parentId || null,
      average,
      risk,
    });



    // 🔥 CENTRAL METRICS UPDATE
    await emitStudentMetricsUpdated(
      result.studentId
    );

    console.log("🔥 metrics updated emitted");



    res.status(201).json(result);

  } catch (error) {

    console.error("❌ ERROR:", error);

    if (error.code === "23505") {

      return res.status(400).json({
        error: "Grade already exists"
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};



// 🟣 GET ALL GRADES
export const getAllGrades = async (req, res) => {

  try {

    const user = req.user;

let grades;

// 🔥 ADMIN
if (user.role === "admin") {

  grades =
    await gradesService.getAll();
}


// 🔥 TEACHER
else if (
  user.role === "teacher"
) {

  grades =
    await gradesService
      .getByTeacherId(
        user.teacher_id
      );
}


// 🔥 PARENT
else if (
  user.role === "parent"
) {

  grades =
    await gradesService
      .getByParentId(
        user.parent_id
      );
}

res.json(grades);

    res.json(grades);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};



// 🟣 GET BY ASSIGNMENT STUDENT
export const getGradesByAssignmentStudent =
async (req, res) => {

  try {

    const result =
      await gradesService.getByAssignmentStudent(
        req.params.assignment_student_id
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};