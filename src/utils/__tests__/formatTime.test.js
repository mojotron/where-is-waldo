import formatTime from "../formatTime";

describe("Format timestamp to 'mm.:ss'", () => {
  test("Get seconds", () => {
    const startTime = 1662836807264;
    const endTime = 1662836811220;
    expect(formatTime(endTime - startTime)).toEqual("00:03");
  });
  test("Get minutes", () => {
    const startTime = 1662836807264;
    const endTime = 1662837005702;
    expect(formatTime(endTime - startTime)).toEqual("03:18");
  });
});
