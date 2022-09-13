import { render, screen } from "@testing-library/react";
import TargetsPopup from "../TargetsPopup";
import dataMock from "../../../mocks/levelDataMock.json";

describe("TargetsPopup Level component", () => {
  test("renders target element", () => {
    render(
      <TargetsPopup
        coords={{ x: 50, y: 50 }}
        targets={[...dataMock.tags]}
        handleTargetClick={jest.fn()}
        parentRef={{ current: { offsetHeight: 550, offsetWidth: 978 } }}
      />
    );
    const headings = screen.getAllByRole("heading");
    const imgs = screen.getAllByAltText("target icon");
    expect(screen.getAllByTestId("target-list-item").length).toBe(2);
    expect(headings[0].textContent).toBe("Waldo");
    expect(imgs[1]).toHaveAttribute("src", "wenda-icon.jpg");
  });
});
