import { render, screen } from "@testing-library/react";
import Level from "../Level";
import { MemoryRouter } from "react-router-dom";
import dataMock from "../../../mocks/levelDataMock.json";
import userEvent from "@testing-library/user-event";

describe("Level page", () => {
  test("gets data", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { data: dataMock } }]}>
        <Level />
      </MemoryRouter>
    );
    expect(screen.getByTestId("overlay-grid")).toHaveAttribute(
      "style",
      "background-image: url(waldo-space.jpg);"
    );
  });
  test("handles click", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { data: dataMock } }]}>
        <Level />
      </MemoryRouter>
    );
    userEvent.click(screen.getByTestId("overlay-grid"));
    expect(screen.getByTestId("targets-popup")).toBeInTheDocument();
  });
});
