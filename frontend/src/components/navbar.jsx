// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // assuming doctor info stored here

  const handleLogout = () => {
    localStorage.removeItem("etoken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 17) return "Good Afternoon";
    else return "Good Evening";
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="text-xl font-bold">ClinicCare</div>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {getGreeting()},{" "}
          <span className="font-semibold"> {user?.username || "User"}</span>
        </span>
        <div className="flex gap-4 items-center">
          {/* Other nav links */}

          {user?.role === "Doctor" && (
            <div
              className="cursor-pointer bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
              onClick={() => navigate("/dashboard/doctor/add-receptionist")}
            >
              +Add New Receptionist
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="cursor-pointer bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
