import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      userId: "U" + Date.now(),
      name: name,
      email: email,
      password: password
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");

        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Backend connection error");
    }
  }

  return (
    <div className="register-page">
      <h1>Digital Receipt Organizer</h1>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <label>Email</label>
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <label>Password</label>
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;