import React from "react";
import {
  BilingualSectionDiv,
  BilingualSectionTop,
  LangSpan,
  LangSection,
  BilingualSectionBottom,
} from "./elements";

// class BilingualSection extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { currentSelection: 0, both: false };
// 		this.setLanguage = this.setLanguage.bind(this);
// 		this.toggleBoth = this.toggleBoth.bind(this);
// 	}
// 	toggleBoth() {
// 		const newBoth = !this.state.both;
// 		this.setState({ both: newBoth });
// 	}
// 	setLanguage(e) {
// 		this.setState({ both: false, currentSelection: parseInt(e.target.id.substring(8), 10) });
// 	}
// 	render()

// }

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
