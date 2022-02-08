import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CardGridWrapper, CardGridCard } from "./elements";

const hideExcludedReports = false;

const CardGrid = () => {
  const data = useStaticQuery(graphql`
    query CardQuery {
      projectData: allTheJson(project: { id: { eq: "project" } }) {
        project {
          excludedReports
          possibleReports {
            id
          }
        }
      }
      reports: allAllTheJson(filter: { report: { title: { ne: null } } }) {
        nodes {
          report {
            author
            id
            doi
            date
            lastUpdated
            title
          }
        }
      }
    }
  `);

  const projectData = data.projectData.project || {
    possibleReports: [],
    excludedReports: [],
  };

  const allTheReports = data.reports.nodes.map((x) => x.report) || [];

  const getReportFromId = (id) =>
    allTheReports.filter((report) => report.id === id)[0];

  const reports = hideExcludedReports
    ? projectData.possibleReports
        .filter((report) => projectData.excludedReports.indexOf(report.id) < 0)
        .map((report) => getReportFromId(report.id))
    : allTheReports;

  const sortedReports = reports.sort((a, b) => {
    const x = new Date(a.lastUpdated);
    const y = new Date(b.lastUpdated);
    if (x > y) return -1;
    if (y > x) return 1;
    return 0;
  });

  return (
    <section>
      <h2>Reports:</h2>
      <CardGridWrapper>
        {sortedReports.map((report, index) => (
          <CardGridCard key={index} color={index}>
            <Link to={`/${report.id}`}>
              <h3>{report.title}</h3>
              <h4>{report.author}</h4>
              <p>Updated: {report.lastUpdated}</p>
            </Link>
          </CardGridCard>
        ))}
      </CardGridWrapper>
    </section>
  );
};

export default CardGrid;
