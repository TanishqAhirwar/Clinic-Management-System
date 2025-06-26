import { useNavigate } from "react-router-dom";
import axiosInstence from "../webservice/instance";
import { Urls } from "../webservice/allapis";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
  try {
    const resp = await axiosInstence().post(Urls.USER_LOGIN, credentials);
    const { status, message, data } = resp.data;
    console.log('Login response:', data);

    // In your API, data contains all properties including token and role
    const { token, role, ...userFields } = data;
    const user = { ...userFields, role }; // ensure role is present

    if (!status || !token || !user.role) {
      return toast.error(message || 'Invalid login response');
    }

    localStorage.setItem('etoken', token);
    localStorage.setItem('user', JSON.stringify(user));

    const routeBase = user.role.toLowerCase();
    navigate(`/dashboard/${routeBase}`);
    toast.success(message);
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login request failed');
  }
};


  return (
    <div className="min-h-screen flex bg-black items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Login
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
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
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: "user Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", { required: "password is required" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
