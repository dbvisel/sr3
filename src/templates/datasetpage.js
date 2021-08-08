import * as React from "react";
import Layout from "./../components/Layout/";
import DataSet from "./../components/Dataset/";
import downloadCSV from "./../modules/downloadCSV";

// TODO: do we set dataset anything else?

const DataSetPage = ({ pageContext }) => {
  // console.log(pageContext);
  const { reportData, data } = pageContext;
  // console.log(new Set(data.data.map((x) => x.Colour__body_).sort()));
  const thisPath = `/${reportData.id}/dataset/${data.id}`;

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
};

export default DataSetPage;
