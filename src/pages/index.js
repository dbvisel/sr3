import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TextWrapper from "../components/TextWrapper/";

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

const IndexPage = ({ data }) => {
  const myFooter = getFooter(
    data.footerData.edges.map((x) => x.node),
    "project"
  );

  return (
    <Layout menu={{}} footer={myFooter}>
      <TextWrapper>
        <MDXRenderer>{data.indexData.body}</MDXRenderer>
      </TextWrapper>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    indexData: mdx(frontmatter: { path: { eq: "project" } }) {
      id
      fileAbsolutePath
      body
    }
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
