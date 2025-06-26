import { Navigate, Outlet } from "react-router-dom";

export default function DoctorRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "Doctor"
    ? <Outlet />
    : <Navigate to="/" replace />;
}
