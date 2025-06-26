import { useEffect, useState } from "react";
import { Urls } from "../webservice/allapis";
import PatientTable from "../components/patientTable";
import axiosInstence from "../webservice/instance";
import Clinic from "../components/clinic";
import Navbar from "../components/navbar";
import AppointmentTable from "../components/appointmentTable";

const DoctorDashboard = () => {
  const [allPatients, setallPatients] = useState([]);
  const [allClinics, setallClinics] = useState([]);
  const [selectedClinicName, setSelectedClinicName] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleClinicClick = async (clinic) => {
    try {
      setSelectedClinicName(clinic.name);

      // Fetch Patients by Clinic
      const patientsRes = await axiosInstence().get(
        `${Urls.GET_PATIENTS_BY_CLINIC}/${clinic._id}`
      );
      if (patientsRes.data.status) {
        const sortedPatients = [...patientsRes.data.data].reverse();
        setallPatients(sortedPatients);
      } else {
        setallPatients([]);
      }

      // Fetch Appointments by Clinic
      const appointmentsRes = await axiosInstence().get(
        `${Urls.GET_APPOINTMENTS_BY_CLINIC}/${clinic._id}`
      );
      if (appointmentsRes.data.status) {
        setAppointments(appointmentsRes.data.data); // make sure you have this state
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axiosInstence().get(Urls.GET_ALL_CLINICS);
        if (data.status) {
          setallClinics(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4  bg-blue-700 text-white h-[80px] flex justify-center items-center">
        Dashboard
      </h1>

      <Clinic
        clinics={allClinics}
        onClinicClick={handleClinicClick}
        selectedId={allClinics.find((c) => c.name === selectedClinicName)?._id}
      />

      <div className="grid grid-cols-2 gap-6 mt-5">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold">
            {selectedClinicName
              ? `Patients of ${selectedClinicName}`
              : "Select a clinic to view patients"}
          </h2>
          <PatientTable patients={allPatients} />
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Today's Appointments List</h2>
          <AppointmentTable
            appointments={appointments}
            setAppointments={setAppointments}
            
          />
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
