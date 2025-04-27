import { useState } from "react";
import { login } from "../api/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");
    const result = await login(username, password);

    if (result.success) {
      setStatus("✅ Success! Token stored. Check console.");
    } else {
      setStatus(`❌ Error: ${result.message}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            marginBottom: 10,
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            marginBottom: 10,
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
          }}
        >
          Login
        </button>
      </form>

      {status && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            background: status.includes("✅") ? "#e6ffed" : "#fff3f3",
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
