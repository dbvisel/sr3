import React from 'react';
import Dataset from './../components/dataset';
import DataSetContext from './../components/datasetcontext';

const getMyDataSet = function(dataSets, id) {
	console.log(dataSets);
	for (let i = 0; i < dataSets.length; i++) {
		if (dataSets[i].id === id) {
			return dataSets[i].data;
		}
	}
};

const InlineDataSet = props => {
	console.log(props);
	return (
		<DataSetContext.Consumer>
			{dataSets => {
				let myDataSet = getMyDataSet(dataSets.dataSets, props.id);
				return (
					<div>
						<Dataset data={myDataSet} hideHeaders={props.hideheaders} perPage={props.perPage} inLine={true} />
					</div>
				);
			}}
		</DataSetContext.Consumer>
	);
};

export default InlineDataSet;
