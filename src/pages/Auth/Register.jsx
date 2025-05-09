
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const language = "vn";
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Client-side validation: Check if passwords match
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://assistant.baopanel.com/api/auth/register",
        {
          age,
          gender,
          name,
          email,
          language,
          password,
          password_confirmation: passwordConfirmation,
        }
      );

      // Check if token is returned and store it in localStorage
      if (response) {
        console.log(response);
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("isLoggedIn", "true");
        console.log("Token stored:", response.data.data.token);
      } else {
        console.warn("No token returned from register API");
      }

      // Navigate to homepage on successful registration
      navigate("/");
    } catch (err) {
      // Handle errors (e.g., invalid email, password, or existing user)
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center max-w-3xl p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
        <div className="px-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-white">Register</h2>
          <p className="mt-4 text-sm text-white">
            You are not a member yet, register now.
          </p>

          {error && <p className="mt-4 text-sm text-red-200">{error}</p>}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              className="w-full p-2 mt-8 placeholder-gray-500 border rounded-xl"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="flex gap-4">
              <input
                className="p-2 placeholder-gray-500 border rounded-xl"
                style={{ width: 'calc(40% - 0.4rem)' }}
                type="number"
                name="age"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <select
                className="p-2 border rounded-xl"
                style={{ width: 'calc(60% - 0.6rem)' }}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled >
                Select Gender
                </option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>

            <input
              className="w-full p-2 placeholder-gray-500 border rounded-xl"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                className="w-full p-2 pr-10 placeholder-gray-500 border rounded-xl"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>

            <div className="relative">
              <input
                className="w-full p-2 pr-10 placeholder-gray-500 border rounded-xl"
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <div
                className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>

            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Register
            </button>
          </form>

          <div className="items-center mt-6 text-white">
            <hr className="border-gray-300" />
            <p className="text-sm text-center">OR</p>
            <hr className="border-gray-300" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                     c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                     C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20
                     C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12
                     c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                     C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
                     C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025
                     C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303
                     c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238
                     C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>

          <div className="py-5 mt-10 text-sm text-white border-b border-gray-500 playfair tooltip">
            Forget password?
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-white">
            <p className="mr-3 md:mr-0">If you have an account..</p>
            <button
              className="hover:border register bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="hidden w-1/2 md:block">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://cdni.iconscout.com/illustration/premium/thumb/training-specialist-providing-to-customers-on-product-usage-and-features-illustration-download-in-svg-png-gif-file-formats--customer-support-pack-services-illustrations-7342869.png"
            alt="login form"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;