import styled from "styled-components";

export const TextWrapperDiv = styled.article`
  max-width: 800px;
  padding-right: 20px;
  width: 100%;
  padding-bottom: 32px;
  @media screen and (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  & p {
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    & strong {
      font-size: 16px;
    }
    & + p {
      text-indent: 24px;
    }
    &.unindent {
      text-indent: 0;
    }
  }
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--headerFont);
    margin: 0;
    & + ul {
      margin-top: 0;
    }
  }
  & h1 {
    font-size: 2em;
    line-height: 1.2em;
    margin: 1em 0 0.25em 0;
  }
  & h2 {
    font-size: 1.5em;
    line-height: 1.2em;
    margin: 1em 0 0.25em 0;
  }
  & h3 {
    font-size: 1.25em;
    line-height: 1.2em;
    margin: 1em 0 0.25em 0;
  }
  & h4,
  h5,
  h6 {
    font-size: 1em;
    margin-top: 1em;
  }
  & h6 {
    font-family: var(--headerFont);
    font-style: italic;
    font-weight: normal;
  }
  & ul {
    font-size: 14px;
    line-height: 24px;
    margin: 24px 0;
    padding-inline-start: 24px;
  }
  & li {
    margin: 0;
    & strong {
      font-size: 16px;
    }
    & ul {
      margin-left: 24px;
      margin-left: 1rem;
      margin: 0;
    }
  }
  & hr {
    margin: 32px 25%;
    border-top: 1px solid var(--black);
  }
  & blockquote {
    margin-left: 1em;
    & p + p {
      text-indent: 0;
    }
  }
  & strong {
    font-family: var(--headerFont);
  }
  & a {
    color: var(--black);
    text-decoration: none;
    border-bottom: 2px solid var(--orange);
    &:hover {
      text-decoration: none;
      color: var(--black);
    }
  }
  & strong {
    font-family: var(--headerFont);
  }
  &.bibliography {
    & p {
      margin-left: 2em;
      margin-left: 2em;
      text-indent: -2em;
      text-indent: -2rem;
      margin-bottom: 1em;
      margin-bottom: 1rem;
    }
  }
  & table:not(.dataset) {
    margin: 1em 0;
    margin: 1rem 0;
    & th {
      font-family: $headerfamily;
      font-weight: bold;
      text-align: left;
    }
    & tbody tr + tr,
    tbody tr:first-of-type {
      border-top: 1px solid #ccc;
    }
    & td,
    th {
      padding: 0.25em 1em;
      padding: 0.25rem 1rem;
      &:first-of-type {
        padding-left: 0;
      }
    }
  }
  .footnotecallout {
    position: relative;
    font-size: 0.75em;
    bottom: 0.5em;
    &::before {
      content: attr(data-footnote-id);
    }
  }

  & .footnote {
    margin-left: 2em;
    margin-top: 1em;
    &:before {
      display: inline-block;
      position: relative;
      left: -2em;
      width: 0;
      content: attr(data-footnote-id); //    margin-right: 1em;
    }
    + .footnote {
      margin-top: 0;
    }
  }
`;
