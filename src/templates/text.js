import React from "react";
import { graphql } from "gatsby";
import Layout from "./../components/Layout/";
import { DataSetContext } from "./../components/Context/";
import TextWrapper from "./../components/TextWrapper/";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import ReportHeader from "./../components/ReportHeader";

const TextPage = ({ data, pageContext }) => {
  const { frontmatter, code } = data.mdx;
  const { reportData, dataSets } = pageContext;
  const { title, subtitle } = frontmatter;
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
        date={reportData.date || frontmatter.date || ""}
      />
      <DataSetContext.Provider value={{ dataSets }}>
        <TextWrapper>
          <MDXRenderer>{code.body}</MDXRenderer>
        </TextWrapper>
      </DataSetContext.Provider>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      id
      frontmatter {
        path
        title
        subtitle
        author
        date
      }
      code {
        body
      }
    }
  }
`;

export default TextPage;
