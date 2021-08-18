import React from "react";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby";

const BaseLink = ({ href, children, download }) =>
  download ? (
    <a href={withPrefix(href)} download>
      {children}
    </a>
  ) : (
    <a href={withPrefix(href)}>{children}</a>
  );

export default BaseLink;

BaseLink.propTypes = {
  href: PropTypes.string,
  download: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
