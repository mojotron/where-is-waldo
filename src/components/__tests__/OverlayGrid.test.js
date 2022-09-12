import { render, screen } from "@testing-library/react";
import OverlayGrid from "../OverlayGrid";
import userEvent from "@testing-library/user-event";

describe("OverlayGrid component", () => {
  test("displays image as background", () => {
    render(<OverlayGrid image="./img.jpg" />);
    expect(screen.getByTestId("overlay-grid")).toHaveAttribute(
      "style",
      "background-image: url(./img.jpg);"
    );
  });

  test("call parent click handler", () => {
    const clickHandler = jest.fn();
    render(<OverlayGrid image="temp.jpg" handleTagCoords={clickHandler} />);
    const grid = screen.getByTestId("overlay-grid");
    userEvent.click(grid);
    expect(clickHandler).toHaveBeenCalled();
  });

  test("sets container width/height if passed as style arg", () => {
    render(
      <OverlayGrid
        image="test.jpg"
        styles={{ height: "100px", width: "100px" }}
      />
    );
    const grid = screen.getByTestId("overlay-grid");
    expect(grid).toHaveAttribute(
      "style",
      "height: 100px; width: 100px; background-image: url(test.jpg);"
    );
  });
});
