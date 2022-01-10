import React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import { HeaderSection } from "./elements";

const ReportHeader = ({ title, subtitle, author, date }) => (
  <HeaderSection>
    {/*<h1>
      {project}–{title}
		</h1>*/}
    <h2>
      <Markdown>{title}</Markdown>
      {subtitle ? (
        <React.Fragment>
          <br />
          {subtitle}
        </React.Fragment>
      ) : null}
    </h2>
    <h3>{author || ""}</h3>
    {date ? <h4>{date}</h4> : null}
  </HeaderSection>
);

export default ReportHeader;

ReportHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
};
