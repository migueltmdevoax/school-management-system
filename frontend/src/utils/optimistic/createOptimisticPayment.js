export const createOptimisticPayment =
({

  studentId,

  amount,

}) => {

  return {

    id:
      `temp-${Date.now()}`,

    student_id:
      studentId,

    amount,

    status:
      "PENDING",

    created_at:
      new Date().toISOString(),

    optimistic:
      true,

  };

};