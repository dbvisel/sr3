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
  const projectData = useStaticQuery(graphql`
    query LayoutQuery {
      allTheJson(project: { id: { eq: "project" } }) {
        project {
          id
          lastUpdated
          projectTitle
          projectAuthor
          possibleReports {
            name
            id
          }
        }
      }
    }
  `).allTheJson.project;
  // console.log(menu);
  return (
    <ReportContext.Provider value={menu.id || null}>
      <GlobalStyles />

      <Header
        siteTitle={projectData.projectTitle}
        reportTitle={menu.title || projectData.projectAuthor}
        reportID={menu.id || null}
      />
      <Main>
        <LeftMenu menuData={menu.id ? menu : projectData} thisPage={thisPage} />
        <Wrapper>{children}</Wrapper>
      </Main>
      <Footer
        updated={menu.lastUpdated || projectData.lastUpdated}
        reportID={menu.id || null}
      />
    </ReportContext.Provider>
  );
};

export default Layout;
