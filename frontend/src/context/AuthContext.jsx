import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";

import {
  loginUser,
} from "../services/auth.service";



// 🔥 CONTEXT
const AuthContext =
  createContext(null);



// 🔥 STORAGE KEYS
const TOKEN_KEY =
  "school_token";

const USER_KEY =
  "school_user";



// 🔥 PROVIDER
export function AuthProvider({
  children,
}) {

  // 🟣 STATE
  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);



  // =====================================================
  // 🔥 RESTORE SESSION
  // =====================================================

  useEffect(() => {

    const restoreSession =
      async () => {

        try {

          const storedToken =
            localStorage.getItem(
              TOKEN_KEY
            );

          const storedUser =
            localStorage.getItem(
              USER_KEY
            );



          // ❌ NO SESSION
          if (
            !storedToken ||
            !storedUser
          ) {

            setLoading(false);
            return;
          }



          // ✅ PARSE USER
          const parsedUser =
            JSON.parse(
              storedUser
            );



          // ✅ RESTORE
          setToken(
            storedToken
          );

          setUser(
            parsedUser
          );

        } catch (error) {

          console.error(
            "❌ Restore session error:",
            error
          );

          // 🧹 CLEAN CORRUPTED SESSION
          localStorage.removeItem(
            TOKEN_KEY
          );

          localStorage.removeItem(
            USER_KEY
          );

          setUser(null);
          setToken(null);

        } finally {

          setLoading(false);
        }
      };



    restoreSession();

  }, []);





  // =====================================================
  // 🔥 LOGIN
  // =====================================================

  const login =
    useCallback(
      async ({
        email,
        password,
      }) => {

        try {

          const data =
            await loginUser({
              email,
              password,
            });



          // ✅ SAVE STATE
          setToken(
            data.token
          );

          setUser(
            data.user
          );



          // ✅ SAVE STORAGE
          localStorage.setItem(
            TOKEN_KEY,
            data.token
          );

          localStorage.setItem(
            USER_KEY,
            JSON.stringify(
              data.user
            )
          );



          return {
            success: true,
            user: data.user,
          };

        } catch (error) {

          console.error(
            "❌ Login error:",
            error
          );

          return {
            success: false,
            error:
              error.message ||
              "Login failed",
          };
        }
      },
      []
    );





  // =====================================================
  // 🔥 LOGOUT
  // =====================================================

  const logout =
    useCallback(() => {

      // 🧹 CLEAR STATE
      setUser(null);

      setToken(null);



      // 🧹 CLEAR STORAGE
      localStorage.removeItem(
        TOKEN_KEY
      );

      localStorage.removeItem(
        USER_KEY
      );

    }, []);





  // =====================================================
  // 🔥 ROLE HELPERS
  // =====================================================

  const isAdmin =
    user?.role === "admin";

  const isTeacher =
    user?.role === "teacher";

  const isParent =
    user?.role === "parent";



  // =====================================================
  // 🔥 AUTH STATUS
  // =====================================================

  const isAuthenticated =
    Boolean(token);





  // =====================================================
  // 🔥 CONTEXT VALUE
  // =====================================================

  const value = useMemo(
    () => ({

      // state
      user,
      token,
      loading,

      // auth
      login,
      logout,

      // status
      isAuthenticated,

      // roles
      isAdmin,
      isTeacher,
      isParent,

    }),

    [
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin,
      isTeacher,
      isParent,
    ]
  );





  // =====================================================
  // 🔥 LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-950
        text-white
      ">

        <div className="text-center">

          <div className="
            w-12
            h-12
            border-4
            border-blue-500
            border-t-transparent
            rounded-full
            animate-spin
            mx-auto
            mb-4
          " />

          <p className="text-gray-400">
            Restoring session...
          </p>

        </div>

      </div>
    );
  }





  // =====================================================
  // 🔥 PROVIDER
  // =====================================================

  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>
  );
}





// =====================================================
// 🔥 HOOK
// =====================================================

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}