import React from 'react';
import styled from 'styled-components';
import ReportContext from './reportcontext';

// this should have report ID in scope

// props:
// —caption
// -credit:
// -img: filename or array of filenames

// TODO: if we're dealing with more than two figures, figure out a smart way to display them?
// TODO: use gatsby image here. Pull in images by GraphQL

const FigureDiv = styled.figure`
	text-align: center;
	margin: 32px 0;
	& img {
		max-width: 100%;
	}
	& div {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		& a {
			width: 49%;
			border: none;
			& + a {
				margin-left: 2%;
			}
		}
	}
	& figcaption {
		font-style: italic;
		font-family: var(--headerFont);
		margin: 16px 64px 0 64px;
		& p {
			text-align: left;
		}
	}
`;

// props:
//
// caption: the caption, also used as alt text. Can be HTML. (see scc/1-general-background, last image)
// img: either a string or an array of strings, the filename for the image

const Figure = props => {
	let caption = '';
	if (props.number) {
		caption = `Figure ${props.number}: `;
	}
	if (props.caption) {
		caption = caption + props.caption;
	}
	if (props.credit) {
		caption = caption + `<span style="margin-left:2em;"><strong>Credit:</strong> ${props.credit}</span>`;
	}
	return (
		<FigureDiv>
			<ReportContext.Consumer>
				{currentDataSetID => {
					return (
						<>
							{typeof props.img === 'object' ? (
								<div>
									{props.img.map((thisImg, index) => (
										<a key={index} href={`/${currentDataSetID}/images/${thisImg}`} target="__blank">
											<img src={`/${currentDataSetID}/images/${thisImg}`} alt={props.caption || ''} />
										</a>
									))}
								</div>
							) : (
								<a href={`/${currentDataSetID}/images/${props.img}`} target="__blank">
									<img src={props.img ? `/${currentDataSetID}/images/${props.img}` : null} alt={props.caption} />
								</a>
							)}
							<>{props.caption ? <figcaption dangerouslySetInnerHTML={{ __html: caption }} /> : null}</>
						</>
					);
				}}
			</ReportContext.Consumer>
		</FigureDiv>
	);
};

export default Figure;
