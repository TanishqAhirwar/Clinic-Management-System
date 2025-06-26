import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const raw = localStorage.getItem("user");
  let user = null;
  console.log("User from localStorage:", raw);


  try {
    user = raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Invalid user data in localStorage:", err);
    localStorage.removeItem("user");  // clean up bad entry
  }

  return user
    ? <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />
    : <Outlet />;
}
