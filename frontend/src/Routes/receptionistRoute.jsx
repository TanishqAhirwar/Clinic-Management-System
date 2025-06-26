import { Navigate, Outlet } from "react-router-dom";

export default function ReceptionistRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "Receptionist"
    ? <Outlet />
    : <Navigate to="/" replace />;
}
