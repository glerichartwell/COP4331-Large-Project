// function for formatting a birthday
// input format: yyyy-mm-dd (ex. 2000-08-15)
// output: mm/dd/yyyy (ex. 08-15-2000)

const formatBirthday = (birthday) => {
  const date = new Date(birthday);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  return month + "/" + day + "/" + year;
}

module.exports = formatBirthday;
