import "../styles/Admin.css";

const Admin = () => {
  return (
    <div className="Admin">
      <h2>Dashboard Login</h2>
      <form className="Login" title="login-form">
        <label htmlFor="input-username">Username</label>
        <input type="text" id="input-username" name="username" required />
        <label htmlFor="input-email">Email</label>
        <input type="email" id="input-email" name="email" required />
        <label htmlFor="input-password">Password</label>
        <input type="password" id="input-password" name="password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Admin;
