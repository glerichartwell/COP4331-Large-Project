// unit test for formatBirthday.js

const formatBirthday = require("./formatBirthday");

test("converts birthday format from yyyy-mm-dd to m/d/yyyy", () => {
  expect(formatBirthday("2020-02-05")).toBe("2/5/2020");
});
