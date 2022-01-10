import * as React from "react";
import { graphql } from "gatsby";
import Layout from "./../components/Layout/";
import DataSet from "./../components/Dataset/";
import downloadCSV from "./../modules/downloadCSV";

// TODO: do we set dataset anything else?

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

const DataSetPage = ({ data, pageContext }) => {
  // console.log(pageContext);
  const { reportData } = pageContext;
  const pageData = pageContext.data;
  // const out = new Set(data.data.map((x) => x.Type).sort());
  // console.log([...out].join('","'));
  const thisPath = `/${reportData.id}/dataset/${pageData.id}`;

  const myFooter = getFooter(
    data.footerData.edges.map((x) => x.node),
    reportData.id || "project"
  );

  return (
    <Layout
      title={pageData.name}
      menu={reportData}
      thisPage={thisPath}
      footer={myFooter}
    >
      <article>
        <DataSet data={pageData} />
        <p>
          <button
            style={{
              backgroundColor: "var(--orange)",
              borderRadius: "8px",
              borderColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => {
              downloadCSV(
                pageData.fields,
                pageData.data,
                `${pageData.reportID}-${pageData.id}`
              );
            }}
          >
            Download CSV
          </button>
        </p>
      </article>
    </Layout>
  );
};

export default DataSetPage;

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
