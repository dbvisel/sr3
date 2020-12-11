import React from "react";
import { withPrefix } from "gatsby";

const BaseLink = ({ href, children }) => (
  <a href={withPrefix(href)}>{children}</a>
);

export default BaseLink;
