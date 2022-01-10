import * as React from "react";
import { Link, withPrefix, graphql } from "gatsby";
import Layout from "./../components/Layout/";
import DataObjectElement from "./../components/DataObjectElement/";

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

const getDataSetName = function (dataSets, thisID) {
  for (let i = 0; i < dataSets.length; i++) {
    if (thisID === dataSets[i].id) {
      return { dataSetName: dataSets[i].name, dataSetID: dataSets[i].id };
    }
  }
};

// TODO: Why is this getting the short name of the dataset?

const DataObjectPage = ({ data, pageContext }) => {
  const { reportData, dataSet } = pageContext;
  const pageData = pageContext.data;
  const { dataSetName, dataSetID } = getDataSetName(
    reportData.dataSets,
    dataSet
  );

  const myFooter = getFooter(
    data.footerData.edges.map((x) => x.node),
    reportData.id || "project"
  );

  return (
    <Layout
      title={pageData.name}
      menu={reportData}
      thisPage={`/${reportData.id}/dataset/${dataSetID}`}
      footer={myFooter}
    >
      <article>
        <h1>
          Dataset:{" "}
          <Link to={withPrefix(`/${reportData.id}/dataset/${dataSetID}/`)}>
            {dataSetName}
          </Link>
        </h1>
        <DataObjectElement
          objectData={pageData}
          fieldData={pageContext.fieldData}
          report={reportData.id}
          dataSet={dataSetID}
        />
      </article>
    </Layout>
  );
};

export default DataObjectPage;

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
