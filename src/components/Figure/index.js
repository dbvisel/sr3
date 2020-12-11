import React from "react";
import { withPrefix } from "gatsby";
import { ReportContext } from "./../Context/";
import { FigureDiv } from "./elements";

// this should have report ID in scope

// props:
// —caption
// -credit:
// -img: filename or array of filenames

// TODO: if we're dealing with more than two figures, figure out a smart way to display them?
// TODO: use gatsby image here. Pull in images by GraphQL

// props:
//
// number: the figure number, if there is one.
// caption: the caption, also used as alt text. Can be HTML. (see scc/1-general-background, last image)
// credit: photo credit
// img: either a string or an array of strings, the filename for the image

const Figure = ({ number, caption, credit, img }) => {
  let builtCaption = "";
  if (number) {
    builtCaption = `Figure ${number}: `;
  }
  if (caption) {
    builtCaption += caption;
  }
  if (credit) {
    builtCaption += `<span style="margin-left:2em;"><strong>Credit:</strong> ${credit}</span>`;
  }
  return (
    <FigureDiv>
      <ReportContext.Consumer>
        {(currentDataSetID) => {
          return (
            <React.Fragment>
              {typeof img === "object" ? (
                <div>
                  {img.map((thisImg, index) => (
                    <a
                      key={index}
                      href={withPrefix(
                        `/${currentDataSetID}/images/${thisImg}`
                      )}
                      target="__blank"
                    >
                      <img
                        src={withPrefix(
                          `/${currentDataSetID}/images/${thisImg}`
                        )}
                        alt={caption || ""}
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={withPrefix(`/${currentDataSetID}/images/${img}`)}
                  target="__blank"
                >
                  <img
                    src={
                      img
                        ? withPrefix(`/${currentDataSetID}/images/${img}`)
                        : null
                    }
                    alt={caption}
                  />
                </a>
              )}
              <React.Fragment>
                {builtCaption ? (
                  <figcaption
                    dangerouslySetInnerHTML={{ __html: builtCaption }}
                  />
                ) : null}
              </React.Fragment>
            </React.Fragment>
          );
        }}
      </ReportContext.Consumer>
    </FigureDiv>
  );
};

export default Figure;
