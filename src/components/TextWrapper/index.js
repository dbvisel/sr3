import React from "react";
import { TextWrapperDiv } from "./elements";

// maybe don't need consumer here?

const TextWrapper = ({ children }) => (
  <TextWrapperDiv>{children}</TextWrapperDiv>
);

export default TextWrapper;
