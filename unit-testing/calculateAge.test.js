// unit test for calculateAge.js

const calculateAge = require("./calculateAge");

test("calculates age when given a birthday", () => {
  expect(calculateAge("2020-02-05")).toBe(1);
});
