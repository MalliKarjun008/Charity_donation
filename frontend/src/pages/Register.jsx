import SiteIcon from "../components/others/SiteIcon";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { DobPicker } from "@/components/ui/dob_picker";
import { useActionState, useState } from "react";
import Submit from "@/components/Register/submit";
import { z } from "zod";
import { registerUser } from "@/api/user";
import { useNavigate } from "react-router";

const registerSchema = z
  .object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    DOB: z.date({ required_error: "Date of birth is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Register() {
  const [date, setDate] = useState(null);
  const navigate = useNavigate("/login");

  const RegisterAction = async (prevState, formData) => {
    const values = {
      username: formData.get("username") || "",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      confirmPassword: formData.get("confirmPassword") || "",
      DOB: date,
    };

    const result = registerSchema.safeParse(values);
    if (!result.success) {
      return {
        errors: result.error.errors.map((e) => ({
          path: e.path[0],
          message: e.message,
        })),
        enteredValues: values,
      };
    }

    try {
      await registerUser(values);
      // navigate to login page
      navigate("/login");
    } catch (err) {
      return {
        errors: [{ path: "backend", message: err.message }],
        enteredValues: values,
      };
    }
  };

  const [formState, formAction, isPending] = useActionState(RegisterAction, {
    errors: null,
    enteredValues: {},
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8 text-white">
      <div className="bg-gray-800 w-full max-w-3xl rounded-xl shadow-lg p-8 sm:p-12 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <SiteIcon />
        </div>

        <form action={formAction} className="space-y-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Create Your Account
          </h1>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              name="username"
              defaultValue={formState?.enteredValues?.username}
              type="text"
              placeholder="Enter user name"
              required
            />
            <Input
              name="email"
              defaultValue={formState?.enteredValues?.email}
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              name="password"
              defaultValue={formState?.enteredValues?.password}
              type="password"
              placeholder="Enter password"
              required
            />
            <Input
              name="confirmPassword"
              defaultValue={formState?.enteredValues?.confirmPassword}
              type="password"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* DOB  + submit*/}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <DobPicker setDate={setDate} date={date} />
            <div className="flex gap-4 w-full sm:w-auto">
              <Submit isPending={isPending} />
            </div>
          </div>

          {/* Error messages */}
          {formState.errors && (
            <div className="space-y-2">
              {formState.errors.map((error, i) => (
                <p key={i} className="text-red-400 text-center">
                  {error.message}
                </p>
              ))}
            </div>
          )}

          {/* Login link */}
          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link className="text-blue-400 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
