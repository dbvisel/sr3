import * as React from "react";
import PropTypes from "prop-types";
import { munsellToHex } from "munsell";
import {
  checkStringForMunsell,
  isValidMunsell,
} from "./../../modules/munsellColor";
import { MunsellBlock } from "./elements";

const MunsellColorSquare = ({ value, children }) => {
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
      valueToChange = "";
    }
  }
  if (valueToChange) {
    return (
      <span style={{ whiteSpace: "nowrap" }}>
        <span>{children}</span>
        {" ("}
        <MunsellBlock color={valueToChange} />
        {")"}
      </span>
    );
  }
  return children;
};

export default MunsellColorSquare;

MunsellColorSquare.propTypes = {
  value: PropTypes.string,
  shownValue: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
