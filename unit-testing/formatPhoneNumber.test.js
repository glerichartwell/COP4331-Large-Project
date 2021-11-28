// unit test for formatPhoneNumber.js

const formatPhoneNumber = require("./formatPhoneNumber");

test("formats phone number to only digits given various input formats", () => {
  expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
});

test("formats phone number to only digits given various input formats", () => {
  expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
});

test("formats phone number to only digits given various input formats", () => {
  expect(formatPhoneNumber("12345678904545")).toBe("(123) 456-7890");
});

test("formats phone number to only digits given various input formats", () => {
  expect(formatPhoneNumber("123 456 7890   ")).toBe("(123) 456-7890");
});
