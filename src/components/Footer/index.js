import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FooterDiv } from "./elements";

//TODO: figure out how to make React live with "xmlns:cc"

const getDOI = (data, thisReport) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].report.id === thisReport) {
      return data[i].report.doi || null;
    }
  }
  return null;
};

const Footer = ({ reportID, content }) => {
  const footerQuery = useStaticQuery(graphql`
    query FooterQuery {
      allAllTheJson(filter: { report: { doi: { ne: null } } }) {
        edges {
          node {
            report {
              doi
              id
            }
          }
        }
      }
    }
  `);

  const myDOI = getDOI(
    footerQuery.allAllTheJson.edges.map((x) => x.node),
    reportID || "project"
  );
  return (
    <FooterDiv>
      {content ? <MDXRenderer>{content}</MDXRenderer> : null}
      {myDOI ? (
        <p>
          DOI:{" "}
          <em>
            <a href={`https://doi.org/${myDOI}`}>https://doi.org/{myDOI}</a>
          </em>
        </p>
      ) : null}
    </FooterDiv>
  );
};

export default Footer;

Footer.propTypes = {
  reportID: PropTypes.string,
  content: PropTypes.string,
};
