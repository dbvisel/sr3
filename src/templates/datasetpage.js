import React from "react";
import Layout from "./../components/Layout/";
import DataSet from "./../components/Dataset/";
import downloadCSV from "./../modules/downloadCSV";

// TODO: do we set dataset anything else?

export default function DataSetPage({ pageContext }) {
  // console.log(pageContext);
  const { reportData, data } = pageContext;

  let thisPath = `/${reportData.id}/dataset/${data.id}`;
  return (
    <Layout title={data.name} menu={reportData} thisPage={thisPath}>
      <article>
        <DataSet data={data} />
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
                data.fields,
                data.data,
                `${data.reportID}-${data.id}`
              );
            }}
          >
            Download CSV
          </button>
        </p>
      </article>
    </Layout>
  );
}
