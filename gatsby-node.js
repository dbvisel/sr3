const path = require("path");
const fs = require("fs");

// REMEMBER:

// in master config.js, set "makeReport" to true to make pages

// const deNull = (x, changeTo = false) => (x === null ? changeTo : x);

const loopTheConfigs = function (reportID, configData) {
  if (reportID) {
    for (let i = 0; i < configData.length; i++) {
      if (configData[i].report !== null) {
        if (configData[i].report.id === reportID) {
          return configData[i].report;
        }
      }
    }
  }
  // console.log("no config found!", reportID);
  return null;
};

const makeDatasetFromAirtable = (data, allAirtableData, reportID) => {
  console.log("Making airtable dataset");
  // 1. get field data from data
  const myName = data.airtableName || data.name;
  // 2. select relevant part of allAirtableData
  let myAirtableData;
  if (data.isAirtableMultiple) {
    // if we have more than one set in a section, concat them.
    myAirtableData = { fieldName: data.airtableNames[0], nodes: [] };
    const myNames = data.airtableNames;
    for (let i = 0; i < allAirtableData.length; i++) {
      if (myNames.indexOf(allAirtableData[i].fieldValue) > -1) {
        myAirtableData.nodes = myAirtableData.nodes.concat(
          allAirtableData[i].nodes
        );
      }
    }
  } else {
    for (let i = 0; i < allAirtableData.length; i++) {
      if (allAirtableData[i].fieldValue === myName) {
        myAirtableData = allAirtableData[i];
      }
    }
  }
  const myFields = data.fields
    .filter((x) => x.fieldKey && x.fieldName)
    .map((x) => {
      const output = { fieldKey: x.fieldKey, fieldName: x.fieldName };
      if (x.fieldHidden) {
        output.fieldHidden = Boolean(x.fieldHidden);
      }
      if (x.fieldUnit) {
        output.fieldUnit = x.fieldUnit;
      }
      if (x.fieldType) {
        output.fieldType = x.fieldType;
      }
      if (x.fieldValues) {
        output.fieldValues = x.fieldValues;
      }
      return output;
    });
  const myRawData = myAirtableData.nodes.map((x) => x.data);
  // 3. build data from field data looping through selected allAirtableData
  let outputData = [];
  for (let i = 0; i < myRawData.length; i++) {
    let thisRecord = { id: i + 1 };
    for (let j = 0; j < myFields.length; j++) {
      thisRecord[myFields[j].fieldKey] =
        myRawData[i][myFields[j].fieldKey] || "";
    }
    outputData[outputData.length] = thisRecord;
  }
  const mySort =
    data.defaultSort || myFields.length ? myFields[0].fieldKey : "";

  const output = {
    reportID: reportID,
    defaultSort: mySort,
    name: data.name,
    id: data.id,
    data: outputData.sort((a, b) => {
      if (a[mySort] > b[mySort]) {
        return 1;
      }
      if (a[mySort] < b[mySort]) {
        return -1;
      }
      return 0;
    }),
    fields: myFields,
  };
  // START OF SECTION WHICH EXPORTS

  const downloadAirtableDatasets = false;

  if (downloadAirtableDatasets) {
    const filename =
      __dirname + "/data/" + reportID + "/datasets/" + data.id + ".json";

    if (fs.existsSync(filename)) {
      console.log("This already exists: ", filename);
    } else {
      console.log("Will write to: ", filename);
      fs.writeFile(filename, JSON.stringify({ dataset: output }), (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    }
  }

  // END OF SECTION WHICH EXPORTS
  return output;
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const textPageTemplate = path.resolve("src/templates/text.js");
  const datasetPageTemplate = path.resolve("src/templates/datasetpage.js");
  const datasetItemPageTemplate = path.resolve("src/templates/dataobject.js");

  return graphql(`
    {
      project: allTheJson(project: { id: { eq: "project" } }) {
        project {
          excludedReports
          possibleReports {
            id
          }
          makeObjectPages
        }
      }
      textFiles: allMdx {
        edges {
          node {
            id
            frontmatter {
              path
              report
              title
              date
              subtitle
              datasets
            }
          }
        }
      }
      reportData: allAllTheJson {
        nodes {
          report {
            id
            lastUpdated
            author
            title
            dataSets {
              id
              name
              airtableName
              airtableNames
              isAirtable
              isAirtableMultiple
              grouping
              defaultSort
              fields {
                fieldKey
                fieldName
                fieldHidden
                fieldType
                fieldUnit
                fieldValues
              }
            }
            texts {
              id
              name
            }
          }
        }
      }
    }
  `).then((result) => {
    // allAirtableData: allAirtable {
    //   group(field: table) {
    //     fieldValue
    //     nodes {
    //       data {
    //         Artifact_Number
    //         Depth__cm_
    //         Color_Exterior_Earthenware__Munsell_
    //         Color_Interior_Earthenware__Munsell_
    //         Color_Profile_Earthenware__Munsell_
    //         Date_of_excavation
    //         Diameter__cm_
    //         Length__cm_
    //         Height_of_foot_rim__cm_
    //         Form
    //         MNV____
    //         Lot
    //         Level
    //         Type_of_Ware
    //         Width__cm_
    //         Weight__g_
    //         Vessel_Part
    //         Varieties_of_Material
    //         Unit_Number
    //         Thickness_of_base__complete_profile___cm_
    //         Thickness__foot_rim___cm_
    //         Thickness__cm_
    //         Spit
    //         Provenance
    //         Remarks
    //         Period
    //         Number_of_pieces
    //         Material
    //         Thickness_of_base__complete_profile___cm_
    //         Color_Exterior_Earthenware__Munsell_
    //         Color_Interior_Earthenware__Munsell_
    //         Color_Profile_Earthenware__Munsell_
    //       }
    //     }
    //   }
    // }

    // Filename

    if (result.errors) {
      return Promise.reject(result.errors);
    }
    // console.log(result.data);
    const masterData = result.data.project.project;
    let textFiles = result.data.textFiles.edges;

    const allAirtableData = result.data.allAirtableData
      ? result.data.allAirtableData.group
      : []; /*{ nodes: [] }; */
    let reportData = result.data.reportData.nodes.filter(
      (x) => x.report !== null
    );

    // First, deal with all the datasets
    // If a report's ID is in "excluded" in "config.json", pages are NOT made.

    reportData.forEach((node) => {
      if (
        node.report &&
        node.report.dataSets &&
        masterData.excludedReports.indexOf(node.report.id) < 0
      ) {
        let reportID = node.report.id;
        let reportConfig = loopTheConfigs(reportID, reportData);

        console.log(`${reportID} datasets: ${node.report.dataSets.length}`);
        node.report.dataSets.forEach((dataSet) => {
          let myJsonPath = `./data/${reportID}/datasets/${dataSet.id}.json`;
          let myPath = `${reportID}/dataset/${dataSet.id}`;
          console.log(myJsonPath, "=>", myPath);
          let pageData;
          // check if the report is local
          if (!dataSet.isAirtable) {
            pageData = JSON.parse(
              fs.readFileSync(myJsonPath, { encoding: "utf-8" })
            );
          } else {
            console.log("Airtable dataset!");
            // if we are here, the data is coming from Airtable.
            // assemble it from the GraphQL and the stub.
            pageData = {
              dataset: makeDatasetFromAirtable(
                dataSet,
                allAirtableData,
                reportID
              ),
            };
          }
          let thisFieldSet = pageData.dataset.fields;
          createPage({
            path: myPath,
            component: datasetPageTemplate,
            context: { reportData: reportConfig, data: pageData.dataset },
          });
          if (masterData.makeObjectPages) {
            // now, go through pageData.dataset.data and make a page for each data
            let outputText = `Created data object pages for /${reportID}/dataset/${dataSet.id}/id/`;
            pageData.dataset.data.forEach((dataItem) => {
              if (dataItem.id) {
                let myNewPath = `/${reportID}/dataset/${dataSet.id}/id/${dataItem.id}`;
                outputText = outputText + `${dataItem.id}, `;
                // console.log(`Creating data object page at ${myNewPath}`);
                createPage({
                  path: myNewPath,
                  component: datasetItemPageTemplate,
                  context: {
                    dataSet: dataSet.id,
                    reportData: reportConfig,
                    data: dataItem,
                    fieldData: thisFieldSet,
                  },
                });
              }
            });
            // console.log(outputText);
          }
        });
      }
    });

    // next, deal with text files

    return textFiles.forEach(({ node }) => {
      // check and see if it's in the excluded list; if it is, don't make pages
      if (
        node.frontmatter &&
        node.frontmatter.report &&
        masterData.excludedReports.indexOf(node.frontmatter.report) < 0
      ) {
        let reportConfig = loopTheConfigs(node.frontmatter.report, reportData);
        if (node.frontmatter.path && node.frontmatter.report) {
          let outDataSets = [];
          if (node.frontmatter.datasets) {
            for (let i = 0; i < node.frontmatter.datasets.length; i++) {
              // figure out path of dataset and get it to attach
              // console.log(node.frontmatter.path);
              let thisPath = `./data/${node.frontmatter.report}/datasets/${node.frontmatter.datasets[i]}.json`;
              const dataSetData = JSON.parse(
                fs.readFileSync(thisPath, { encoding: "utf-8" })
              );
              console.log(
                `Inline dataset: ${thisPath}, in: ${node.frontmatter.path}`
              );
              outDataSets.push({
                id: node.frontmatter.datasets[i],
                path: thisPath,
                data: dataSetData.dataset,
              });
            }
          }
          createPage({
            path: node.frontmatter.path,
            component: textPageTemplate,
            context: {
              // pathy: node.frontmatter.path,
              report: node.frontmatter.report,
              reportData: reportConfig,
              dataSets: outDataSets.length > 0 ? outDataSets : null,
            }, // additional data can be passed via context
          });
          console.log(`Created page ${node.frontmatter.path}`);
        }
      }
    });
  });
};
