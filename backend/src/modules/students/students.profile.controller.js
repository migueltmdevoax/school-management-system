import {
  getStudentMetrics
} from "./students.metrics.service.js";

export const getStudentProfile =
  async (req, res) => {

    try {

      const { studentId } =
        req.params;

      const data =
        await getStudentMetrics(
          studentId
        );

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      console.error(
        "GET STUDENT PROFILE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch student profile"
      });

    }

};