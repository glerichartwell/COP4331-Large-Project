// function for formatting a name
// input format (individual params): 
//       first name, middle name, last name 
// output (single string): firstName middleName lastName

const formatName = (firstName, middleName, lastName) => {
  if (middleName === ""){
      return firstName + " " + lastName;
  }
  else {
      return firstName + " " + middleName + " " + lastName;
  }
}

module.exports = formatName;
