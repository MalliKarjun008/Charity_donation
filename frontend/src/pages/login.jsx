import { Link, useNavigate } from "react-router";
import SiteIcon from "../components/others/SiteIcon";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "@/store/auth/authActions";

function Login() {
  const loginStatus = useSelector((state) => state.auth.logInstatus);
  const errorMsg = useSelector((state) => state.auth.errorMsg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus == "success") {
      navigate("/app/home");
    }
  }, [loginStatus, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    dispatch(logInUser({ email: data.email, password: data.password }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8 text-white">
      <div className="bg-gray-800 w-full max-w-3xl rounded-xl shadow-lg p-8 sm:p-12 space-y-8">
        <SiteIcon />
        {loginStatus == "error" && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center gap-5"
        >
          <h1 className="font-bold text-3xl">Login to Your Account</h1>
          <div className="flex flex-col justify-between items-center gap-5">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
            ></Input>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </div>
          <div className="flex justify-between items-center">
            <p>
              Don't have an account?{" "}
              <Link className="text-blue-500 cursor-pointer" to="/">
                Register
              </Link>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-full"
              disabled={loginStatus === "loading"}
            >
              {loginStatus === "loading" ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
