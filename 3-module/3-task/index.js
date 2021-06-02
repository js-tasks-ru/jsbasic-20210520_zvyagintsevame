function camelize(str) {
  const arrayFromString = str.split("-");
  const newArr = arrayFromString.map((item, index) => {

    if (index > 0 || item === '') {
      return item.substr(0, 1).toUpperCase() + item.substr(1);
    }
    return item;
  });

  return newString = newArr.join('')
};
