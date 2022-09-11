import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar component", () => {
  test("Renders heading", () => {
    render(<MockNavbar />);
    expect(
      screen.getByRole("heading", { name: /where is waldo/i })
    ).toBeInTheDocument();
  });
  test("renders unordered list", () => {
    render(<MockNavbar />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  test("renders list elements with links", () => {
    render(<MockNavbar />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toMatch(/levels/i);
    expect(listItems[0].innerHTML).toBe('<a href="/">levels</a>');
  });
});
