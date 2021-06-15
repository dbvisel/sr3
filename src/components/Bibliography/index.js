import React from "react";
import PropTypes from "prop-types";
import { BibliographyP } from "./elements";

const Bibliography = ({ children }) => (
  <BibliographyP>{children}</BibliographyP>
);

export default Bibliography;

Bibliography.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
