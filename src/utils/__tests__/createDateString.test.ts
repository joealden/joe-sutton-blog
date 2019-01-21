import { createDateString } from "../createDateString";

test("formats date correctly", () => {
  expect(createDateString(new Date(2019, 0, 1).toISOString())).toBe("1/1/2019");
});

test("errors out when invalid date is passed", () => {
  try {
    createDateString("2020-30-50T00:00:00.000Z");
  } catch (error) {
    expect(error).toEqual(
      Error("The date provided must be in the ISO 8601 format")
    );
  }
});
