import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { registerCandidateService } from "../services/authService";
import type { RegisterRequest } from "../types/auth";

export default function CandidateRegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Check password
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        return;
      }

      const request: RegisterRequest = {
        email,
        fullName,
        password,
      };

      await registerCandidateService(request);

      // Register thành công → chuyển sang Login
      navigate("/login");
    } catch (error) {
      setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border p-8"
      >

        <h1 className="text-3xl font-bold">
          Register as Candidate
        </h1>

        {error && (
          <p className="mt-4 text-red-500">
            {error}
          </p>
        )}

        {/* Full name */}
        <div className="mt-6">

          <label className="block text-sm font-medium">
            Full name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Enter your full name"
            required
          />

        </div>

        {/* Email */}
        <div className="mt-4">

          <label className="block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Enter your email"
            required
          />

        </div>

        {/* Password */}
        <div className="mt-4">

          <label className="block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Enter your password"
            minLength={8}
            required
          />

        </div>

        {/* Confirm Password */}
        <div className="mt-4">

          <label className="block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Confirm your password"
            minLength={8}
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login */}
        <p className="mt-4 text-center text-sm text-gray-600">

          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-black underline"
          >
            Login
          </button>

        </p>

      </form>

    </div>
  );
}
