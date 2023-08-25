import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      let url = "http://127.0.0.1:5000/api/user/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status !== "success") {
        toast.error(data.msg);
        setFormData({
          email: "",
          password: "",
        });
        return;
      }
      localStorage.setItem("token", data.token);
      console.log(data);
      setIsLoggedIn(true);
      toast.success("Logged In");
      navigate("/subscription");
    } catch (err) {
      toast.error("Server Error");
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email address"
          name="email"
          className="bg-white rounded-[0.5rem] text-black w-full p-[12px]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-white rounded-[0.5rem] text-black-5 w-full p-[12px]"
        />

        <span
          className="absolute right-3 top-[38px] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="#">
          <p className="text-xs mt-1 text-white max-w-max ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>
      <button className=" bg-blue-900 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-0">
        Login
      </button>
      <div className="flex justify-center p-2 text-blue-900">
        <h3>New to MyApp?</h3>
        <NavLink to="/signup" className="px-2 text-white">
          Signup
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;
