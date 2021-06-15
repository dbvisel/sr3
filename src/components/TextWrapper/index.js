import React from "react";
import PropTypes from "prop-types";
import { TextWrapperDiv } from "./elements";

// maybe don't need consumer here?

const TextWrapper = ({ children }) => (
  <TextWrapperDiv>{children}</TextWrapperDiv>
);

export default TextWrapper;

TextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
