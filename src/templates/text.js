import * as React from "react";
import { graphql } from "gatsby";
import Layout from "./../components/Layout/";
import { DataSetContext } from "./../components/Context/";
import TextWrapper from "./../components/TextWrapper/";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ReportHeader from "./../components/ReportHeader";

const TextPage = ({ data, pageContext }) => {
  // console.log(data, pageContext);
  const { frontmatter, body } = data.mdx;
  const { reportData, dataSets } = pageContext;
  const { title, subtitle } = frontmatter;
  // console.log(reportData);
  return (
    <Layout
      title={frontmatter.title}
      menu={reportData}
      thisPage={frontmatter.path}
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
    mdx(frontmatter: { path: { eq: $path } }) {
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
