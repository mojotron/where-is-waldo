import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const MockProtectedRoute = (user) => {
  return (
    <BrowserRouter>
      <ProtectedRoute user={user} />
    </BrowserRouter>
  );
};

describe("ProtectedRoute Page", () => {
  test("renders dashboard on correct user", () => {
    render(<MockProtectedRoute user={false} />);

    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});
