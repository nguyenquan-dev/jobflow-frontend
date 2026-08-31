import { useState, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router-dom"
import { loginService } from "../services/authService"
import { useAuth } from "../context/AuthContext";

export default function LoginPage(){
  const navigate = useNavigate();
  const {login} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginService({ email, password });

      login(data.accessToken, data.user);


      navigate("/jobs");
    } catch (error) {

      setError("Email hoặc password không chính xác.");
    } finally {
      
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border p-8"
      >

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        {error && (
          <p className="mt-4 text-red-500">
            {error}
          </p>
        )}

        <div className="mt-6">

          <label className="block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
            required
          />

        </div>

        <div className="mt-4">

          <label className="block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
            required
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}
