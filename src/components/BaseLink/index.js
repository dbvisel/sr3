import React from "react";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby";

const BaseLink = ({ href, children }) => (
  <a href={withPrefix(href)}>{children}</a>
);

export default BaseLink;

BaseLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
