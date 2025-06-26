import { useEffect, useState } from "react";
import PatientTable from "../components/patientTable";
import PatientForm from "../components/patientForm";
import AppointmentForm from "../components/appointmentForm";
import Navbar from "../components/navbar";
import axiosInstence from "../webservice/instance";
import { Urls } from "../webservice/allapis";

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [myPatients, setmyPatients] = useState("register");

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axiosInstence().get(Urls.GET_MY_PATIENTS);
        if (data.status) {
          const sortedPatients = [...data.data].reverse();
          setmyPatients(sortedPatients);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold  bg-blue-700 text-white h-[80px] flex justify-center items-center">
        Dashboard
      </h1>

      <div className="flex justify-center items-center px-6 border-b border-gray-200 bg-white transition-all rounded-md">
        {["register", "book", "patients"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer relative py-2 px-4 text-lg
        ${
          activeTab === tab
            ? "text-blue-600 border-b-2 border-blue-600 bg-gray-100 h-15"
            : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 h-15"
        }`}
          >
            {tab === "register" && "Register Patient"}
            {tab === "book" && "Book Appointment"}
            {tab === "patients" && "My Patients"}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "register" && (
          <div className="mt-5 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Add New Patient</h2>

            <PatientForm />
          </div>
        )}

        {activeTab === "book" && (
          <div className="mt-5 flex flex-col items-center">
            <h2 className="text-2xl font-semibold ">Book New Appointment</h2>
            <AppointmentForm />
          </div>
        )}

        {activeTab === "patients" && (
          <div className="mt-5">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Patients List
            </h2>
            <PatientTable patients={myPatients} />
          </div>
        )}
      </div>
    </>
  );
};

export default ReceptionistDashboard;
