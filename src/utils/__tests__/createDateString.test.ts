import { createDateString } from "../createDateString";

test("formats date correctly", () => {
  expect(createDateString(new Date(2019, 0, 1).toISOString())).toBe("1/1/2019");
});
