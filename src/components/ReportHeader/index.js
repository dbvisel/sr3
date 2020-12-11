import React from "react";
import { HeaderSection } from "./elements";

const ReportHeader = ({ project, title, subtitle, author, date }) => (
  <HeaderSection>
    {/*<h1>
      {project}–{title}
		</h1>*/}
    <h2>
      {title}
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
