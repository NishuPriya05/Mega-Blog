import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/all-posts");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-24px_rgba(24,58,53,0.35)] sm:p-8">
        <div className="mb-6 flex flex-col items-center">
          <Logo width="52px" />
          <span className="mt-3 text-lg font-extrabold tracking-tight text-[#183a35]">
            Mega<span className="text-[#ef7755]">Blog</span>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#183a35]">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-[#d75e43] transition-colors hover:text-[#b94d36] hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="mt-8 text-center text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
