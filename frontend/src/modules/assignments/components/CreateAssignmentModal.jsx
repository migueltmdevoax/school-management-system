
import {
  useEffect,
  useState,
} from "react";

import {
  useCreateAssignmentMutation,
} from "../../../features/assignments/api/assignmentsApi";

import {
  useGetGroupsQuery,
} from "../../../features/groups/groupsApi";

import {
  useAppSelector,
} from "../../../hooks/useAppSelector";

export default function CreateAssignmentModal({
  open,
  onClose,
}) {

  // 🔥 AUTH
  const { user } =
    useAppSelector(
      (state) => state.auth
    );



  // 🔥 RTK
  const [
    createAssignment,
    {
      isLoading,
    },
  ] =
    useCreateAssignmentMutation();



  // 🔥 GROUPS
  const {
    data: groupsResponse,
    isLoading: groupsLoading,
  } =
    useGetGroupsQuery();



  const groups =
    groupsResponse?.data || [];



  // 🔥 ERROR
  const [
    error,
    setError,
  ] = useState("");



  // 🔥 INITIAL STATE
  const initialForm =
    {
      title: "",
      description: "",
      due_date: "",
      max_score: 10,
      attachment_url: "",
      attachment_type: "PDF",
      published: false,
      allow_comments: true,
      group_id: "",
      teacher_id: "",
    };



  // 🔥 FORM
  const [
    formData,
    setFormData,
  ] =
    useState(initialForm);



  // 🔥 AUTO SET TEACHER
  useEffect(() => {

    if (user?.teacher_id) {

      setFormData((prev) => ({
        ...prev,
        teacher_id:
          user.id,
      }));
    }

  }, [user]);



  // 🔥 ESC CLOSE
  useEffect(() => {

    const handleEscape =
      (e) => {

        if (
          e.key === "Escape"
        ) {
          onClose();
        }
      };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };

  }, [onClose]);



  // 🔥 INPUT CHANGES
  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked,
      } = e.target;

      setFormData((prev) => ({
        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      }));
    };



  // 🔥 RESET
  const resetForm =
    () => {

      setFormData({
        ...initialForm,

        teacher_id:
          user?.id || "",
      });

      setError("");
    };



  // 🔥 SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setError("");



        // 🔥 VALIDATION
        if (
          !formData.title.trim()
        ) {

          setError(
            "Assignment title required"
          );

          return;
        }

        if (
          !formData.group_id
        ) {

          setError(
            "Select a group"
          );

          return;
        }



        const payload = {

          ...formData,

          title:
            formData.title.trim(),

          description:
            formData.description.trim(),

          max_score:
            Number(
              formData.max_score
            ),
        };



        console.log(
          "🚀 SENDING:",
          payload
        );



        await createAssignment(
          payload
        ).unwrap();



        resetForm();

        onClose();

      } catch (err) {

        console.error(
          "❌ CREATE ASSIGNMENT ERROR:",
          err
        );

        setError(
          err?.data?.message ||
          err?.message ||
          "Error creating assignment"
        );
      }
    };



  // 🔥 CLOSE IF NOT OPEN
  if (!open) {
    return null;
  }



  return (

    <div className="
      fixed
      inset-0
      bg-black/70
      z-50
      flex
      items-center
      justify-center
      p-6
      overflow-y-auto
    ">

      <div className="
        w-full
        max-w-3xl
        bg-gray-950
        border
        border-gray-800
        rounded-3xl
        p-8
      ">

        {/* 🔥 HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <div>

            <h2 className="
              text-3xl
              font-black
              text-white
            ">
              📚 Create Assignment
            </h2>

            <p className="
              text-gray-400
              mt-1
            ">
              Classroom enterprise workflow
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-2xl
              transition-all
            "
          >
            ✕
          </button>

        </div>



        {/* 🔥 ERROR */}
        {error && (

          <div className="
            mb-5
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            p-4
            rounded-2xl
          ">
            {error}
          </div>

        )}



        {/* 🔥 FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Assignment title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isLoading}
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
              disabled:opacity-50
            "
          />



          {/* DESCRIPTION */}
          <textarea
            name="description"
            rows="6"
            placeholder="Write assignment instructions..."
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
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
              disabled:opacity-50
            "
          />



          {/* GROUP */}
          <select
            name="group_id"
            value={formData.group_id}
            onChange={handleChange}
            required
            disabled={
              isLoading ||
              groupsLoading
            }
            className="
              w-full
              bg-gray-900
              border
              border-gray-800
              rounded-2xl
              p-4
              text-white
            "
          >

            <option value="">
              Select group
            </option>

            {groups.map((group) => (

              <option
                key={group.id}
                value={group.id}
              >
                {group.name}
              </option>

            ))}

          </select>



          {/* GRID */}
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          ">

            {/* DEADLINE */}
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              disabled={isLoading}
              className="
                bg-gray-900
                border
                border-gray-800
                rounded-2xl
                p-4
                text-white
              "
            />



            {/* SCORE */}
            <input
              type="number"
              name="max_score"
              min="1"
              max="100"
              value={formData.max_score}
              onChange={handleChange}
              disabled={isLoading}
              className="
                bg-gray-900
                border
                border-gray-800
                rounded-2xl
                p-4
                text-white
              "
            />

          </div>



          {/* ATTACHMENT */}
          <input
            type="text"
            name="attachment_url"
            placeholder="Attachment URL"
            value={formData.attachment_url}
            onChange={handleChange}
            disabled={isLoading}
            className="
              w-full
              bg-gray-900
              border
              border-gray-800
              rounded-2xl
              p-4
              text-white
            "
          />



          {/* CHECKBOXES */}
          <div className="
            flex
            flex-wrap
            gap-6
          ">

            <label className="
              flex
              items-center
              gap-2
              text-gray-300
            ">

              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />

              Publish now

            </label>



            <label className="
              flex
              items-center
              gap-2
              text-gray-300
            ">

              <input
                type="checkbox"
                name="allow_comments"
                checked={formData.allow_comments}
                onChange={handleChange}
              />

              Allow comments

            </label>

          </div>



          {/* ACTIONS */}
          <div className="
            flex
            justify-end
            gap-3
            pt-4
          ">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="
                px-5
                py-3
                rounded-2xl
                bg-gray-800
                hover:bg-gray-700
                text-white
                transition-all
              "
            >
              Cancel
            </button>



            <button
              type="submit"
              disabled={
                isLoading ||
                groupsLoading
              }
              className="
                px-6
                py-3
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                font-bold
                transition-all
              "
            >

              {isLoading
                ? "Creating..."
                : "🚀 Create Assignment"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
