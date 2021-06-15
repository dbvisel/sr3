import React from "react";
import PropTypes from "prop-types";
import { FootnoteP, FootnoteNumber, FootnoteCalloutSpan } from "./elements";

export const Footnote = ({ id, children }) => {
  return (
    <FootnoteP>
      <FootnoteNumber>{`${id}.`}</FootnoteNumber>
      {children}
    </FootnoteP>
  );
};

Footnote.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const FootnoteCallout = ({ id }) => (
  <FootnoteCalloutSpan>{id}</FootnoteCalloutSpan>
);

FootnoteCallout.propTypes = {
  id: PropTypes.string.isRequired,
};
