export const toTitleCase = (text) =>
  text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const cleanPercent = (value) => {
  if (value) {
    return parseInt(parseFloat(value) * 10000, 10) / 100;
  }
  return "";
};

export const compareDate = (a, b) => {
  //return true if a > b
  const madeDateA = new Date(a);
  const madeDateB = new Date(b);
  const compA =
    a && madeDateA instanceof Date && !isNaN(madeDateA)
      ? madeDateA
      : new Date(0);
  const compB =
    b && madeDateB instanceof Date && !isNaN(madeDateB)
      ? madeDateB
      : new Date(0);
  return compA > compB;
};

export const cleanDate = (value) => {
  if (value) {
    const madeDate = new Date(value);
    // this tests to see if it's an "Invalid Date"
    if (madeDate instanceof Date && !isNaN(madeDate)) {
      return madeDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return value;
    }
  }
  return "";
};
