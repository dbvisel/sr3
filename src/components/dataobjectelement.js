import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { withPrefix } from "gatsby";

const SuperfieldDiv = styled.div`
  & h3 {
    font-style: italic;
    font-weight: normal;
    font-size: 1em;
    margin-bottom: 0.5em;
  }
  & p span:first-of-type {
    padding-left: ${(props) => (props.indent ? "2em" : "0")};
  }
`;

const DataP = styled.p`
  margin: 0;
  margin-bottom: 1em;
  text-indent: 0;
  display: flex;
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
  flex: 1;
  & a {
    color: var(--orange);
    text-decoration: none;
  }
`;

const FieldImage = styled.img`
  max-width: 100%;
`;

const makeDataView = (inputData, report) => {
  let outputData = [];
  let i = 0;
  while (i < inputData.length) {
    let pushArray = [];
    let superField = inputData[i].superField || null;
    do {
      pushArray.push(inputData[i]);
      i++;
    } while (
      inputData[i] &&
      inputData[i].superField &&
      inputData[i].superField === superField
    );
    outputData.push({ superField: superField, data: pushArray });
  }
  return (
    <div>
      {outputData.map((vvalue, iindex) => {
        return (
          <SuperfieldDiv indent={vvalue.superField} key={iindex}>
            {vvalue.superField ? <h3>{vvalue.superField}</h3> : null}
            {vvalue.data.map((value, index) =>
              value.fieldName && value.value ? (
                <div key={index}>
                  <DataP>
                    <FieldName>{value.fieldName}</FieldName>
                    <FieldValue>
                      {value.link ? (
                        <Link to={value.link}>{value.value}</Link>
                      ) : typeof value.value === "object" ? (
                        value.value.join(", ")
                      ) : (
                        value.value
                      )}
                    </FieldValue>
                  </DataP>

                  {value.fieldType === "filename" && value.value ? (
                    typeof value.value !== "object" ? (
                      <a
                        href={withPrefix(`/${report}/images/${value.value}`)}
                        target="__blank"
                      >
                        <FieldImage
                          src={withPrefix(`/${report}/images/${value.value}`)}
                          alt={value.value}
                        />
                      </a>
                    ) : (
                      <div>
                        {value.value.map((image, imageIndex) => (
                          <a
                            href={withPrefix(`/${report}/images/${image}`)}
                            target="__blank"
                            key={imageIndex}
                            style={{ marginBottom: 16, display: "block" }}
                          >
                            <FieldImage
                              src={withPrefix(`/${report}/images/${image}`)}
                              alt={image}
                            />
                          </a>
                        ))}
                      </div>
                    )
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

const makeOutputData = (report, fieldData, objectData) => {
  const outputData = [];
  for (let i = 0; i < fieldData.length; i++) {
    let valuePair = fieldData[i];
    let thisLink = null;
    if (fieldData[i].fieldType === "imageLink") {
      let linkId = fieldData[i].value;
      let thisImageSetField = fieldData[i].linkToDataSet;
      for (let j = 0; j < fieldData.length; j++) {
        if (fieldData[j].fieldKey === thisImageSetField) {
          thisLink = `/${report}/dataset/${fieldData[j].value}/id/${linkId}`;
        }
      }
    }
    if (objectData[valuePair.fieldKey]) {
      valuePair.value = objectData[valuePair.fieldKey];
      if (thisLink) {
        valuePair.link = thisLink;
      }
    }
    if (!valuePair.fieldHidden) {
      outputData.push(valuePair);
    }
  }
  return outputData;
};

const DataObjectElement = ({ report, fieldData, objectData }) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    // console.log("FieldData changed!");
    // console.log(fieldData[18]);
    setReady(true);
  }, [fieldData]);
  const outputData = makeOutputData(report, fieldData, objectData);
  return ready ? makeDataView(outputData, report) : null;
};
export default DataObjectElement;
