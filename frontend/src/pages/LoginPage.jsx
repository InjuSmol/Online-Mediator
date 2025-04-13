import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen relative flex items-center justify-center overflow-hidden text-[#265F34]"
      style={{
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Kameron',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
            }}>
      {/* Left Side - Form */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md scale-105"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full">
      <div
        className="flex flex-col justify-center items-center p-10 max-w-md w-full"
        style={{
          borderRadius: '40px',
          background: 'rgba(249, 249, 249, 0.55)',
          boxShadow: '0px 7px 4px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(5px)',
        }}
      >
      {/*<div className="w-full max-w-md space-y-8 ">*/}
          {/* Logo */}
          <div className="text-center mb-8  ">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className=" w-full" disabled={isLoggingIn}
              style={{
                borderRadius: '20px',
                background: 'rgba(73, 200, 98, 0.93)',
                
                boxShadow:'0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link text-[#265F34]">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
export default LoginPage;