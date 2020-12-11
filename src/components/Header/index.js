import React from "react";
import { Link } from "gatsby";
import logo from "./logo.png";
import { HeaderDiv, LogoBlock } from "./elements";

const Header = ({ siteTitle, reportTitle, reportID }) => (
  <HeaderDiv>
    <Link to="/">
      <LogoBlock>
        <img src={logo} alt="NUS Press Singapore" />
      </LogoBlock>
    </Link>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      {reportID ? (
        <h2>
          <Link to={`/${reportID}`}>{reportTitle}</Link>
        </h2>
      ) : null}
    </div>
  </HeaderDiv>
);

export default Header;
