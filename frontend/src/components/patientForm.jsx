import { useForm } from "react-hook-form";
import { Urls } from "../webservice/allapis";
import axiosInstence from "../webservice/instance";
import { toast } from "react-toastify";

export default function patientForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (obj) => {
    // Add New Patient

    try {
      console.log(obj);
      let { data } = await axiosInstence().post(Urls.ADD_PATIENT, obj);

      if (!data.status) {
        return toast.error(data.message);
      }

      toast.success(data.message);
      reset()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="bg-white shadow rounded-lg p-6 w-full max-w-lg mt-5"
        onSubmit={handleSubmit(Submit)}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
            {...register("name", { required: "name is Required" })}
          />
          {errors.name && (
            <p className="text-red-500">{errors?.name?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
            {...register("age", { required: "age is Required" })}
          />
          {errors.age && <p className="text-red-500">{errors?.age?.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200 cursor-pointer"
            {...register("gender", { required: "gender is Required" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
            {...register("phone", { required: "phone number is Required" })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors?.phone?.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Diagnose (optional)
          </label>
          <input
            type="text"
            name="diagnose"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
            {...register("diagnose")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Any Medical History (optional)
          </label>
          <input
            type="text"
            name="medicalhistory"
            className="w-full px-3 py-2 border rounded outline-none focus:ring focus:ring-blue-200"
            {...register("medicalhistory")}
          />
        </div>

        <button
          type="submit"
          className=" cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </>
  );
}
