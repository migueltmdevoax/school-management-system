import {
  useMemo,
} from "react";

export default function
useStudentFilters({

  students,

  filter,

}) {

  return useMemo(() => {

    switch (filter) {

      case "risk":

        return students.filter(
          (student) =>

            student.metrics
              ?.risk === "high"
        );





      case "payments":

        return students.filter(
          (student) =>

            student.metrics
              ?.pendingPayments > 0
        );





      case "excellent":

        return students.filter(
          (student) =>

            student.metrics
              ?.average >= 90
        );





      default:

        return students;

    }

  }, [

    students,

    filter,

  ]);

}