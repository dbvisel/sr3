import React from 'react';
import styled from 'styled-components';

const BilingualSectionDiv = styled.div`
	border: 1px solid var(--borderColor);
	/* padding-bottom: 0.5em; */
	border-radius: 8px;
	margin-bottom: 1em;
`;

const BilingualSectionTop = styled.div`
	padding: 0.5em 1em;
	border-bottom: 1px solid var(--borderColor);
	margin-bottom: 0.5em;
	display: flex;
	justify-content: space-between;
	background-color: var(--borderColor);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
`;

const BilingualSectionBottom = styled.div`
	padding: 0 1em;
	display: ${props => (props.both ? 'flex' : 'block')};
	justify-content: space-between;
`;

const LangSpan = styled.span`
	cursor: pointer;
	font-family: var(--headerFont);
	font-weight: ${props => (props.selected ? 'bold' : 'normal')};
	& + span {
		margin-left: 1em;
	}
`;

const LangSection = styled.div`
	display: ${props => (props.visible ? 'block' : 'none')};
	& > h1,
	h2,
	h3,
	h4 {
		margin-top: 0 !important;
	}
`;

class BilingualSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentSelection: 0, both: false };
		this.setLanguage = this.setLanguage.bind(this);
		this.toggleBoth = this.toggleBoth.bind(this);
	}
	toggleBoth() {
		const newBoth = !this.state.both;
		this.setState({ both: newBoth });
	}
	setLanguage(e) {
		this.setState({ both: false, currentSelection: parseInt(e.target.id.substring(8), 10) });
	}
	render() {
		return (
			<BilingualSectionDiv>
				<BilingualSectionTop>
					<span>
						{this.props.languages.map((language, key) => {
							return (
								<LangSpan
									key={key}
									id={`language${key}`}
									selected={!this.state.both && this.state.currentSelection === key}
									onClick={this.setLanguage}
								>
									{language}
								</LangSpan>
							);
						})}
					</span>
					<LangSpan selected={this.state.both} onClick={this.toggleBoth}>
						Both
					</LangSpan>
				</BilingualSectionTop>
				<BilingualSectionBottom both={this.state.both}>
					{this.props.data.map((language, key) => (
						<LangSection
							visible={this.state.both || this.state.currentSelection === key}
							key={key}
							dangerouslySetInnerHTML={{ __html: language }}
						/>
					))}
				</BilingualSectionBottom>
			</BilingualSectionDiv>
		);
	}
}

export default BilingualSection;
