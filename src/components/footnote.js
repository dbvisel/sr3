import React from "react";
import styled from "styled-components";

const FootnoteP = styled.p`
  margin-left: 32px !important;
  text-indent: 0 !important;
  margin-top: 1em !important;
`;

const FootnoteNumber = styled.span`
  position: relative;
  left: -32px;
  display: inline-block;
  width: 0;
  white-space: nowrap;
`;

const Footnote = ({ id, children }) => {
  return (
    <FootnoteP>
      <FootnoteNumber>{`${id}.`}</FootnoteNumber>
      {children}
    </FootnoteP>
  );
};

export default Footnote;
