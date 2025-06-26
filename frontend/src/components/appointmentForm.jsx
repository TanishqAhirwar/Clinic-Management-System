import { useEffect, useState } from "react";
import { Urls } from "../webservice/allapis";
import axiosInstence from "../webservice/instance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function AppointmentForm() {
  const [patients, setPatients] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (obj) => {
    try {
      console.log("Submitting:", obj);
      const { data } = await axiosInstence().post(Urls.BOOK_APPOINTMENT, obj);

      if (!data.status) return toast.error(data.message);

      toast.success(data.message);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstence().get(Urls.GET_ALL_PATIENTS);
        if (data.status) setPatients(data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch patients");
      }
    })();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(Submit)}
      className="bg-white shadow rounded-lg p-6 w-full max-w-lg mt-5"
    >
      {/* Patient */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Patient
        </label>
        <select
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
          {...register("patient", { required: "Patient is required" })}
        >
          <option value="">Choose a patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.patient && <p className="text-red-600 text-sm mt-1">{errors.patient.message}</p>}
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Appointment Date
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
      </div>

      {/* Time */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Appointment Time
        </label>
        <input
          type="time"
          className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
          {...register("time", { required: "Time is required" })}
        />
        {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>}
      </div>

      <button
        type="submit"
        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Book
      </button>
    </form>
  );
}
