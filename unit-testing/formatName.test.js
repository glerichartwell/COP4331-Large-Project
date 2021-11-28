// unit test for formatName.js

const formatName = require("./formatName");

test("formats name to single string given three string inputs for firstName, middleName, lastName", () => {
  expect(formatName("first", "middle", "last")).toBe("first middle last");
});
