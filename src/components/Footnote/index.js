import React from "react";
import { FootnoteP, FootnoteNumber, FootnoteCalloutSpan } from "./elements";

export const Footnote = ({ id, children }) => {
  return (
    <FootnoteP>
      <FootnoteNumber>{`${id}.`}</FootnoteNumber>
      {children}
    </FootnoteP>
  );
};

export const FootnoteCallout = ({ id }) => (
  <FootnoteCalloutSpan>{id}</FootnoteCalloutSpan>
);
