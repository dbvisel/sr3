const path = require(`path`);
const fs = require("fs");

// REMEMBER:

// in master config.js, set "makeReport" to true to make pages

const loopTheConfigs = function(reportID, configData) {
  if (reportID) {
    for (let i = 0; i < configData.length; i++) {
      if (configData[i].report !== null) {
        if (configData[i].report.id === reportID) {
          return configData[i].report;
        }
      }
    }
  }
  return null;
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const textPageTemplate = path.resolve(`src/templates/text.js`);
  const datasetPageTemplate = path.resolve(`src/templates/datasetpage.js`);
  const datasetItemPageTemplate = path.resolve(`src/templates/dataobject.js`);

  return graphql(`
    {
      master: allTheJson(master: { id: { eq: "master" } }) {
        master {
          excluded
          possibleReports {
            id
          }
          makeReports
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
            date
            author
            title
            titleShort
            projectTitle
            lastUpdated
            dataSets {
              id
              name
              grouping
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
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    // console.log(result.data);
    const masterData = result.data.master.master;
    let textFiles = result.data.textFiles.edges;
    let reportData = result.data.reportData.nodes.filter(
      (x) => x.report !== null
    );

    // First, deal with all the datasets
    // If a report's ID is in "excluded" in "config.json", pages are NOT made.

    reportData.forEach((node) => {
      if (
        node.report &&
        node.report.dataSets &&
        masterData.excluded.indexOf(node.report.id) < 0
      ) {
        let reportID = node.report.id;
        let reportConfig = loopTheConfigs(reportID, reportData);
        console.log(`${reportID} datasets: ${node.report.dataSets.length}`);
        node.report.dataSets.forEach((dataSet) => {
          let myJsonPath = `./data/${reportID}/datasets/${dataSet.id}.json`;
          let myPath = `${reportID}/dataset/${dataSet.id}`;
          console.log(myJsonPath, "=>", myPath);
          const pageData = JSON.parse(
            fs.readFileSync(myJsonPath, { encoding: "utf-8" })
          );
          let thisFieldSet = pageData.dataset.fields;
          createPage({
            path: myPath,
            component: datasetPageTemplate,
            context: { reportData: reportConfig, data: pageData.dataset },
          });
          if (masterData.makeReports) {
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
        masterData.excluded.indexOf(node.frontmatter.report) < 0
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
