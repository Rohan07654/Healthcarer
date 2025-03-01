import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ element }) => {
  const user = useAuthStore((state) => state.user);

  return user ? (
    user.firstName ? (
      element
    ) : (
      <Navigate to="/basic-details" replace />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
