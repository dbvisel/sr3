import React from 'react';
import styled from 'styled-components';

const DataP = styled.p`
	margin: 0;
`;

const FieldName = styled.span`
	display: inline-block;
	width: 150px;
	font-weight: bold;
	margin-right: 16px;
`;

const FieldValue = styled.span``;

const FieldImage = styled.img`
	max-width: 100%;
`;

const DataObjectElement = props => {
	// console.log(props.objectData);
	// console.log(props.fieldData);
	// console.log(props.dataSet);
	// console.log(props.report);

	// build a new object, then display it.
	// TODO: deal with superfields
	// TODO: styling?
	const outputData = [];
	for (let i = 0; i < props.fieldData.length; i++) {
		let valuePair = props.fieldData[i];
		if (props.objectData[valuePair.fieldKey]) {
			valuePair.value = props.objectData[valuePair.fieldKey];
		}
		if (!valuePair.fieldHidden) {
			outputData.push(valuePair);
		}
	}
	return (
		<div>
			{outputData.map((value, index) =>
				value.fieldName ? (
					<div key={index}>
						<DataP>
							<FieldName>{value.fieldName}</FieldName>
							<FieldValue>{value.value}</FieldValue>
						</DataP>
						{value.fieldType === 'filename' ? (
							<a href={`/${props.report}/images/${value.value}`} target="__blank">
								<FieldImage src={`/${props.report}/images/${value.value}`} alt={value.value} />
							</a>
						) : null}
					</div>
				) : null
			)}
		</div>
	);
};
export default DataObjectElement;
