import * as React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import { withPrefix } from "gatsby";

const BaseLink = ({ href, children, download }) =>
  download ? (
    <a href={withPrefix(href)} download>
      <Markdown>{children}</Markdown>
    </a>
  ) : (
    <a href={withPrefix(href)}>
      <Markdown>{children}</Markdown>
    </a>
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
