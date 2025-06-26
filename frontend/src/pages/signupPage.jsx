import { useForm } from "react-hook-form";
import axiosInstence from "../webservice/instance";
import { Urls } from "../webservice/allapis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/navbar";

export default function SignupPage() {
  const [clinics, setClinics] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (obj) => {
    // Add New Receptionist
    try {
      let { data } = await axiosInstence().post(Urls.ADD_RECEPTIONIST, obj);

      if (!data.status) {
        return toast.error(data.message);
      }

      toast.success(data.message);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstence().get(Urls.GET_ALL_CLINICS);
        if (data.status) setClinics(data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch patients");
      }
    })();
  }, []);

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex bg-black items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
            Add New Receptionist
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit(Submit)}>
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-black mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("username", { required: "username is required" })}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("email", { required: "email is required" })}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("password", { required: "password is required" })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Choose Clinic
              </label>
              <select
                name="clinic"
                className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200 cursor-pointer"
                {...register("clinic", { required: "clinic is required" })}
              >
                <option value="">Select Clinic</option>
                {clinics.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
