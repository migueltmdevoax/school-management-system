export const createOptimisticIncident =
({

  studentId,

  title,

  severity,

}) => {

  return {

    id:
      `temp-${Date.now()}`,

    student_id:
      studentId,

    title,

    severity,

    created_at:
      new Date().toISOString(),

    optimistic:
      true,

  };

};