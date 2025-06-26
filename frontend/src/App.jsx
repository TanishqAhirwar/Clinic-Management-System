import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DoctorDashboard from "./pages/doctorDashboard";
import ReceptionistDashboard from "./pages/receptionistDashboard";
import DoctorRoute from "./Routes/doctorRoute";
import ReceptionistRoute from "./Routes/receptionistRoute";
import PublicRoute from "./Routes/publicRoute";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/signupPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<LoginPage />} />
        </Route>

        {/* Doctor-only protected */}
        <Route path="/dashboard/doctor" element={<DoctorRoute />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="add-receptionist" element={<SignupPage />} />
        </Route>

        {/* Receptionist-only protected */}
        <Route path="/dashboard/receptionist" element={<ReceptionistRoute />}>
          <Route index element={<ReceptionistDashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
