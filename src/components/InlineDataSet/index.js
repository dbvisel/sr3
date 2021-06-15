import React from "react";
import PropTypes from "prop-types";
import DataSet from "./../Dataset/";
import { DataSetContext } from "./../Context/";

const getMyDataSet = function(dataSets, id) {
  for (let i = 0; i < dataSets.length; i++) {
    if (dataSets[i].id === id) {
      return dataSets[i].data;
    }
  }
};

const InlineDataSet = ({ id, perPage, hideHeaders }) => (
  <DataSetContext.Consumer>
    {(dataSets) => {
      let myDataSet = getMyDataSet(dataSets.dataSets, id);
      return (
        <div>
          <DataSet
            data={myDataSet}
            hideHeaders={Boolean(hideHeaders)}
            perPage={parseInt(perPage, 10) || 50}
            inLine={true}
          />
        </div>
      );
    }}
  </DataSetContext.Consumer>
);

export default InlineDataSet;

InlineDataSet.propTypes = {
  id: PropTypes.string.isRequired,
  perPage: PropTypes.number,
  hideHeaders: PropTypes.bool,
};
