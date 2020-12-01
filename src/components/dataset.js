import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

// props:
// data: the data
// hideHeader: if true, hide headers
// perPage: number of rows to show perpage
// inLine: true if this is inline

// style this differently if props.inLine?

const TopNav = styled.nav`
  position: sticky;
  top: 0;
  background-color: var(--white);
  padding-bottom: 1em;
  z-index: 2;
`;

const DatasetHeader = styled.div`
  display: block;
  text-align: left;
`;

const DataSetH1 = styled.h1`
  /* why are we passing this isInline? */
  margin: 0;
`;

const FilterP = styled.nav`
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

const PaginationP = styled.nav`
  margin-top: 1em;
  user-select: none;
`;

const Arrow = styled.span`
  cursor: ${(props) => (props.grayOut ? "default" : "pointer")};
  user-select: none;
  color: ${(props) => (props.grayOut ? "var(--borderColor)" : "var(--black)")};
  &:hover {
    color: ${(props) =>
      props.grayOut ? "var(--borderColor)" : "var(--orange)"};
  }
`;

const StrongLink = styled.span`
  font-family: var(--headerFont);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: var(--orange);
  }
`;

const DataTableWrapper = styled.div`
  padding-bottom: 1em;
  max-width: 100%;
  max-width: calc(100vw - 200px);
  position: relative;
  overflow-x: scroll;
`;

//const DataTable = styled.table`
const DataTable = styled.div`
  position: relative;
`;

const DataTableHead = styled.div`
  /* position: sticky;
	top: 0;
	z-index: 3; */
`;

//const THNoWrap = styled.th`
const THNoWrap = styled.span`
/* Does this need hideHeaders as a prop? Fix this mess! */
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

const SortBy = styled.span`
  margin-left: 0.25em;
  margin-right: 0.5em;
  display: inline-flex;
  height: 100%;
  align-content: center;
  user-select: none;
`;

const TableSelect = styled.select`
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

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columnWidths
      ? props.columnWidths
      : `repeat(${props.columns}, minmax(100px, 1fr))`};
`;

//const TableCell = styled.td`
const TableCell = styled.span`
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
`;

//const TdError = styled.td`
const TdError = styled.span`
  padding-top: 1em;
  padding-bottom: 1em;
  grid-column: 1 / ${(props) => props.colSpan};
`;

const cloneObject = function(source) {
  if (Object.prototype.toString.call(source) === "[object Array]") {
    let clone = [];
    for (var i = 0; i < source.length; i++) {
      clone[i] = cloneObject(source[i]);
    }
    return clone;
  } else if (typeof source == "object") {
    let clone = {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = cloneObject(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
};

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startPoint: 0, perPage: 50 };
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.filterDataset = this.filterDataset.bind(this);
    this.unfilterDataset = this.unfilterDataset.bind(this);
    this.filterCategory = this.filterCategory.bind(this);
    this.getSuperheaders = this.getSuperheaders.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.tableRef = React.createRef();
    this.tableHeadRef = React.createRef();
  }
  componentDidMount() {
    this.setState({
      superFields:
        this.props.data.fields.filter((key) => key.superField).length > 0,
    });
    let perPage = this.state.perPage;
    if (this.props.perPage) {
      perPage = this.props.perPage;
    }
    // console.log(this.props);
    let endPoint = this.state.startPoint + perPage;
    let data = this.props.data;
    let visibleFields = [];
    let memo = [];
    for (let i = 0; i < data.fields.length; i++) {
      let thisField = cloneObject(data.fields[i]);
      if (!thisField.fieldHidden) {
        for (let j = 0; j < data.data.length; j++) {
          // this makes sure that the field is actually used
          if (data.data[j][thisField.fieldKey]) {
            if (memo.indexOf(thisField.fieldKey) < 0) {
              memo.push(thisField.fieldKey);
              visibleFields.push(thisField);
            }
          }
        }
      }
    }
    let outputData = [];
    for (let j = 0; j < data.data.length; j++) {
      let entry = data.data[j];
      let row = [];
      for (let i = 0; i < visibleFields.length; i++) {
        let column = cloneObject(visibleFields[i]);
        column.value = entry[visibleFields[i].fieldKey];
        row.push(column);
      }
      // TODO: should probably push other hidden field data into this too?
      outputData.push({ id: data.data[j].id || null, row: row });
    }
    let filteredData = cloneObject(outputData);
    let headerRows =
      visibleFields.reduce((acc, x) => acc + (x.superField ? 1 : 0), 0) > 0
        ? 2
        : 1;
    let shownRecords = filteredData.slice(
      this.state.startPoint,
      this.state.startPoint + this.state.perPage
    );
    this.setState(
      {
        perPage: perPage,
        visibleFields: visibleFields,
        outputData: outputData,
        filteredData: filteredData,
        totalLength: filteredData.length,
        shownRecords: shownRecords,
        reportName: data.name,
        reportID: data.reportID,
        datasetID: data.id,
        endPoint: endPoint,
        paginate: outputData.length > perPage,
        headerRows: headerRows,
      },
      () => this.figureOutTheWidths()
    );
  }
  prevPage() {
    if (this.state.startPoint > 0) {
      const newStartPoint = this.state.startPoint - this.state.perPage;
      let shownRecords = this.state.outputData.slice(
        newStartPoint,
        newStartPoint + this.state.perPage
      );
      this.setState(
        { startPoint: newStartPoint, shownRecords: shownRecords },
        () => this.figureOutTheWidths()
      );
    }
  }
  nextPage() {
    if (this.state.startPoint + this.state.perPage <= this.state.totalLength) {
      const newStartPoint = this.state.startPoint + this.state.perPage;
      let shownRecords = this.state.outputData.slice(
        newStartPoint,
        newStartPoint + this.state.perPage
      );
      this.setState(
        { startPoint: newStartPoint, shownRecords: shownRecords },
        () => this.figureOutTheWidths()
      );
    }
  }
  filterCategory(fieldName, fieldValue) {
    let filteredData = cloneObject(this.state.outputData).filter((row) => {
      let outt = false;
      for (let i = 0; i < row.row.length; i++) {
        outt =
          outt ||
          (row.row[i].fieldKey === fieldName &&
            row.row[i].value === fieldValue) ||
          fieldValue === row.row[i].fieldName ||
          fieldValue === row.row[i].fieldNameShort;
      }
      return outt;
    });
    let shownRecords = filteredData.slice(0, this.state.perPage);
    this.setState(
      {
        filteredData: filteredData,
        shownRecords: shownRecords,
        totalLength: filteredData.length,
      },
      () => this.figureOutTheWidths()
    );
  }
  filterDataset(e) {
    e.preventDefault();
    let filterFor = String(
      e.target.querySelector("#searchfield").value
    ).toLowerCase();
    let filteredData = cloneObject(this.state.outputData).filter((row) => {
      let output = row.row.filter((column) => {
        return (
          column.value &&
          String(column.value)
            .toLowerCase()
            .indexOf(filterFor) > -1
        );
      });
      return output.length;
    });
    let shownRecords = filteredData.slice(0, this.state.perPage);
    this.setState(
      {
        filteredData: filteredData,
        shownRecords: shownRecords,
        totalLength: filteredData.length,
      },
      () => this.figureOutTheWidths()
    );
  }
  unfilterDataset() {
    let filteredData = cloneObject(this.state.outputData);
    let shownRecords = filteredData.slice(0, this.state.perPage);
    this.setState(
      {
        filteredData: filteredData,
        shownRecords: shownRecords,
        totalLength: filteredData.length,
      },
      () => this.figureOutTheWidths()
    );
  }
  sortBy(fieldName) {
    let filteredData = cloneObject(this.state.outputData);
    let coefficient = 1;
    let thisSortValues = this.state.sortBy || {};
    if (thisSortValues[fieldName] > 0) {
      coefficient = -1;
      thisSortValues[fieldName] = -1;
    } else {
      thisSortValues[fieldName] = 1;
    }
    this.setState({ sortBy: thisSortValues });
    filteredData.sort(function(a, b) {
      let aValue = 0;
      let bValue = 0;
      for (let i = 0; i < a.row.length; i++) {
        if (a.row[i].fieldKey === fieldName) {
          aValue = a.row[i].value;
        }
      }
      for (let i = 0; i < b.row.length; i++) {
        if (b.row[i].fieldKey === fieldName) {
          bValue = b.row[i].value;
        }
      }
      if (aValue > bValue) {
        return coefficient;
      }
      if (aValue < bValue) {
        return -1 * coefficient;
      }
      return 0;
    });

    let shownRecords = filteredData.slice(0, this.state.perPage);
    this.setState(
      {
        filteredData: filteredData,
        shownRecords: shownRecords,
        totalLength: filteredData.length,
      },
      () => this.figureOutTheWidths()
    );
  }
  getSuperheaders() {
    // this returns a TR with superheaders in it, if they exist

    const getSuperfield = function(thisField, allFields) {
      for (let i = 0; i < allFields.length; i++) {
        if (thisField === allFields[i].fieldKey) {
          return allFields[i].superField || null;
        }
      }
      return null;
    };

    let headers = this.state.visibleFields.map((entry) =>
      getSuperfield(entry.fieldKey, this.props.data.fields)
        ? getSuperfield(entry.fieldKey, this.props.data.fields)
        : null
    );
    let i = 0;
    let superFields = [];
    while (i < headers.length) {
      let thisHeader = headers[i];
      let j = 1;
      while (headers[i + 1] && thisHeader === headers[i + 1]) {
        i++;
        j++;
      }
      superFields.push({ value: headers[i], colspan: j });
      i++;
    }

    return headers ? (
      <TableRow
        columns={this.state.visibleFields.length}
        columnWidths={this.state.columnWidths}
      >
        {superFields.map((entry, key) => (
          <THNoWrap
            scope="col"
            columnSpan={entry.colspan}
            key={key}
            empty={!entry.value}
            hideHeaders={this.props.hideHeaders}
          >
            <span className="innertd">{entry.value}</span>
          </THNoWrap>
        ))}
      </TableRow>
    ) : null;
  }
  figureOutTheWidths = (key) => {
    let columnMaxWidths = new Array(this.state.visibleFields.length).fill(0);
    if (this.tableRef.current) {
      let headerRows = this.tableHeadRef.current.childNodes;
      for (let i = 0; i < headerRows.length; i++) {
        let innerSpans = headerRows[i].querySelectorAll("span .innertd");
        if (
          innerSpans &&
          innerSpans.length === this.state.visibleFields.length
        ) {
          // this doesn't work for superfields currently, though that's probably okay?
          for (let j = 0; j < innerSpans.length; j++) {
            columnMaxWidths[j] = Math.max(
              columnMaxWidths[j],
              innerSpans[j].offsetWidth
            );
          }
        }
      }
      let rows = this.tableRef.current.childNodes;
      for (let i = 1; i < rows.length; i++) {
        let innerSpans = rows[i].querySelectorAll("span .innertd");
        if (
          innerSpans &&
          innerSpans.length === this.state.visibleFields.length
        ) {
          // this doesn't work for superfields currently, though that's probably okay?
          for (let j = 0; j < innerSpans.length; j++) {
            columnMaxWidths[j] = Math.max(
              columnMaxWidths[j],
              innerSpans[j].offsetWidth
            );
          }
        }
      }
    }
    // the 10 is the padding!
    this.setState({
      columnWidths: columnMaxWidths.map((x) => x + 10).join("px ") + "px",
    });
  };
  render() {
    return this.state.outputData ? (
      <div>
        {this.props.hideHeaders ? null : (
          <DatasetHeader>
            <DataSetH1 isInLine={this.props.inLine}>
              Dataset: {this.state.reportName}
            </DataSetH1>
          </DatasetHeader>
        )}
        <TopNav>
          <FilterP>
            <p>
              Showing {this.state.filteredData.length} of{" "}
              {this.state.outputData.length} total records in this dataset.{" "}
              <StrongLink onClick={this.unfilterDataset}>See all.</StrongLink>
            </p>
            <form onSubmit={this.filterDataset}>
              <input
                type="text"
                id="searchfield"
                placeholder="Filter this dataset"
              ></input>
              <input type="submit" value="Filter" />
            </form>
          </FilterP>
          {this.state.paginate ? (
            <PaginationP>
              <Arrow
                onClick={this.prevPage}
                grayOut={this.state.startPoint === 0}
              >
                ←
              </Arrow>
              &nbsp;&nbsp;Page {this.state.startPoint / this.state.perPage + 1}/
              {Math.ceil(this.state.totalLength / this.state.perPage)}
              &nbsp;&nbsp;
              <Arrow
                onClick={this.nextPage}
                grayOut={
                  this.state.startPoint / this.state.perPage + 1 ===
                  Math.ceil(this.state.totalLength / this.state.perPage)
                }
              >
                →
              </Arrow>
            </PaginationP>
          ) : null}
        </TopNav>
        <DataTableWrapper>
          <DataTable ref={this.tableRef}>
            <DataTableHead ref={this.tableHeadRef}>
              {this.getSuperheaders()}
              <TableRow
                columns={this.state.visibleFields.length}
                columnWidths={this.state.columnWidths}
              >
                {this.state.visibleFields.map((entry, key) => {
                  return entry.fieldValues ? (
                    <THNoWrap
                      key={key}
                      hideHeaders={this.props.hideHeaders}
                      superFields={this.state.superFields}
                    >
                      <span className="innertd">
                        <TableSelect
                          id={entry.fieldKey}
                          onChange={(event) => {
                            this.filterCategory(
                              event.target.id,
                              event.target.value
                            );
                          }}
                        >
                          <option defaultValue>
                            {entry.fieldNameShort || entry.fieldName}
                          </option>
                          {entry.fieldValues.map((value, key2) => (
                            <option key={key2} value={value}>
                              {value}
                            </option>
                          ))}
                        </TableSelect>
                      </span>
                    </THNoWrap>
                  ) : (
                    <THNoWrap
                      key={key}
                      hideHeaders={this.props.hideHeaders}
                      superFields={this.state.superFields}
                      onClick={() => this.sortBy(entry.fieldKey)}
                    >
                      <span className="innertd">
                        {entry.fieldNameShort || entry.fieldName}
                        {this.state.sortBy ? (
                          this.state.sortBy[entry.fieldKey] ? (
                            this.state.sortBy[entry.fieldKey] > 0 ? (
                              <SortBy>↑</SortBy>
                            ) : (
                              <SortBy>↓</SortBy>
                            )
                          ) : (
                            <SortBy>↕</SortBy>
                          )
                        ) : (
                          <SortBy>↕</SortBy>
                        )}
                      </span>
                    </THNoWrap>
                  );
                })}
              </TableRow>
            </DataTableHead>
            {this.state.shownRecords.length > 0 ? (
              <React.Fragment>
                {this.state.shownRecords.map((row, key) => (
                  <TableRow
                    key={key}
                    columns={this.state.visibleFields.length}
                    columnWidths={this.state.columnWidths}
                  >
                    {row.row.map((column, key) => {
                      return column.fieldType &&
                        (column.fieldType === "link" ||
                          column.fieldType === "imageLink") ? (
                        <TableCell key={key}>
                          <span className="innertd">
                            <Link
                              to={`/${this.state.reportID}/dataset/${this.state.datasetID}/id/${row.id}`}
                            >
                              {column.value}
                            </Link>
                          </span>
                        </TableCell>
                      ) : (
                        <TableCell key={key}>
                          <span className="innertd">
                            {typeof column.value === "object"
                              ? column.value.join(", ")
                              : column.value}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <TableRow
                  columns={this.state.visibleFields.length}
                  columnWidths={this.state.columnWidths}
                >
                  <TdError colSpan={this.state.visibleFields.length}>
                    Oh no! No records to show!{" "}
                    <StrongLink onClick={this.unfilterDataset}>
                      Start over?
                    </StrongLink>
                  </TdError>
                </TableRow>
              </React.Fragment>
            )}
          </DataTable>
        </DataTableWrapper>
      </div>
    ) : null;
  }
}

export default Dataset;
