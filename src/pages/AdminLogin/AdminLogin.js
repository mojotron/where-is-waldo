import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isPending, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Dashboard Login</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      {isPending ? (
        <button type="button" className="btn" disabled>
          Loading
        </button>
      ) : (
        <button type="submit" className="btn">
          Login
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AdminLogin;
