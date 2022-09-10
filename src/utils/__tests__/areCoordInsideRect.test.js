import areCoordsInsideRect from "../areCoordsInsideRect";

describe("Check if selected position is inside rectangle", () => {
  test("Position inside rectangle", () => {
    const clickCoords = { x: 0.5, y: 0.5 };
    const rectCoords = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } };
    expect(areCoordsInsideRect(clickCoords, rectCoords)).toBe(true);
  });
  test("Position on the edge of rect (top left)", () => {
    const clickCoords = { x: 0, y: 0 };
    const rectCoords = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } };
    expect(areCoordsInsideRect(clickCoords, rectCoords)).toBe(true);
  });
  test("Position on the edge of rect (bottom right)", () => {
    const clickCoords = { x: 1, y: 1 };
    const rectCoords = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } };
    expect(areCoordsInsideRect(clickCoords, rectCoords)).toBe(true);
  });
  test("Position on the edge of rect", () => {
    const rectCoords = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } };
    expect(areCoordsInsideRect({ x: 0, y: 0.5 }, rectCoords)).toBe(true);
    expect(areCoordsInsideRect({ x: 0.5, y: 0 }, rectCoords)).toBe(true);
    expect(areCoordsInsideRect({ x: 1, y: 0.5 }, rectCoords)).toBe(true);
    expect(areCoordsInsideRect({ x: 0.5, y: 1 }, rectCoords)).toBe(true);
  });

  test("Position outside rectangle", () => {
    const rectCoords = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 1, y: 1 } };
    expect(areCoordsInsideRect({ x: 1.1, y: 0.5 }, rectCoords)).toBe(false);
    expect(areCoordsInsideRect({ x: 0, y: 1.1 }, rectCoords)).toBe(false);
    expect(areCoordsInsideRect({ x: 1, y: -0.1 }, rectCoords)).toBe(false);
    expect(areCoordsInsideRect({ x: 1.1, y: 1.1 }, rectCoords)).toBe(false);
  });
});
