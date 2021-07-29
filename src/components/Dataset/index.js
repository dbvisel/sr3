import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
// TODO: THIS IS REALLY BAD! GET SOMETHING BETTER TO DO THIS!
import cloneObject from "./../../modules/cloneObject";
import {
  TableNav,
  DatasetHeader,
  DataSetH1,
  FilterP,
  PaginationP,
  Arrow,
  StrongLink,
  DataTableWrapper,
  DataTable,
  DataTableHead,
  THNoWrap,
  SortBy,
  TableSelect,
  TableRow,
  TableCell,
  TdError,
} from "./elements";

/** props:
 * data: the data
 * hideHeader: if true, hide the big header at the top of the page. Used by inline data sets
 * perPage: number of rows to show perpage
 * inLine: true if this is inline
 * */

// TODO: make tables more responsive: https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html
// https://webup.org/blog/sticky-header-table-with-react-hooks/
// TODO: split this up into smaller components – this is a mess!

const toTitleCase = (text) =>
  text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
const DataSet = ({ perPage, inLine, hideHeaders, data }) => {
  const [startPoint, setStartPoint] = React.useState(0);
  const rowsPerPage = perPage || 50;
  // const endPoint = startPoint + perPage; // this is never used
  const superFields = data.fields.filter((key) => key.superField).length > 0;
  const [shownRecords, setShownRecords] = React.useState([]);
  const [totalLength, setTotalLength] = React.useState(null); // maybe this should be something like current length?
  const [outputData, setOutputData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [visibleFields, setVisibleFields] = React.useState([]);
  const [sortBy, setSortBy] = React.useState({});
  const [paginate, setPaginate] = React.useState(false);
  const [columnWidths, setColumnWidths] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);

  const tableRef = React.useRef(null);
  const tableHeadRef = React.useRef(null);

  const prevPage = () => {
    if (startPoint > 0) {
      const newStartPoint = startPoint - rowsPerPage;
      const newShownRecords = outputData.slice(
        newStartPoint,
        newStartPoint + rowsPerPage
      );
      setStartPoint(newStartPoint);
      setShownRecords(newShownRecords);
    }
  };

  const nextPage = () => {
    if (startPoint + rowsPerPage <= totalLength) {
      const newStartPoint = startPoint + rowsPerPage;
      const newShownRecords = outputData.slice(
        newStartPoint,
        newStartPoint + rowsPerPage
      );
      setStartPoint(newStartPoint);
      setShownRecords(newShownRecords);
    }
  };

  const filterCategory = (fieldName, fieldValue) => {
    const newFilteredData = cloneObject(outputData).filter((row) => {
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
    const newShownRecords = newFilteredData.slice(0, rowsPerPage);
    setFilteredData(newFilteredData);
    setShownRecords(newShownRecords);
    setTotalLength(newFilteredData.length);
  };

  const filterDataset = (e) => {
    e.preventDefault();
    const filterFor = String(
      e.target.querySelector(`#searchfield_${data.id}`).value
    ).toLowerCase();
    const newFilteredData = cloneObject(outputData).filter((row) => {
      let output = row.row.filter((column) => {
        return (
          column.value &&
          String(column.value).toLowerCase().indexOf(filterFor) > -1
        );
      });
      return output.length;
    });
    const newShownRecords = newFilteredData.slice(0, rowsPerPage);
    setFilteredData(newFilteredData);
    setShownRecords(newShownRecords);
    setTotalLength(newFilteredData.length);
  };

  const unfilterDataset = () => {
    const newFilteredData = cloneObject(outputData);
    const newShownRecords = newFilteredData.slice(0, rowsPerPage);
    setFilteredData(newFilteredData);
    setShownRecords(newShownRecords);
    setTotalLength(newFilteredData.length);
  };

  const changeSortBy = (fieldName) => {
    // this needs to check if fields.sortMethod is set to "integer" and if so, compare as numbers rather than comparing by string (= "alphabetical", what it's doing now.)
    const thisField = data.fields.filter((x) => x.fieldKey === fieldName)[0];
    const thisSortMethod = thisField.sortMethod || "alphabetical";

    // console.log(thisField, thisSortMethod);
    const newFilteredData = cloneObject(outputData);
    let coefficient = 1;
    let thisSortValues = sortBy || {};
    if (thisSortValues[fieldName] > 0) {
      coefficient = -1;
      thisSortValues[fieldName] = -1;
    } else {
      thisSortValues[fieldName] = 1;
    }
    setSortBy(thisSortValues);
    newFilteredData.sort(function (a, b) {
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
      if (
        thisSortMethod === "integer"
          ? parseInt(aValue, 10) > parseInt(bValue, 10)
          : thisSortMethod === "number"
          ? parseFloat(aValue) > parseFloat(bValue)
          : aValue > bValue
      ) {
        return coefficient;
      }
      if (
        thisSortMethod === "integer"
          ? parseInt(aValue, 10) < parseInt(bValue, 10)
          : thisSortMethod === "number"
          ? parseFloat(aValue) < parseFloat(bValue)
          : aValue < bValue
      ) {
        return -1 * coefficient;
      }
      return 0;
    });

    const newShownRecords = newFilteredData.slice(0, rowsPerPage);
    setFilteredData(newFilteredData);
    setShownRecords(newShownRecords);
    setTotalLength(newFilteredData.length);
  };

  const getSuperheaders = () => {
    // this returns a TR with superheaders in it, if they exist

    const getSuperfield = function (thisField, allFields) {
      for (let i = 0; i < allFields.length; i++) {
        if (thisField === allFields[i].fieldKey) {
          return allFields[i].superField || null;
        }
      }
      return null;
    };

    const potentialSuperHeaders = visibleFields.map((entry) =>
      getSuperfield(entry.fieldKey, data.fields)
        ? getSuperfield(entry.fieldKey, data.fields)
        : null
    );
    let i = 0;
    let mySuperFields = [];
    while (i < potentialSuperHeaders.length) {
      let thisHeader = potentialSuperHeaders[i];
      let j = 1;
      while (
        potentialSuperHeaders[i + 1] &&
        thisHeader === potentialSuperHeaders[i + 1]
      ) {
        i++;
        j++;
      }
      mySuperFields.push({ value: potentialSuperHeaders[i], colspan: j });
      i++;
    }

    return potentialSuperHeaders ? (
      <TableRow columns={visibleFields.length} columnWidths={columnWidths}>
        {mySuperFields.map((entry, key) => (
          <THNoWrap
            scope="col"
            columnSpan={entry.colspan}
            key={key}
            empty={!entry.value}
            hideHeaders={hideHeaders}
          >
            <span className="innertd">{entry.value}</span>
          </THNoWrap>
        ))}
      </TableRow>
    ) : null;
  };

  const FilenameCell = ({ column, rowId }) => {
    // TODO: maybe this should link to an object page?
    const myRow = data.data.filter((x) => x.id === rowId)[0];
    const myValue =
      column.fieldNameShown && myRow[column.fieldNameShown]
        ? myRow[column.fieldNameShown]
        : column.value;
    // const myImageUrl = `/${data.reportID}/images/${column.value}`;
    // use this if we wanted to make thumbnails
    const myPageUrl = `/${data.reportID}/dataset/${data.id}/id/${rowId}`;
    // console.log(myImageUrl, myPageUrl);
    return (
      <TableCell>
        <span className="innertd">
          {/* <img src={myImageUrl} height={"auto"} width={200} alt={myValue} />*/}
          <Link to={myPageUrl}>{myValue}</Link>
        </span>
      </TableCell>
    );
  };

  FilenameCell.propTypes = {
    column: PropTypes.object.isRequired,
    rowId: PropTypes.string.isRequired,
  };

  const LinkingCell = ({ column, rowId }) => {
    const myPageUrl = `/${data.reportID}/dataset/${data.id}/id/${rowId}`;
    return (
      <TableCell>
        <span className="innertd">
          {typeof column.value === "object" ? (
            column.value.join(", ")
          ) : (
            <Link to={myPageUrl}>{column.value}</Link>
          )}
        </span>
      </TableCell>
    );
  };

  LinkingCell.propTypes = {
    column: PropTypes.object.isRequired,
    rowId: PropTypes.string.isRequired,
  };

  const LinkCell = ({ column, rowId }) => {
    // This is for cells that link to other data objects
    const myRow = data.data.filter((x) => x.id === rowId)[0];
    const isArray = column.canBeArray && typeof column.value === "object";
    const linkDataSet = myRow[column.linkToDataSet];
    const isThereASingleDataSet =
      typeof linkDataSet === "string" && myRow[column.linkExists];
    return (
      <TableCell>
        <span className="innertd">
          {isArray ? (
            <React.Fragment>
              {column.value.map((x, index) => (
                <React.Fragment key={index}>
                  {myRow[column.linkExists][index] ? (
                    <Link
                      to={`/${data.reportID}/dataset/${linkDataSet[index]}/id/${x}`}
                    >
                      {x}
                    </Link>
                  ) : (
                    x
                  )}
                  {index + 1 < column.value.length ? ", " : ""}
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : isThereASingleDataSet ? (
            <Link
              to={`/${data.reportID}/dataset/${linkDataSet}/id/${column.value}`}
            >
              {column.value}
            </Link>
          ) : (
            column.value
          )}
        </span>
      </TableCell>
    );
  };

  LinkCell.propTypes = {
    column: PropTypes.object.isRequired,
    rowId: PropTypes.string.isRequired,
  };

  // START OLD COMPONENT DID MOUNT
  React.useEffect(() => {
    if (!initialized) {
      // console.log("Running initial useEffect!");
      const newVisibleFields = [];
      let memo = [];
      for (let i = 0; i < data.fields.length; i++) {
        let thisField = cloneObject(data.fields[i]);
        if (!thisField.fieldHidden) {
          for (let j = 0; j < data.data.length; j++) {
            // this makes sure that the field is actually used
            if (data.data[j][thisField.fieldKey]) {
              if (memo.indexOf(thisField.fieldKey) < 0) {
                memo.push(thisField.fieldKey);
                newVisibleFields.push(thisField);
              }
            }
          }
        }
      }
      setVisibleFields(newVisibleFields);
      const newOutputData = [];
      for (let j = 0; j < data.data.length; j++) {
        let entry = data.data[j];
        let row = [];
        for (let i = 0; i < newVisibleFields.length; i++) {
          let column = cloneObject(newVisibleFields[i]);
          column.value = entry[newVisibleFields[i].fieldKey];
          row.push(column);
        }
        // TODO: should probably push other hidden field data into this too?
        newOutputData.push({ id: data.data[j].id || null, row: row });
      }
      setOutputData(newOutputData);
      setFilteredData(cloneObject(newOutputData));
      setTotalLength(newOutputData.length);
      const newShownRecords = newOutputData.slice(
        startPoint,
        startPoint + rowsPerPage
      );
      setShownRecords(newShownRecords);
      setPaginate(newOutputData.length > rowsPerPage);
      setInitialized(true);
    }
  }, [data, rowsPerPage, startPoint, initialized]);

  React.useEffect(() => {
    if (visibleFields.length) {
      // console.log("in figure out the widths effect");
      const columnMaxWidths = new Array(visibleFields.length).fill(0);
      if (tableRef.current) {
        const currentHeaderRows = tableHeadRef.current.childNodes;
        for (let i = 0; i < currentHeaderRows.length; i++) {
          let innerSpans =
            currentHeaderRows[i].querySelectorAll("span .innertd");
          if (innerSpans && innerSpans.length === visibleFields.length) {
            // this doesn't work for superfields currently, though that's probably okay?
            for (let j = 0; j < innerSpans.length; j++) {
              columnMaxWidths[j] = Math.max(
                columnMaxWidths[j],
                innerSpans[j].offsetWidth
              );
            }
          }
        }
        let rows = tableRef.current.childNodes;
        for (let i = 1; i < rows.length; i++) {
          let innerSpans = rows[i].querySelectorAll("span .innertd");
          if (innerSpans && innerSpans.length === visibleFields.length) {
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
      setColumnWidths(columnMaxWidths.map((x) => x + 10).join("px ") + "px");
    }
  }, [visibleFields, shownRecords]);

  // END OLD COMPONENT DID MOUNT

  return outputData ? (
    <div>
      {hideHeaders ? null : (
        <DatasetHeader>
          <DataSetH1 isInLine={inLine}>Dataset: {data.name}</DataSetH1>
        </DatasetHeader>
      )}
      <TableNav>
        <FilterP>
          <p>
            Showing {filteredData.length} of {outputData.length} total records
            in this dataset.{" "}
            <StrongLink onClick={unfilterDataset}>See all.</StrongLink>
          </p>
          <form onSubmit={filterDataset}>
            <input
              type="text"
              id={`searchfield_${data.id}`}
              placeholder="Filter this dataset"
            ></input>
            <input type="submit" value="Filter" />
          </form>
        </FilterP>
        {paginate ? (
          <PaginationP>
            <Arrow onClick={prevPage} grayOut={startPoint === 0}>
              ←
            </Arrow>
            &nbsp;&nbsp;Page {startPoint / rowsPerPage + 1}/
            {Math.ceil(totalLength / rowsPerPage)}
            &nbsp;&nbsp;
            <Arrow
              onClick={nextPage}
              grayOut={
                startPoint / rowsPerPage + 1 ===
                Math.ceil(totalLength / rowsPerPage)
              }
            >
              →
            </Arrow>
          </PaginationP>
        ) : null}
      </TableNav>
      <DataTableWrapper>
        <DataTable ref={tableRef}>
          <DataTableHead ref={tableHeadRef}>
            {getSuperheaders()}
            <TableRow
              columns={visibleFields.length}
              columnWidths={columnWidths}
              className={initialized ? "" : "initializing"}
            >
              {visibleFields.map((entry, key) => {
                return entry.fieldValues ? (
                  <THNoWrap
                    key={key}
                    hideHeaders={hideHeaders}
                    superFields={superFields}
                  >
                    <span className="innertd">
                      <TableSelect
                        id={entry.fieldKey}
                        onChange={(event) => {
                          filterCategory(event.target.id, event.target.value);
                        }}
                      >
                        <option defaultValue>
                          {entry.fieldNameShort
                            ? typeof entry.fieldUnit === "string"
                              ? `${entry.fieldNameShort} (${entry.fieldUnit})`
                              : entry.fieldNameShort
                            : typeof entry.fieldUnit === "string"
                            ? `${entry.fieldName} (${entry.fieldUnit})`
                            : entry.fieldName}
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
                    hideHeaders={hideHeaders}
                    superFields={superFields}
                    onClick={() => changeSortBy(entry.fieldKey)}
                  >
                    <span className="innertd">
                      {entry.fieldNameShort
                        ? typeof entry.fieldUnit === "string"
                          ? `${entry.fieldNameShort} (${entry.fieldUnit})`
                          : entry.fieldNameShort
                        : typeof entry.fieldUnit === "string"
                        ? `${entry.fieldName} (${entry.fieldUnit})`
                        : entry.fieldName}
                      {sortBy ? (
                        sortBy[entry.fieldKey] ? (
                          sortBy[entry.fieldKey] > 0 ? (
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
          {shownRecords.length > 0 ? (
            <React.Fragment>
              {shownRecords.map((row, index) => (
                <TableRow
                  key={`row_${index}`}
                  columns={visibleFields.length}
                  columnWidths={columnWidths}
                >
                  {row.row.map((column, indexx) => {
                    // console.log(column);
                    const cleanedValue =
                      typeof column.value === "object"
                        ? column.value
                        : column.fieldTransform
                        ? column.fieldTransform === "toLowerCase"
                          ? String(column.value).toLowerCase()
                          : column.fieldTransform === "titleCase"
                          ? toTitleCase(String(column.value))
                          : column.value
                        : column.value;
                    return column.fieldType &&
                      (column.fieldType === "link" ||
                        column.fieldType === "imageLink") ? (
                      <LinkCell key={indexx} rowId={row.id} column={column} />
                    ) : column.fieldType === "filename" ? (
                      <FilenameCell
                        key={indexx}
                        column={column}
                        rowId={row.id}
                      />
                    ) : column.fieldLink ? (
                      <LinkingCell
                        key={indexx}
                        column={column}
                        rowId={row.id}
                      />
                    ) : (
                      <TableCell key={indexx}>
                        <span className="innertd">
                          {typeof cleanedValue === "object"
                            ? cleanedValue.join(", ")
                            : cleanedValue}
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
                columns={visibleFields.length}
                columnWidths={columnWidths}
              >
                <TdError colSpan={visibleFields.length}>
                  Oh no! No records to show!{" "}
                  <StrongLink onClick={unfilterDataset}>Start over?</StrongLink>
                </TdError>
              </TableRow>
            </React.Fragment>
          )}
          {inLine ? null : (
            <DataTableHead ref={tableHeadRef}>
              {getSuperheaders()}
              <TableRow
                columns={visibleFields.length}
                columnWidths={columnWidths}
                className={initialized ? "" : "initializing"}
              >
                {visibleFields.map((entry, key) => {
                  return entry.fieldValues ? (
                    <THNoWrap
                      key={key}
                      hideHeaders={hideHeaders}
                      superFields={superFields}
                    >
                      <span className="innertd">
                        <TableSelect
                          id={entry.fieldKey}
                          onChange={(event) => {
                            filterCategory(event.target.id, event.target.value);
                          }}
                        >
                          <option defaultValue>
                            {entry.fieldNameShort
                              ? typeof entry.fieldUnit === "string"
                                ? `${entry.fieldNameShort} (${entry.fieldUnit})`
                                : entry.fieldNameShort
                              : typeof entry.fieldUnit === "string"
                              ? `${entry.fieldName} (${entry.fieldUnit})`
                              : entry.fieldName}
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
                      key={`bottom_${key}`}
                      hideHeaders={hideHeaders}
                      superFields={superFields}
                      onClick={() => changeSortBy(entry.fieldKey)}
                    >
                      <span className="innertd">
                        {entry.fieldNameShort
                          ? typeof entry.fieldUnit === "string"
                            ? `${entry.fieldNameShort} (${entry.fieldUnit})`
                            : entry.fieldNameShort
                          : typeof entry.fieldUnit === "string"
                          ? `${entry.fieldName} (${entry.fieldUnit})`
                          : entry.fieldName}
                        {sortBy ? (
                          sortBy[entry.fieldKey] ? (
                            sortBy[entry.fieldKey] > 0 ? (
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
          )}
        </DataTable>
      </DataTableWrapper>
      {inLine ? null : (
        <TableNav bottom>
          <FilterP>
            <p>
              Showing {filteredData.length} of {outputData.length} total records
              in this dataset.{" "}
              <StrongLink onClick={unfilterDataset}>See all.</StrongLink>
            </p>
            <form onSubmit={filterDataset}>
              <input
                type="text"
                id={`bottomsearchfield_${data.id}`}
                placeholder="Filter this dataset"
              ></input>
              <input type="submit" value="Filter" />
            </form>
          </FilterP>
          {paginate ? (
            <PaginationP>
              <Arrow onClick={prevPage} grayOut={startPoint === 0}>
                ←
              </Arrow>
              &nbsp;&nbsp;Page {startPoint / rowsPerPage + 1}/
              {Math.ceil(totalLength / rowsPerPage)}
              &nbsp;&nbsp;
              <Arrow
                onClick={nextPage}
                grayOut={
                  startPoint / rowsPerPage + 1 ===
                  Math.ceil(totalLength / rowsPerPage)
                }
              >
                →
              </Arrow>
            </PaginationP>
          ) : null}
        </TableNav>
      )}
    </div>
  ) : null;
};

export default DataSet;

DataSet.propTypes = {
  data: PropTypes.object.isRequired,
  perPage: PropTypes.number,
  inline: PropTypes.bool,
  hideHeaders: PropTypes.bool,
};
