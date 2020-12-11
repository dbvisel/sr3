import React from "react";
import { Link } from "gatsby";
import { MenuWrapper } from "./elements";

const LeftMenu = ({ menuData, thisPage }) => {
  const { id, texts, dataSets, possibleReports } = menuData;
  // console.log(possibleReports, excluded);
  // const includedReports = excluded.length
  //   ? possibleReports.filter((x) => excluded.indexOf(x.id) < 0)
  //   : possibleReports;
  let categories = [null];
  if (dataSets) {
    for (let i = 0; i < dataSets.length; i++) {
      if (dataSets[i].grouping) {
        if (categories.indexOf(dataSets[i].grouping) < 0) {
          categories.push(dataSets[i].grouping);
        }
      }
    }
  }
  return (
    <MenuWrapper>
      {id === "master" ? (
        <React.Fragment>
          <h2>Reports:</h2>
          {possibleReports.map((x, index) => (
            <h4 key={index}>
              <Link to={`/${x.id}`}>{x.name}</Link>
            </h4>
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>
            <Link to={`/${id}/`}>Home</Link>
          </h3>
          {texts ? (
            <React.Fragment>
              <h3>Texts:</h3>
              <ul>
                {texts.map((x, index) => (
                  <li
                    key={index}
                    className={
                      `/${id}/text/${x.id}` === thisPage ? "selected" : null
                    }
                  >
                    <Link to={`/${id}/text/${x.id}`}>{x.name}</Link>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ) : null}
          {dataSets ? (
            <React.Fragment>
              <h3>Datasets:</h3>
              {categories.map((x, index) => (
                <div key={index}>
                  <h4>{x}</h4>
                  <ul>
                    {dataSets.map((y, index2) => {
                      return y.grouping === x ? (
                        <li
                          key={index2}
                          className={
                            `/${id}/dataset/${y.id}` === thisPage
                              ? "selected"
                              : null
                          }
                        >
                          <Link to={`/${id}/dataset/${y.id}`}>{y.name}</Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              ))}
            </React.Fragment>
          ) : null}
        </React.Fragment>
      )}
    </MenuWrapper>
  );
};

export default LeftMenu;
