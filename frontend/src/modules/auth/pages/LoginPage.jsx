import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useLoginMutation,
} from "../../../features/auth/authApi";

import {
  connectSocket,
} from "../../../services/socket/socketClient";

export default function LoginPage() {

  const navigate =
    useNavigate();

  const [
    login,
    { isLoading },
  ] = useLoginMutation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");



  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setError("");

        const response =
          await login({
            email,
            password,
          }).unwrap();

        console.log(
          "LOGIN SUCCESS:",
          response
        );

        connectSocket();

        const user =
          response.user;

          console.log("ROLE:", user.role);

          console.log("NAVIGATING...");

        // 🔥 ROLE ROUTING
        if (
          user.role === "admin"
        ) {

          navigate(
            "/app/dashboard"
          );

        } else if (
          user.role === "teacher"
        ) {

          navigate(
            "/app/teacher/dashboard"
          );

        } else if (
          user.role === "parent"
        ) {

          navigate(
            "/parent"
          );

        } else {

          navigate("/");
        }

      } catch (err) {

        console.error(
          "LOGIN ERROR:",
          err
        );

        setError(
          err?.data?.message ||
          err?.message ||
          "Login failed"
        );
      }
    };



  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-950
      p-6
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-gray-900
          p-8
          rounded-2xl
          w-full
          max-w-md
          border
          border-gray-800
          shadow-2xl
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-white
          mb-6
        ">
          🔐 Login
        </h1>

        {error && (

          <div className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            p-3
            rounded-xl
            mb-4
          ">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            mb-4
            p-3
            rounded-xl
            bg-gray-800
            text-white
            outline-none
            border
            border-transparent
            focus:border-blue-500
          "
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            mb-6
            p-3
            rounded-xl
            bg-gray-800
            text-white
            outline-none
            border
            border-transparent
            focus:border-blue-500
          "
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-500
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            p-3
            rounded-xl
            font-semibold
            transition
          "
        >

          {isLoading
            ? "Loading..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}
