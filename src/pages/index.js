import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Layout from "../components/Layout/";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import TextWrapper from "../components/TextWrapper/";

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        mdx(frontmatter: { path: { eq: "project" } }) {
          id
          fileAbsolutePath
          code {
            body
          }
        }
      }
    `}
    render={(data) => {
      return (
        <Layout menu={{}}>
          <TextWrapper>
            <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
          </TextWrapper>
        </Layout>
      );
    }}
  />
);

export default IndexPage;
