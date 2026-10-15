import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/all-posts");
        } else {
          throw new Error("Failed to retrieve user data.");
        }
      }
    } catch (error) {
      setError(error?.message || "Failed to login. Please try again.");
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-[#d75e43] transition-colors hover:text-[#b94d36] hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-8 text-center text-sm text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
