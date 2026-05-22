export const calculateStudentRisk = (average) => {

  if (average < 6) {
    return {
      level: "HIGH",
      message: "Alumno en riesgo",
    };
  }

  if (average < 8) {
    return {
      level: "MEDIUM",
      message: "Alumno requiere atención",
    };
  }

  return {
    level: "LOW",
    message: "Alumno excelente",
  };
};