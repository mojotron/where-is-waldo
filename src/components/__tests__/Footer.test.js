import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  test("Renders heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading").textContent).toBe(
      "created by @mojotron"
    );
  });
  test("Renders secure link", () => {
    render(<Footer />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/mojotron/where-is-waldo"
    );
  });
});
