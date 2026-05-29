import {
  useMemo,
} from "react";

export default function useGlobalSearch({

  query,

  students = [],

}) {

  return useMemo(() => {

    if (!query)
      return [];





    const lower =
      query.toLowerCase();





    return students.filter(
      (student) =>

        student.first_name
          ?.toLowerCase()
          .includes(lower)

        ||

        student.last_name
          ?.toLowerCase()
          .includes(lower)

        ||

        student.email
          ?.toLowerCase()
          .includes(lower)
    );

  }, [

    query,

    students,

  ]);

}