// function for searching a trainer's clients in the database
// input format: searchString
// output: {results:[], error:""}

const searchClientByTrainer = async (trainerID, searchString) => {
  // event.preventDefault();
  var obj = { trainerID: trainerID, search: searchString };
  var js = JSON.stringify(obj);

  try {
    const response = await fetch("http://localhost:8000/api/fuzzy-search-client-by-trainer", {
      method: "POST",
      body: js,
      headers: { "Content-Type": "application/json" },
    });

    var txt = await response.text();
    var res = JSON.parse(txt);
    var _results = res.results;
    return _results;
  } catch (e) {
    return e;
  }
};

module.exports = searchClientByTrainer;
