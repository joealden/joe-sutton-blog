import { filterTags } from "../filterTags";

test("filters single word tags correctly", () => {
  expect(filterTags(["ee", "ba", "bb", "bc", "ab"], "b")).toEqual([
    "ba",
    "bb",
    "bc"
  ]);
});

test("filters multi word tags correctly", () => {
  const tags = [
    "Neue Haas",
    "New Times Roman",
    "Open Sans",
    "Droid Sans",
    "Fira Code",
    "Playfair Display",
    "Sansation"
  ];

  expect(filterTags(tags, "ha")).toEqual(["Neue Haas"]);
  expect(filterTags(tags, "ne")).toEqual(["Neue Haas", "New Times Roman"]);
  expect(filterTags(tags, "d")).toEqual(["Droid Sans", "Playfair Display"]);

  expect(filterTags(tags, "san")).toEqual([
    "Open Sans",
    "Droid Sans",
    "Sansation"
  ]);
});
