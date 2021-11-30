// function for formatting a date
// input format: yyyy-mm-dd (ex. 2000-08-15)
// output: mm/dd/yyyy (ex. 08-15-2000)

const formatDate = (birthday) => {
  const d = new Date(birthday);
  const date = new Date( d.getTime() - d.getTimezoneOffset() * -60000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "/" + day + "/" + year;
}

module.exports = formatDate;
