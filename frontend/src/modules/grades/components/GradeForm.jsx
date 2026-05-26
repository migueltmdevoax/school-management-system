import {
  useEffect,
  useState
} from "react";

import Button
from "../../../components/ui/Button";



export default function GradeForm({

  onSubmit,
  selectedGrade,

}) {

  const [form, setForm] =
    useState({

      student_id: "",
      assignment_title: "",
      grade: "",

    });




  useEffect(() => {

    if (selectedGrade) {

      setForm({

        student_id:
          selectedGrade.student_id || "",

        assignment_title:
          selectedGrade.assignment_title || "",

        grade:
          selectedGrade.grade || "",

      });
    }

  }, [selectedGrade]);




  const handleChange =
    (e) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value,

      });
    };




  const handleSubmit =
    (e) => {

      e.preventDefault();

      onSubmit({

        ...form,

        grade:
          Number(form.grade),

      });

      setForm({

        student_id: "",
        assignment_title: "",
        grade: "",

      });
    };




  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-gray-900
        border
        border-gray-800
        rounded-2xl
        p-5
        space-y-4
      "
    >

      <input
        type="text"
        name="student_id"
        placeholder="Student ID"
        value={form.student_id}
        onChange={handleChange}
        className="
          w-full
          bg-gray-800
          rounded-xl
          p-3
          text-white
        "
      />



      <input
        type="text"
        name="assignment_title"
        placeholder="Assignment"
        value={form.assignment_title}
        onChange={handleChange}
        className="
          w-full
          bg-gray-800
          rounded-xl
          p-3
          text-white
        "
      />



      <input
        type="number"
        name="grade"
        placeholder="Grade"
        value={form.grade}
        onChange={handleChange}
        className="
          w-full
          bg-gray-800
          rounded-xl
          p-3
          text-white
        "
      />



      <Button
        variant="primary"
        type="submit"
      >

        {selectedGrade
          ? "Update Grade"
          : "Create Grade"}

      </Button>

    </form>
  );
}