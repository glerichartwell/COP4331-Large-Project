// function for calculating age given a birthday
// input format: yyyy-mm-dd (ex. 2000-08-15)
// output: age

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);

  let diff_ms = Date.now() - birthDate.getTime();
  let age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

module.exports = calculateAge;
