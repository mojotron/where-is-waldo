import { render, screen } from "@testing-library/react";
import WinPopup from "../WinPopup";
import { BrowserRouter, Router } from "react-router-dom";

const startTimestamp = Date.now();

describe("WinPopup Level component", () => {
  test("renders winning header", () => {
    render(
      <BrowserRouter>
        <WinPopup gameStart={startTimestamp} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: /CONGRATULATION!/i })
    ).toBeInTheDocument();
  });
  test("renders level time", () => {
    render(
      <BrowserRouter>
        <WinPopup gameStart={startTimestamp} />
      </BrowserRouter>
    );
    expect(screen.getByText(/^level time/i).textContent).toMatch(
      /Level time - \d\d:\d\d/
    );
  });
  test("renders button", () => {
    render(
      <BrowserRouter>
        <WinPopup gameStart={startTimestamp} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("button", { name: /play again/i })
    ).toBeInTheDocument();
  });
});
