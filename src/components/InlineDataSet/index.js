import React from "react";
import DataSet from "./../Dataset/";
import { DataSetContext } from "./../Context/";

const getMyDataSet = function(dataSets, id) {
  for (let i = 0; i < dataSets.length; i++) {
    if (dataSets[i].id === id) {
      return dataSets[i].data;
    }
  }
};

const InlineDataSet = (props) => {
  return (
    <DataSetContext.Consumer>
      {(dataSets) => {
        let myDataSet = getMyDataSet(dataSets.dataSets, props.id);
        return (
          <div>
            <DataSet
              data={myDataSet}
              hideHeaders={props.hideheaders}
              perPage={props.perPage}
              inLine={true}
            />
          </div>
        );
      }}
    </DataSetContext.Consumer>
  );
};

export default InlineDataSet;
