import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  test("renders correct elements", () => {
    const { component } = render(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
