import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://dummyproducts.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
      login(data.token);
      navigate("/home");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c0e14] text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[#1f2231] p-6 rounded-xl w-80 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center text-[#fcd53f]">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="px-4 py-2 rounded-md bg-[#2d354d] text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 rounded-md bg-[#2d354d] text-white"
        />
        <button
          type="submit"
          className="bg-[#fcd53f] hover:bg-yellow-400 py-2 rounded-md font-semibold text-[#0c0e14]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
