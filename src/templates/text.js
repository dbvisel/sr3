import * as React from "react";
import { graphql } from "gatsby";
import Layout from "./../components/Layout/";
import { DataSetContext } from "./../components/Context/";
import TextWrapper from "./../components/TextWrapper/";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ReportHeader from "./../components/ReportHeader";

const getFooter = (data, thisReport) => {
  console.log(data, thisReport);
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

const TextPage = ({ data, pageContext }) => {
  console.log(pageContext);
  const { frontmatter, body } = data.pageData;
  const { reportData, dataSets } = pageContext;
  const { title, subtitle } = frontmatter;

  const myFooter = getFooter(
    data.footerData.edges.map((x) => x.node),
    (reportData && reportData.id) || "project"
  );

  return (
    <Layout
      title={frontmatter.title}
      menu={reportData}
      thisPage={frontmatter.path}
      footer={myFooter}
    >
      <ReportHeader
        title={title}
        subtitle={subtitle}
        author={frontmatter.author || reportData.author || ""}
        date={frontmatter.date || reportData.lastUpdated || ""}
      />
      <DataSetContext.Provider value={{ dataSets }}>
        <TextWrapper>
          <MDXRenderer>{body}</MDXRenderer>
        </TextWrapper>
      </DataSetContext.Provider>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($path: String!) {
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
    pageData: mdx(frontmatter: { path: { eq: $path } }) {
      id
      frontmatter {
        path
        title
        subtitle
        author
        date
      }
      body
    }
  }
`;

export default TextPage;
