import React from "react";
import Layout from "./../components/layout";
import Dataset from "./../components/dataset";
import downloadCSV from "./../modules/downloadCSV";

// TODO: do we set dataset anything else?

export default function DataSetPage({ pageContext }) {
  const { reportData, data } = pageContext;

  let thisPath = `/${reportData.id}/dataset/${data.id}`;
  return (
    <Layout title={data.name} menu={reportData} thisPage={thisPath}>
      <article>
        <Dataset data={data} />
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
