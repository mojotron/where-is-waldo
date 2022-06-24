import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../Admin";

const MockAdmin = () => {
  <BrowserRouter>
    <Admin setAdmin={() => {}} />
  </BrowserRouter>;
};

describe("Admin page", () => {
  test("renders heading", () => {
    render(<MockAdmin />);
    expect(screen.getByRole("heading").textContent).toBe("Dashboard Login");
  });
  test("renders form", () => {
    render(<MockAdmin />);
    expect(screen.getByTitle("login-form")).toHaveClass("Login");
  });
  test("renders 3 labels", () => {
    render(<MockAdmin />);
    expect(screen.getAllByText(/username|email|password/i).length).toBe(3);
  });
  test("renders 3 input fields", () => {
    render(<MockAdmin />);
    expect(screen.getAllByLabelText(/username|email|password/i).length).toBe(3);
  });
  test("renders button", () => {
    render(<MockAdmin />);
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
  test("", () => {});
});
