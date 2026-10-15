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
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-[80vh]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col items-center">
          <span className="inline-block p-3 rounded-xl bg-indigo-50 text-indigo-600 mb-2">
            <Logo width="48px" />
          </span>
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-100 rounded-xl p-3 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              label="Email Address"
              placeholder="Enter your email account"
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{23})+$/.test(value) ||
                    "Invalid email format",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("password", { required: true })}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200"
          >
            Sign In Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
