import * as React from "react";
import styled from "styled-components";
import { munsellToHex } from "munsell";
import { TableCell } from "./elements";

const ColorBlock = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  margin-left: 1em;
  background-color: ${(props) => props.color || "transparent"};
`;

const MunsellCell = ({ value }) => {
  let valueToChange;
  try {
    valueToChange = munsellToHex(value);
  } catch {
    // console.log(error);
    valueToChange = "transparent";
  }
  return (
    <TableCell
      className="munsellcell"
      style={{ textAlign: "right", marginRight: "1em" }}
    >
      <span>{value}</span>
      <ColorBlock color={valueToChange} />
    </TableCell>
  );
};

export default MunsellCell;
