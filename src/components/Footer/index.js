import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { FooterDiv } from "./elements";

//TODO: put in a static query to get footers on a per-site basis (or feed this through layout)
//TODO: figure out how to make React live with "xmlns:cc"

const getFooter = function(data, thisReport) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === thisReport) {
      return data[i].code.body;
    }
  }
  // if no footer file, return the project footer
  for (let i = 0; i < data.length; i++) {
    if (data[i].frontmatter.report === "project") {
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
  const myFooter = getFooter(footerQuery, reportID || "project");
  return (
    <FooterDiv>
      {myFooter ? <MDXRenderer>{myFooter}</MDXRenderer> : "No footer!"}
    </FooterDiv>
  );
};

export default Footer;

Footer.propTypes = {
  reportID: PropTypes.string,
};
