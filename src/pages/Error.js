import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>404 Page not Found</h1>
      <Link to="/">go to home page</Link>
    </div>
  );
};

export default Error;
