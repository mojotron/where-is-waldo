import { render, screen } from "@testing-library/react";
import Home from "../Home";
import "@testing-library/jest-dom/extend-expect";
import { useCollection } from "../../../hooks/useCollection";
import dataMock from "../../../mocks/levelDataMock.json";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../hooks/useCollection", () => ({
  useCollection: jest.fn(() => ({
    documents: null,
    isPending: false,
    error: null,
  })),
}));

describe("Home component", () => {
  test("renders pending", async () => {
    useCollection.mockImplementation(() => ({
      isPending: true,
      error: null,
      documents: null,
    }));

    render(<Home />);
    expect(useCollection).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("renders error", () => {
    useCollection.mockImplementation(() => ({
      isPending: false,
      error: "Can not get data!",
      documents: null,
    }));
    render(<Home />);
    expect(screen.getByText("Can not get data!")).toBeInTheDocument();
  });
  test("renders documents", () => {
    useCollection.mockImplementation(() => ({
      isPending: false,
      error: null,
      documents: [dataMock],
    }));
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByRole("listitem").className).toBe("LevelCard");
    expect(screen.getByRole("heading").textContent).toBe(dataMock.title);
  });
});
