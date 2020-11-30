import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const MenuWrapper = styled.nav`
  margin-top: -20px;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid var(--borderColor);
  min-width: 200px;
  max-width: 480px;
  & a {
    text-decoration: none;
    color: var(--black);
    &:hover {
      color: var(--orange);
    }
  }
  & ul {
    margin: 0 0 16px 0;
    & li {
      margin-left: 2em;
      text-indent: -1em;
      font-size: 16px;
      line-height: 22px;
      /* white-space: nowrap; */
      &.selected {
        font-weight: bold;
        color: var(--gray);
      }
    }
  }
  & h2 {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    margin: 0;
  }
  & h3 {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    margin-bottom: 0;
    & + h3 {
      margin-top: 1em;
    }
  }
  & > h3 {
    margin-top: 0;
  }
  & h4 {
    font-size: 16px;
    line-height: 22px;
    font-weight: normal;
    font-style: italic;
    margin: 0;
  }

  @media screen and (max-width: 767px) {
    border-right: none;
    margin-right: 0;
    border-bottom: 1px solid var(--borderColor);
    margin-top: 0;
    padding: 10px;
    margin-bottom: 0;
    max-width: unset;
    & ul li {
      white-space: unset;
    }
  }
`;

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
