import React from "react";
import PropTypes from "prop-types";
import {
  BilingualSectionDiv,
  BilingualSectionTop,
  LangSpan,
  LangSection,
  BilingualSectionBottom,
} from "./elements";

const BilingualSection = ({ languages, data }) => {
  const [currentSelection, setCurrentSelection] = React.useState(0);
  const [both, setBoth] = React.useState(false);
  return (
    <BilingualSectionDiv>
      <BilingualSectionTop>
        <span>
          {languages.map((language, key) => {
            return (
              <LangSpan
                key={key}
                id={`language${key}`}
                selected={!both && currentSelection === key}
                onClick={(e) => {
                  e.preventDefault();
                  setBoth(false);
                  setCurrentSelection(parseInt(e.target.id.substring(8), 10));
                }}
              >
                {language}
              </LangSpan>
            );
          })}
        </span>
        <LangSpan
          selected={both}
          onClick={() => {
            setBoth(() => !both);
          }}
        >
          Both
        </LangSpan>
      </BilingualSectionTop>
      <BilingualSectionBottom both={both}>
        {data.map((language, key) => (
          <LangSection
            visible={both || currentSelection === key}
            key={key}
            dangerouslySetInnerHTML={{ __html: language }}
          />
        ))}
      </BilingualSectionBottom>
    </BilingualSectionDiv>
  );
};

export default BilingualSection;

BilingualSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  languages: PropTypes.arrayOf(PropTypes.string),
};
