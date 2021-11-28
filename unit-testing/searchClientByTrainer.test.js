// unit test for searchClientByTrainer.js

const searchClientByTrainer = require("./searchClientByTrainer");

test("API TEST: searches a trainer's clients given a trainer's email and a search string", async () => {
  const results = await searchClientByTrainer("bmoonmusic@gmail.com", "brian");
  expect(results).toBe(results);
});
