import { render, screen } from "@testing-library/react";
import Admin from "../Admin";

describe("Admin page", () => {
  test("renders heading", () => {
    render(<Admin />);
    expect(screen.getByRole("heading").textContent).toBe("Dashboard Login");
  });
  test("renders form", () => {
    render(<Admin />);
    expect(screen.getByTitle("login-form")).toHaveClass("Login");
  });
  test("renders 3 labels", () => {
    render(<Admin />);
    expect(screen.getAllByText(/username|email|password/i).length).toBe(3);
  });
  test("renders 3 input fields", () => {
    render(<Admin />);
    expect(screen.getAllByLabelText(/username|email|password/i).length).toBe(3);
  });
  test("renders button", () => {
    render(<Admin />);
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
