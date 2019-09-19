const path = require(`path`);
const fs = require('fs');

const makeReports = true; // set this to false for dev, it's a lot faster!

// from https://www.gatsbyjs.org/docs/schema-customization/

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type allTheJson implements Node @dontInfer {
// 			nodes {
// 				report {
// 					id: String!
// 					author: String!
// 					title: String!
// 					titleShort: String!
// 					projectTitle: String!
// 					lastUpdated: String
// 					dataSets {
// 						id: String!
// 						name: String!
// 						grouping: String
// 					}
// 					texts {
// 						id: String!
// 						name: String!
// 					}
// 				}
// 			}
// 		}
//   `
//   createTypes(typeDefs)
// }

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
		let outData = result.data.textFiles.edges;
		let reportData = result.data.reportData.nodes;

		reportData.forEach((node) => {
			if (node.report && node.report.dataSets) {
				let reportID = node.report.id;
				let reportConfig = loopTheConfigs(reportID, reportData);
				console.log(`${reportID} datasets: ${node.report.dataSets.length}`);
				node.report.dataSets.forEach((dataSet) => {
					let myJsonPath = `./data/${reportID}/datasets/${dataSet.id}.json`;
					let myPath = `${reportID}/dataset/${dataSet.id}`;
					console.log(myJsonPath, '=>', myPath);
					const pageData = JSON.parse(fs.readFileSync(myJsonPath, { encoding: 'utf-8' }));
					let thisFieldSet = pageData.dataset.fields;
					createPage({
						path: myPath,
						component: datasetPageTemplate,
						context: { reportData: reportConfig, data: pageData.dataset }
					});
					if (makeReports) {
						// now, go through pageData.dataset.data and make a page for each data
						pageData.dataset.data.forEach((dataItem) => {
							if (dataItem.id) {
								let myNewPath = `/${reportID}/dataset/${dataSet.id}/id/${dataItem.id}`;
								console.log(`Creating data object page at ${myNewPath}`);
								createPage({
									path: myNewPath,
									component: datasetItemPageTemplate,
									context: {
										dataSet: dataSet.id,
										reportData: reportConfig,
										data: dataItem,
										fieldData: thisFieldSet
									}
								});
							}
						});
					}
				});
			}
		});
		return outData.forEach(({ node }) => {
			let reportConfig = loopTheConfigs(node.frontmatter.report, reportData);
			if (node.frontmatter) {
				if (node.frontmatter.path && node.frontmatter.report) {
					let outDataSets = [];
					if (node.frontmatter.datasets) {
						for (let i = 0; i < node.frontmatter.datasets.length; i++) {
							// figure out path of dataset and get it to attach
							// console.log(node.frontmatter.path);
							let thisPath = `./data/${node.frontmatter.report}/datasets/${node.frontmatter.datasets[i]}.json`;
							const dataSetData = JSON.parse(fs.readFileSync(thisPath, { encoding: 'utf-8' }));
							console.log(thisPath);

							outDataSets.push({
								id: node.frontmatter.datasets[i],
								path: thisPath,
								data: dataSetData.dataset
							});
						}
					}
					createPage({
						path: node.frontmatter.path,
						component: textPageTemplate,
						context: {
							report: node.frontmatter.report,
							reportData: reportConfig,
							dataSets: outDataSets.length > 0 ? outDataSets : null
						} // additional data can be passed via context
					});
					console.log(`Created page ${node.frontmatter.path}`);
				}
			}
		});
	});
};
