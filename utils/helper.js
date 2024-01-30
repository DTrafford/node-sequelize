exports.isExistAttribute = (findAttri, attri) => {
  const x = findAttri.map((item) => {
    if (item[0].value === attri.map((val) => val.value)) {
      return true;
    } else {
      return false;
    }
  });
  if (x.includes(true)) {
    return false;
  } else {
    return true;
  }
};

exports.sortArray = (arr) => {
  arr.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
