import styled from "styled-components";

export const BilingualSectionDiv = styled.div`
  border: 1px solid var(--borderColor);
  padding-bottom: 0.5em;
  border-radius: 8px;
  margin-bottom: 1em;
  position: relative;
`;

// TODO: make header sticky?
// TODO: responsive table? https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html
// TODO: modernize this

export const BilingualSectionTop = styled.div`
  padding: 0.5em 1em;
  border-bottom: 1px solid var(--borderColor);
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  background-color: var(--borderColor);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: sticky;
  top: 0;
`;

export const BilingualSectionBottom = styled.div`
  padding: 0 1em;
  display: ${(props) => (props.both ? "flex" : "block")};
  justify-content: space-between;
`;

export const LangSpan = styled.span`
  cursor: pointer;
  font-family: var(--headerFont);
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  & + span {
    margin-left: 1em;
  }
`;

export const LangSection = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  & img {
    max-width: 100%;
    height: auto;
  }
  & > h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child {
    margin-top: 0;
  }
  & > ul:last-child {
    margin-bottom: 0;
  }
  & table {
    width: 100%;
    & thead th {
      background-color: var(--borderColor);
      font-family: var(--headerFont);
      padding: 0.5em !important;
    }
    & tbody td {
      padding: 0.5em !important;
    }
  }
  & ul ul,
  & ol ul {
    margin: 0;
  }
  & .center {
    display: inline-flex;
    width: 100%;
    justify-content: center;
  }
`;
