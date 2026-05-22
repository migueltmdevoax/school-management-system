import { useAppSelector } from "../../../hooks/useAppSelector";

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    role: auth.role,
    isAuthenticated: auth.isAuthenticated,
  };
};