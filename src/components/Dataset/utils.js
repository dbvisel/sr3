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

/* munsell stuff */

const hueNames = ["R", "YR", "Y", "GY", "G", "BG", "B", "PB", "P", "RP"];

const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

export const isValidMunsell = (munsellStr) => {
  const nums = munsellStr
    .split(/[^a-z0-9.-]+/)
    .filter(Boolean)
    .map((str) => Number(str));

  const words = munsellStr.match(/[A-Z]+/);
  if (words === null) {
    return false;
  }

  const hueName = words[0];

  const hueNumber = hueNames.indexOf(hueName);

  if (hueName === "N") {
    // this would have returned [0, nums[0], 0]
    return true;
  } else if (nums.length !== 3) {
    return false;
  } else if (hueNumber === -1) {
    // achromatic

    return false;
  } else {
    return true;
  }
};

export const checkStringForMunsell = (str) => {
  let found = false;
  let value = "";
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (isNumeric(str[i])) {
        const thisString = str.substring(i);
        if (isValidMunsell(thisString)) {
          found = true;
          value = thisString;
          break;
        }
      }
    }
  }
  return { found: found, value: value };
};

/* end munsell stuff */
