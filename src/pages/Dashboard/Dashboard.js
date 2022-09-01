import { useLogout } from "../../hooks/useLogout";
import OptionBar from "./OptionBar";

const Dashboard = () => {
  const { isPending, error, logout } = useLogout();

  return (
    <div className="Dashboard">
      <OptionBar />

      {isPending ? (
        <button className="btn btn--logout" type="button" disabled>
          Loading
        </button>
      ) : (
        <button className="btn btn--logout" type="button" onClick={logout}>
          Logout
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Dashboard;
