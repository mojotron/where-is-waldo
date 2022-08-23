import { useLogout } from "../../hooks/useLogout";
import UploadImageForm from "../../components/UploadImageForm";

const Dashboard = () => {
  const { isPending, error, logout } = useLogout();

  return (
    <div>
      <h1>Dashboard</h1>

      {isPending ? (
        <button className="btn" type="button" disabled>
          Loading
        </button>
      ) : (
        <button className="btn" type="button" onClick={logout}>
          Logout
        </button>
      )}

      <UploadImageForm />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Dashboard;
