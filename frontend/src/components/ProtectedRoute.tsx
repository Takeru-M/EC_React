import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../redux';

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.user.data);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
