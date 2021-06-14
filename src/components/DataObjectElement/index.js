import React from "react";
import { Link } from "gatsby";
import { withPrefix } from "gatsby";
import {
  SuperfieldDiv,
  DataP,
  FieldName,
  FieldValue,
  FieldImage,
} from "./elements";

// TODO: links back from this page: http://localhost:8000/scc/dataset/drawings/id/drawings_30
// same problem on protogrphs pages

const makeDataView = (inputData, report) => {
  const outputData = [];
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
  // console.log(outputData);
  return (
    <div>
      {outputData.map((vvalue, iindex) => {
        // console.log(vvalue);
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
                        typeof value.link === "object" ? (
                          value.link.map((thisLink, index) => (
                            <React.Fragment key={index}>
                              <Link to={thisLink}>{value.value[index]}</Link>
                              {index < value.link.length ? ", " : ""}
                            </React.Fragment>
                          ))
                        ) : (
                          <Link to={value.link}>{value.value}</Link>
                        )
                      ) : typeof value.value === "object" ? (
                        value.value.join(", ")
                      ) : (
                        <React.Fragment>
                          {value.value} {value.fieldUnit ? value.fieldUnit : ""}
                        </React.Fragment>
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
          if (typeof fieldData[j].value === "object") {
            // console.log(fieldData[j].value, linkId);
            thisLink = fieldData[j].value.map(
              (thisValue, index) =>
                `/${report}/dataset/${thisValue}/id/${linkId[index]}`
            );
          } else {
            thisLink = `/${report}/dataset/${fieldData[j].value}/id/${linkId}`;
          }
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
