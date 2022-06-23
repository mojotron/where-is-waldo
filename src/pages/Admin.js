import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";
import { logInAdmin } from "../firebaseApp";
import { useState } from "react";

const Admin = (props) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const userObj = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const adminAuth = await logInAdmin(userObj);
      props.setAdmin(adminAuth);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Admin">
      <h2>Dashboard Login</h2>
      <form className="Login" title="login-form" onSubmit={handleSubmitForm}>
        <label htmlFor="input-username">Username</label>
        <input type="text" id="input-username" name="username" required />
        <label htmlFor="input-email">Email</label>
        <input type="email" id="input-email" name="email" required />
        <label htmlFor="input-password">Password</label>
        <input type="password" id="input-password" name="password" required />
        {error && <p className="Login__error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Admin;
