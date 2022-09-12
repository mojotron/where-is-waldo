import { render, screen } from "@testing-library/react";
import LevelCard from "../LevelCard";
import mockData from "../../../mocks/levelDataMock.json";
import { BrowserRouter } from "react-router-dom";

const MockLevelCard = () => {
  return (
    <BrowserRouter>
      <LevelCard data={mockData} />
    </BrowserRouter>
  );
};

describe("LevelCard component", () => {
  test("renders heading", () => {
    render(<MockLevelCard />);
    expect(screen.getByRole("heading").textContent.toLowerCase()).toEqual(
      mockData.title
    );
  });
  test("renders targets", () => {
    render(<MockLevelCard />);
    const targetIcons = screen.getAllByAltText("target");
    expect(targetIcons.length).toEqual(mockData.tags.length);
    expect(targetIcons[0]).toHaveAttribute("src", mockData.tags[0].targetIcon);
  });
  test("renders thumbnail", () => {
    render(<MockLevelCard />);
    expect(screen.getByAltText("level thumbnail")).toHaveAttribute(
      "src",
      "waldo-space.jpg"
    );
  });

  test("level is a link with object id href", () => {
    render(<MockLevelCard />);
    expect(screen.getByRole("link")).toHaveAttribute("href", `/${mockData.id}`);
  });
});
