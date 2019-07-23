import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const SuperfieldDiv = styled.div`
	& h3 {
		font-style: italic;
		font-weight: normal;
		font-size: 1em;
		margin-bottom: 0.5em;
	}
	& p span:first-of-type {
		padding-left: ${props => (props.indent ? '2em' : '0')};
	}
`;

const DataP = styled.p`
	margin: 0;
	margin-bottom: 1em;
	text-indent: 0;
`;

const FieldName = styled.span`
	font-family: var(--headerFont);
	font-weight: normal;
	display: inline-block;
	width: 300px;
	margin-right: 16px;
	box-sizing: border-box;
`;

const FieldValue = styled.span`
	& a {
		color: var(--orange);
		text-decoration: none;
	}
`;

const FieldImage = styled.img`
	max-width: 100%;
`;

const makeDataView = function(inputData, report) {
	let outputData = [];
	let i = 0;
	while (i < inputData.length) {
		let pushArray = [];
		let superField = inputData[i].superField || null;
		do {
			pushArray.push(inputData[i]);
			i++;
		} while (inputData[i] && inputData[i].superField && inputData[i].superField === superField);
		outputData.push({ superField: superField, data: pushArray });
	}
	return (
		<div>
			{outputData.map((vvalue, iindex) => {
				return (
					<SuperfieldDiv indent={vvalue.superField} key={iindex}>
						{vvalue.superField ? <h3>{vvalue.superField}</h3> : null}
						{vvalue.data.map((value, index) =>
							value.fieldName ? (
								<div key={index}>
									<DataP>
										<FieldName>{value.fieldName}</FieldName>
										<FieldValue>{value.link ? <Link to={value.link}>{value.value}</Link> : value.value}</FieldValue>
									</DataP>

									{value.fieldType === 'filename' ? (
										<a href={`/${report}/images/${value.value}`} target="__blank">
											<FieldImage src={`/${report}/images/${value.value}`} alt={value.value} />
										</a>
									) : null}
								</div>
							) : null
						)}
					</SuperfieldDiv>
				);
			})}
		</div>
	);
};

const DataObjectElement = props => {
	const outputData = [];
	for (let i = 0; i < props.fieldData.length; i++) {
		let valuePair = props.fieldData[i];
		let thisLink = null;
		if (props.fieldData[i].fieldType === 'imagelink') {
			let thisImageSetField = props.fieldData[i].linkToDataSet;
			for (let j = 0; j < props.fieldData.length; j++) {
				if (props.fieldData[j].fieldKey === thisImageSetField) {
					thisLink = `/${props.report}/dataset/${props.fieldData[j].value}/id/${props.fieldData[i].value}`;
				}
			}
		}
		if (props.objectData[valuePair.fieldKey]) {
			valuePair.value = props.objectData[valuePair.fieldKey];
			if (thisLink) {
				valuePair.link = thisLink;
			}
		}
		if (!valuePair.fieldHidden) {
			outputData.push(valuePair);
		}
	}
	return makeDataView(outputData, props.report);
};
export default DataObjectElement;
