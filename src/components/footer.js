import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const FooterDiv = styled.footer`
  margin-top: 0;
  border-top: 1px solid var(--borderColor);
  padding: 1em 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & a {
    color: black;
    text-decoration: none;
    border-bottom: 2px solid var(--orange);
    &:hover {
      text-decoration: none;
      color: var(--orange);
    }
  }
  & p {
    text-align: center;
    max-width: 1024px;
    margin: 0;

    & + p {
      margin-top: 8px;
    }
  }
`;

//TODO: put in a static query to get footers on a per-site basis (or feed this through layout)
//TODO: figure out how to make React live with "xmlns:cc"

const getFooter = function(data, thisReport) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === thisReport) {
      return data[i].code.body;
    }
  }
  // if no footer file, return the master footer
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === "masterfooter") {
      return data[i].code.body;
    }
  }
  return null;
};

const Footer = ({ reportID }) => {
  const footerQuery = useStaticQuery(graphql`
    query FooterQuery {
      allMdx(filter: { frontmatter: { title: { eq: "footer" } } }) {
        edges {
          node {
            frontmatter {
              report
            }
            code {
              body
            }
          }
        }
      }
    }
  `).allMdx.edges.map((x) => x.node);
  const myFooter = getFooter(footerQuery, reportID || "masterfooter");
  return (
    <FooterDiv>
      {myFooter ? <MDXRenderer>{myFooter}</MDXRenderer> : "No footer!"}
    </FooterDiv>
  );
};

export default Footer;
