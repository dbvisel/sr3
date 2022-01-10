import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "./../components/Layout/";

import TextWrapper from "./../components/TextWrapper/";

const getFooter = (data, thisReport) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === thisReport) {
      return data[i].body;
    }
  }
  // if no footer file, return the project footer
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === "project") {
      return data[i].body;
    }
  }
  return null;
};

const NotFoundPage = ({ data }) => {
  const myFooter = getFooter(
    data.footerData.edges.map((x) => x.node),
    "project"
  );

  return (
    <Layout title="404" menu={{}} footer={myFooter}>
      <TextWrapper>
        <h1>Nothing was found!</h1>
        <p>
          Try looking at one of the reports? Or go to the{" "}
          <Link to="/">home page</Link>.
        </p>
      </TextWrapper>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    footerData: allMdx(filter: { frontmatter: { title: { eq: "footer" } } }) {
      edges {
        node {
          frontmatter {
            report
          }
          body
        }
      }
    }
  }
`;
