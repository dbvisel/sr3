import * as React from "react";
import styled from "styled-components";
import { munsellToHex } from "munsell";
import { TableCell } from "./elements";

const hueNames = ["R", "YR", "Y", "GY", "G", "BG", "B", "PB", "P", "RP"];

const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

const isValidMunsell = (munsellStr) => {
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

const checkStringForMunsell = (str) => {
  let found = false;
  let value = "";
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
  return { found: found, value: value };
};

const ColorBlock = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  margin-left: 1em;
  background-color: ${(props) => props.color || "transparent"};
`;

const MunsellCell = ({ value }) => {
  let valueToChange;
  // if(isValidMunsell(value)) {
  //   valueToChange = munsellToHex(value);
  // } else {
  //   valueToChange = "transparent";
  // }
  try {
    valueToChange = munsellToHex(value);
  } catch (error) {
    const check = checkStringForMunsell(value);
    if (check.found) {
      // console.log("found", check.value);
      valueToChange = munsellToHex(check.value);
      // console.log(valueToChange);
    } else {
      if (value) {
        console.log("Failed Munsell color:", isValidMunsell(value), value);
      }
      // console.log(error);
      valueToChange = "transparent";
    }
  }
  return (
    <TableCell
      className="munsellcell"
      style={{
        textAlign: "right",
        marginRight: "1em",
        overflow: "visible",
        whiteSpace: "nowrap",
      }}
    >
      <span>{value}</span>
      <ColorBlock color={valueToChange} />
    </TableCell>
  );
};

export default MunsellCell;
