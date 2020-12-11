import styled from "styled-components";

export const MenuWrapper = styled.nav`
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
