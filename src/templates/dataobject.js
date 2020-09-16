import React from "react";
import Layout from "./../components/layout";
import DataObjectElement from "./../components/dataobjectelement";

const getDataSetName = function(dataSets, thisID) {
  for (let i = 0; i < dataSets.length; i++) {
    if (thisID === dataSets[i].id) {
      return { dataSetName: dataSets[i].name, dataSetID: dataSets[i].id };
    }
  }
};

export default function DataObjectPage({ pageContext }) {
  const { reportData, dataSet, data } = pageContext;
  const { dataSetName, dataSetID } = getDataSetName(
    reportData.dataSets,
    dataSet
  );
  return (
    <Layout
      title={data.name}
      menu={reportData}
      thisPage={`/${reportData.id}/dataset/${dataSetID}`}
    >
      <article>
        <h1>Dataset: {dataSetName}</h1>
        <DataObjectElement
          objectData={data}
          fieldData={pageContext.fieldData}
          report={reportData.id}
          dataSet={dataSetID}
        />
      </article>
    </Layout>
  );
}
