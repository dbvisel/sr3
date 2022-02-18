import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { CardGridWrapper, CardGridCard, LocationList } from "./elements";
import ReactEChart from "./ReactEChart";
import chartsvg from "../../../static/chart/Map_of_Iceland.svg";

const option = {
  tooltip: {},
  geo: {
    tooltip: {
      show: true,
    },
    map: "chartsvg",
    roam: true,
  },
  series: {
    type: "custom",
    coordinateSystem: "geo",
    geoIndex: 0,
    zlevel: 1,
    data: [
      [488.2358421078053, 459.70913833075736, 100],
      [770.3415644319939, 757.9672194986475, 30],
      [1180.0329284196291, 743.6141808346214, 80],
      [894.03790632245, 1188.1985153835008, 61],
      [1372.98925630313, 477.3839988649537, 70],
      [1378.62251255796, 935.6708486282843, 81],
    ],
    renderItem(params, api) {
      const coord = api.coord([
        api.value(0, params.dataIndex),
        api.value(1, params.dataIndex),
      ]);
      const circles = [];
      for (let i = 0; i < 5; i++) {
        circles.push({
          type: "circle",
          shape: {
            cx: 0,
            cy: 0,
            r: 30,
          },
          style: {
            stroke: "red",
            fill: "none",
            lineWidth: 2,
          },
          // Ripple animation
          keyframeAnimation: {
            duration: 4000,
            loop: true,
            delay: (-i / 4) * 4000,
            keyframes: [
              {
                percent: 0,
                scaleX: 0,
                scaleY: 0,
                style: {
                  opacity: 1,
                },
              },
              {
                percent: 1,
                scaleX: 1,
                scaleY: 0.4,
                style: {
                  opacity: 0,
                },
              },
            ],
          },
        });
      }
      return {
        type: "group",
        x: coord[0],
        y: coord[1],
        children: [
          ...circles,
          {
            type: "path",
            shape: {
              d: "M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z",
              x: -10,
              y: -35,
              width: 20,
              height: 40,
            },
            style: {
              fill: "red",
            },
            // Jump animation.
            keyframeAnimation: {
              duration: 1000,
              loop: true,
              delay: Math.random() * 1000,
              keyframes: [
                {
                  y: -10,
                  percent: 0.5,
                  easing: "cubicOut",
                },
                {
                  y: 0,
                  percent: 1,
                  easing: "bounceOut",
                },
              ],
            },
          },
        ],
      };
    },
  },
};

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
          useVisualToc
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

  return projectData.useVisualToc ? (
    <section>
      <ReactEChart
        option={option}
        style={{ height: "700px", width: "100%" }}
        svg={chartsvg}
      />
      <h2 style={{ textAlign: "center", margin: "25px 0" }}>Reports:</h2>
      <LocationList>
        <li>
          <strong>Location</strong>
        </li>
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
  ) : null;
};

export default CardGrid;
