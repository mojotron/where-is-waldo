import { render, screen } from "@testing-library/react";
import ProtectedRoute from "../ProtectedRoute";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const Child = () => <h1>Child Element</h1>;

describe("ProtectedRoute component", () => {
  test("condition is true return children elements", () => {
    render(
      <ProtectedRoute
        condition={true}
        goto="/"
        children={[<Child key="1" />]}
      />
    );
    expect(
      screen.getByRole("heading", { name: /child element/i })
    ).toBeInTheDocument();
  });

  test("condition is false navigate to home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/temp"
            element={
              <ProtectedRoute
                condition={false}
                goto="/"
                children={[<Child key="1" />]}
              />
            }
          />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });
});
