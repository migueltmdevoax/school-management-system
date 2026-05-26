// 🔥 StudentForm.jsx

import {
  useEffect,
  useState
} from "react";

export default function StudentForm({
  initialData,
  onSubmit,
  isLoading,
}) {

  const [formData, setFormData] =
    useState({

      first_name: "",

      last_name: "",

      email: "",

      age: "",

      phone: "",

      address: "",

      tutor_name: "",

      tutor_phone: "",

    });




  // 🔥 EDIT MODE
  useEffect(() => {

    if (initialData) {

      setFormData({

        first_name:
          initialData.first_name || "",

        last_name:
          initialData.last_name || "",

        email:
          initialData.email || "",

        age:
          initialData.age || "",

        phone:
          initialData.phone || "",

        address:
          initialData.address || "",

        tutor_name:
          initialData.tutor_name || "",

        tutor_phone:
          initialData.tutor_phone || "",

      });

    }

  }, [initialData]);




  // 🔥 INPUTS
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));
  };




  // 🔥 SUBMIT
  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit?.(formData);
  };




  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* 🔥 GRID */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <Input
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <Input
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

      </div>




      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />




      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        <Input
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

      </div>




      <div>

        <label className="
          text-sm
          text-gray-400
          mb-2
          block
        ">
          Address
        </label>

        <textarea
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
          className="
            w-full
            bg-gray-900
            border
            border-gray-800
            rounded-2xl
            p-4
            text-white
            outline-none
            focus:border-blue-500
            transition-all
          "
        />

      </div>




      {/* 🔥 TUTOR */}
      <div className="
        border
        border-gray-800
        rounded-3xl
        p-5
        space-y-4
        bg-gray-900/50
      ">

        <h3 className="
          text-white
          font-bold
          text-lg
        ">
          👨‍👩‍👧 Tutor Information
        </h3>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        ">

          <Input
            label="Tutor Name"
            name="tutor_name"
            value={formData.tutor_name}
            onChange={handleChange}
          />

          <Input
            label="Tutor Phone"
            name="tutor_phone"
            value={formData.tutor_phone}
            onChange={handleChange}
          />

        </div>

      </div>




      {/* 🔥 ACTION */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          disabled:cursor-not-allowed
          text-white
          py-4
          rounded-2xl
          font-black
          transition-all
        "
      >

        {isLoading
          ? "Saving..."
          : initialData
            ? "💾 Update Student"
            : "🚀 Create Student"}

      </button>

    </form>

  );
}




function Input({
  label,
  ...props
}) {

  return (

    <div>

      <label className="
        text-sm
        text-gray-400
        mb-2
        block
      ">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          bg-gray-900
          border
          border-gray-800
          rounded-2xl
          p-4
          text-white
          outline-none
          focus:border-blue-500
          transition-all
        "
      />

    </div>

  );
}