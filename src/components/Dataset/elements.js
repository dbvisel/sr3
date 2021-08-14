import styled from "styled-components";

// TODO: Do we need a fallback for when Grid doesn't work?

export const TableNav = styled.nav`
  position: ${(props) => (props.bottom ? "initial" : "sticky")};
  top: ${(props) => (props.bottom ? "intitial" : 0)};
  background-color: var(--white);
  padding-bottom: 1em;
  z-index: 2;
`;

export const DatasetHeader = styled.div`
  display: block;
  text-align: left;
`;

export const DataSetH1 = styled.h1`
  /* why are we passing this isInline? */
  margin: 0;
`;

export const FilterP = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-items: center;
  margin-top: 1em;
  & p {
    margin: 0;
    user-select: none;
    & a {
      text-decoration: none;
      font-weight: bold;
      color: var(--black);
    }
  }
  & form {
    font-family: var(--headerFont);
    & input[type="text"] {
      border: 1px solid var(--borderColor);
      font-family: var(--headerFont);
      font-size: 1em;
      padding: 1px 3px;
    }
    & input[type="submit"] {
      cursor: pointer;
      margin-left: 8px;
      font-size: 1em;
      color: var(--black);
      font-weight: bold;
      background-color: var(--orange);
      border-radius: 6px;
      border: none;
      outline: none;
      padding: 3px 8px;
      &:hover {
        color: var(--borderColor);
      }
    }
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    & p {
      margin-bottom: 1em;
    }
  }
`;

export const PaginationP = styled.nav`
  margin-top: 1em;
  user-select: none;
`;

export const Arrow = styled.span`
  cursor: ${(props) => (props.grayOut ? "default" : "pointer")};
  user-select: none;
  color: ${(props) => (props.grayOut ? "var(--borderColor)" : "var(--black)")};
  &:hover {
    color: ${(props) =>
      props.grayOut ? "var(--borderColor)" : "var(--orange)"};
  }
`;

export const StrongLink = styled.span`
  font-family: var(--headerFont);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: var(--orange);
  }
`;

export const DataTableWrapper = styled.div`
  padding-bottom: 1em;
  max-width: 100%;
  max-width: calc(100vw - 200px);
  position: relative;
  overflow-x: scroll;
  --textCellWidth: 400px;
`;

//export const DataTable = styled.table`
export const DataTable = styled.div`
  position: relative;
`;

export const DataTableHead = styled.div`
  /* position: sticky;
	top: 0;
	z-index: 3; */
`;

//export const THNoWrap = styled.th`
export const THNoWrap = styled.span`
  white-space: nowrap;
  font-weight: bold;
  font-family: var(--headerFont);
  padding: 0 4px;
  background-color: ${(props) => (props.empty ? "white" : "#ddd")};
  cursor: pointer;
  position: sticky;
  user-select: none;
  grid-column: span ${(props) => props.columnSpan || 1};
  text-align: center;
  /* top: ${(props) =>
    props.hideHeaders ? "3em" : props.doubleHeaders ? "6em" : "5em"};
	&:before {
		content: '';
		position: absolute;
		background-color: var(--white);
		left: 0;
		top: ${(props) => (props.superHeaders ? "-5em" : "-6em")};
		width: 100%;
		height: 5em;
	} */
`;

export const SortBy = styled.span`
  margin-left: 0.25em;
  margin-right: 0.5em;
  display: inline-flex;
  height: 100%;
  align-content: center;
  user-select: none;
`;

export const TableSelect = styled.select`
  border: none;
  background: none;
  height: 100%;
  font-family: var(--headerFont);
  font-weight: bold;
  font-size: 16px;
  outline: none;
  appearance: none;
  & option {
    font-weight: normal;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columnWidths
      ? props.columnWidths
      : `repeat(${props.columns}, minmax(100px, 1fr))`};
  &.initializing {
    display: none;
  }
`;

//export const TableCell = styled.td`
export const TableCell = styled.span`
  white-space: nowrap;
  overflow-x: hidden;
  text-align: center;
  font-family: var(--headerFont);
  & a {
    color: var(--orange);
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid var(--orange);
    }
  }
  &.text {
    text-align: left;
    max-width: var(--textCellWidth);
    & span {
      display: inline-block;
      max-width: 100%;
      overflow-x: scroll;
    }
  }
`;

//export const TdError = styled.td`
export const TdError = styled.span`
  padding-top: 1em;
  padding-bottom: 1em;
  grid-column: 1 / ${(props) => props.colSpan};
`;

export const ColorBlock = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  margin-left: 1em;
  background-color: ${(props) => props.color || "transparent"};
`;

export const TextInnerCell = styled(TableCell)`
  position: relative;
  text-align: left;
  max-width: var(--textCellWidth);
  overflow-y: hidden;
  overflow-x: scroll;
  /* z-index: 2; */
  & a {
    text-decoration: none;
    color: var(--text);
  }
`;

export const TextPopUpCell = styled.div`
  --paddingWidth: 8px;
  --borderWidth: 1px;
  --totalWidth: calc(var(--paddingWidth) + var(--borderWidth));
  background-color: var(--white);
  position: fixed;
  top: calc(${(props) => (props.top ? props.top : 0)}px - var(--totalWidth));
  left: calc(${(props) => (props.left ? props.left : 0)}px - var(--totalWidth));
  max-width: var(--textCellWidth);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  white-space: normal;
  z-index: 999;
  & a {
    position: relative;
    padding: var(--paddingWidth);
    display: block;
    text-decoration: none;
    color: var(--text);
    border: var(--borderWidth) solid rgba(0, 0, 0, 0.125);
    transition: 0.5s;
    z-index: 999;
    font-family: var(--headerFont);
    & p {
      margin: 0;
    }
    &:hover {
      border-color: var(--orange);
    }
  }
`;
