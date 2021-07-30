const path = require(`path`);
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
  for (let i = 0; i < allAirtableData.length; i++) {
    if (allAirtableData[i].fieldValue === myName) {
      myAirtableData = allAirtableData[i];
    }
  }
  const myFields = data.fields
    .filter((x) => x.fieldKey && x.fieldName)
    .map((x) => {
      return {
        fieldKey: x.fieldKey,
        fieldName: x.fieldName,
        fieldHidden: Boolean(x.fieldHidden), // This is because this was coming in as null
      };
    });
  const myRawData = myAirtableData.nodes.map((x) => x.data);
  // 3. build data from field data looping through selected allAirtableData
  let outputData = [];
  for (let i = 0; i < myRawData.length; i++) {
    let thisRecord = {};
    for (let j = 0; j < myFields.length; j++) {
      thisRecord[myFields[j].fieldKey] =
        myRawData[i][myFields[j].fieldKey] || "";
    }
    outputData[outputData.length] = thisRecord;
  }
  const mySort =
    data.defaultSort || myFields.length ? myFields[0].fieldKey : "";
  return {
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
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const textPageTemplate = path.resolve(`src/templates/text.js`);
  const datasetPageTemplate = path.resolve(`src/templates/datasetpage.js`);
  const datasetItemPageTemplate = path.resolve(`src/templates/dataobject.js`);

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
              isAirtable
              grouping
              defaultSort
              fields {
                fieldKey
                fieldName
                fieldHidden
              }
            }
            texts {
              id
              name
            }
          }
        }
      }
      allAirtableData: allAirtable {
        group(field: table) {
          fieldValue
          nodes {
            data {
              Square_Unit
              Lot
              Depth
              Distance_from_North_South
              Distance_from_East_West
              Excavation_Date
              Type_of_Material
              Type_of_Ware
              Length
              Width
              Thickness
              Number_of_Pieces
              Vessel_Type
              Vessel_Part
              Decoration
              Color__Munsell_Chart_
              Period
              Provenance
              Date_Recorded
              Site
              Remarks
              Unit
              Stratigraphy_Spit
              Breadth_Width
              Diameter__lip_base_
              Percentage_of_lip_base
              Colour__body_
              Colour__exterior_
              Diameter_of_lip_base_measured_
              Percentage_of_lip_base_measured_
              Diameter__throat_
              Percentage_of_throat
              Excavation_Date
              Diameter_measured_
              Percentage_of_throat_measured_
              Quantities_in_number_of_sherds
              Diameter__lip_top_lip_of_knob_
              Percentage_of_rim_or_base
              Diameter__orifice_
              Colour__slip_
              Type
              Total_pieces
              Total_weight
              Hidden_order
              FTC_Salvage__2018_2019__pieces
              FTCSG_Pandan_Bed_pieces
              No_
              Spit
              Archaeological_Unit
              Vessel_Information
              Dimensions_of_sherd__in_cm__1
              Dimensions_of_sherd__in_cm__2
              Dimensions_of_sherd__in_cm__3
              Dimensions_of_sherd__in_cm__4
              Diameter__lip_base_
              Image_Taken_
              Image_File_Name
              Dimensions_of_sherd__in_cm__5
              Diameter
              Diameter__Ext_
              Foot_Height_Thickness
              Quantities_in_Weight
              Weight
              Artefact_Number
              MNV____
              Type
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    // console.log(result.data);
    const masterData = result.data.project.project;
    let textFiles = result.data.textFiles.edges;
    const allAirtableData = result.data.allAirtableData.group;
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
            // TODO: if we are here, the data is coming from Airtable.
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
                outputText += `${dataItem.id}, `;
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
            console.log(outputText);
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
              console.log("Dataset without page: ", thisPath);
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
