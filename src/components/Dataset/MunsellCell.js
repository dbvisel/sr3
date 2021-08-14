import * as React from "react";
import PropTypes from "prop-types";
import { munsellToHex } from "munsell";
import { checkStringForMunsell, isValidMunsell } from "./utils";
import { TableCell, ColorBlock } from "./elements";

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

MunsellCell.propTypes = {
  value: PropTypes.string,
};
