import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CardGridWrapper, CardGridCard, LocationList } from "./elements";

const colors = {
  Singapore: "#e8e800",
  Indonesia: "#00fafa",
  Myanmar: "#ffd3ff",
  other: "#ffdab6",
};

const getColor = (index) => (colors[index] ? colors[index] : colors["other"]);

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
            location
            lastUpdated
            title
            image
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

  const locations = new Set(sortedReports.map((report) => report.location));

  return (
    <section>
      <h2 style={{ textAlign: "center", margin: "25px 0" }}>Reports:</h2>
      <LocationList>
        {[...locations].map((location, index) => (
          <li key={index}>
            <span style={{ backgroundColor: getColor(location) }} />
            {location}
          </li>
        ))}
      </LocationList>
      <CardGridWrapper>
        <div>
          {sortedReports.map((report, index) => (
            <CardGridCard
              key={index}
              color={getColor(report.location)}
              image={`/${report.id}/images/${report.image}`}
            >
              <Link to={`/${report.id}`}>
                <h3>{report.title}</h3>
                <h4>{report.date || report.lastUpdated}</h4>
                <p>&gt;&gt; Report</p>
              </Link>
            </CardGridCard>
          ))}
        </div>
      </CardGridWrapper>
    </section>
  );
};

export default CardGrid;
