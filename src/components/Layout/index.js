import React from "react";
// import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from "gatsby";
import Header from "./../Header/";
import LeftMenu from "./../LeftMenu/";
import Footer from "./../Footer/";
import { ReportContext } from "./../Context/";
import { Main, Wrapper } from "./elements";
import { GlobalStyles } from "./globalStyles.js";

// TODO: this needs to provide report ID to everything in it

const Layout = ({ children, menu, thisPage }) => {
  const masterData = useStaticQuery(graphql`
    query LayoutQuery {
      allTheJson(master: { id: { eq: "master" } }) {
        master {
          id
          lastUpdated
          projectTitle
          projectAuthor
          excluded
          possibleReports {
            name
            id
          }
        }
      }
    }
  `).allTheJson.master;
  return (
    <ReportContext.Provider value={menu.id || null}>
      <GlobalStyles />

      <Header
        siteTitle={masterData.projectTitle}
        reportTitle={menu.title || masterData.projectAuthor}
        reportID={menu.id || null}
      />
      <Main>
        <LeftMenu menuData={menu.id ? menu : masterData} thisPage={thisPage} />
        <Wrapper>{children}</Wrapper>
      </Main>
      <Footer
        updated={menu.lastUpdated || masterData.lastUpdated}
        reportID={menu.id || null}
      />
    </ReportContext.Provider>
  );
};

export default Layout;
