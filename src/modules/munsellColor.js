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
