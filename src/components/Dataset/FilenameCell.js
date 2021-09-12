import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { TableCell } from "./elements";

const FilenameCell = ({ column, rowId, data }) => {
  // TODO: maybe this should link to an object page?
  // TODO: rowId sometimes comes in as {}

  const myRow = data.data.filter((x) => x.id === rowId)[0];
  const myValue =
    column.fieldNameShown && myRow[column.fieldNameShown]
      ? myRow[column.fieldNameShown]
      : column.value;
  const isArray = Array.isArray(myValue);
  if (!isArray) {
    if (myValue === "") {
      return (
        <TableCell>
          <span className="innertd" />
        </TableCell>
      );
    }
    // const myImageUrl = `/${data.reportID}/images/${column.value}`;
    // use this if we wanted to make thumbnails
    // console.log(myImageUrl, myPageUrl);
    const myPageUrl = `/${data.reportID}/dataset/${data.id}/id/${rowId}`;
    return (
      <TableCell>
        <span className="innertd">
          {/* <img src={myImageUrl} height={"auto"} width={200} alt={myValue} />*/}
          <Link to={myPageUrl}>{myValue}</Link>
        </span>
      </TableCell>
    );
  }
  console.log(myValue, rowId);
  const myPageUrl = `/${data.reportID}/dataset/${data.id}/id/${rowId}`;
  return (
    <TableCell>
      <span className="innertd">
        {myValue.map((x, index) => (
          <React.Fragment key={index}>
            <Link to={myPageUrl}>{x}</Link>
            {/* <img src={myImageUrl} height={"auto"} width={200} alt={myValue} />
             */}
            {myValue.length > 1 && index < myValue.length - 1 && ", "}
          </React.Fragment>
        ))}
      </span>
    </TableCell>
  );
};

FilenameCell.propTypes = {
  column: PropTypes.object.isRequired,
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FilenameCell;
