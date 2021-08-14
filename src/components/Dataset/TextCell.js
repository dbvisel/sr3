import * as React from "react";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import VisiblitySensor from "react-visibility-sensor";
import { TextInnerCell, TextPopUpCell } from "./elements";

/**
 *  NOTES:
 *
 *  This: <Markdown>{value.replace(/\n/g, "\n\n")}</Markdown>
 *  is to deal with the code coming off of Airtable, which only puts one line end at the end of the cell
 *  which is not the Markdown default. Maybe make this a prop if we have other kinds of Markdown?
 */

const TextCell = ({ value = "" }) => {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const thisCell = React.useRef();

  const getPosition = () => {
    if (thisCell.current) {
      const position = thisCell.current.getBoundingClientRect();
      return { left: position.x, top: position.top };
    }
    return { left: -999, top: -999 };
  };

  return (
    <React.Fragment>
      <TextInnerCell ref={thisCell}>
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            getPosition();
            setPopupVisible(true);
          }}
        >
          {value}
        </a>
      </TextInnerCell>
      {popupVisible ? (
        <VisiblitySensor
          partialVisibility
          onChange={(e) => {
            if (!e) {
              setPopupVisible(false);
            }
          }}
          containment={thisCell.current}
        >
          <TextPopUpCell top={getPosition().top} left={getPosition().left}>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setPopupVisible(false);
              }}
            >
              <Markdown>{value.replace(/\n/g, "\n\n")}</Markdown>
            </a>
          </TextPopUpCell>
        </VisiblitySensor>
      ) : null}
    </React.Fragment>
  );
};

export default TextCell;

TextCell.propTypes = {
  value: PropTypes.string,
};
