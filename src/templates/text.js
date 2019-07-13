import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from './../components/layout';
import DataSetContext from './../components/datasetcontext';
import TextWrapper from './../components/textwrapper';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
// import FoonoteCallout from '../../../src/styledcomponents/footnotecallout';
// import Footnote from '../../../src/styledcomponents/footnote';

const HeaderSection = styled.div`
	padding-bottom: 10px;
	border-bottom: 1px solid var(--borderColor);
	margin-bottom: 16px;
	padding-right: 20px;
	max-width: 800px;
	@media screen and (max-width: 767px) {
		padding-left: 10px;
		padding-right: 10px;
	}
	& h1,
	& h2,
	& h3,
	& h4 {
		font-size: 16px;
		line-height: 24px;
		margin: 0;
	}
	& h3,
	& h4 {
		font-family: var(--textFamily);
		font-style: italic;
	}
`;

// const renderAst = new rehypeReact({
// 	createElement: React.createElement,
// 	components: { 'inline-data-set': InlineDataSetWrapper }
// }).Compiler;

class TextPage extends React.Component {
	render() {
		const data = this.props.data;
		const pageContext = this.props.pageContext;
		const { frontmatter, code } = data.mdx;
		const { reportData, dataSets } = pageContext;
		console.log(reportData);
		return (
			<Layout title={frontmatter.title} menu={reportData} thisPage={frontmatter.path}>
				<HeaderSection>
					{/*<h1>
					{reportData.projectTitle}–{reportData.title}
				</h1>*/}
					<h2>
						{frontmatter.title}
						{frontmatter.subtitle ? (
							<>
								<br />
								{frontmatter.subtitle}
							</>
						) : null}
					</h2>
					<h3>{frontmatter.author || reportData.author || ''}</h3>
					{reportData.date || frontmatter.date ? <h4>{reportData.date || frontmatter.date}</h4> : null}
				</HeaderSection>
				<DataSetContext.Provider value={{ dataSets }}>
					<TextWrapper>
						<MDXRenderer>{code.body}</MDXRenderer>
					</TextWrapper>
				</DataSetContext.Provider>
			</Layout>
		);
	}
}

export const pageQuery = graphql`
	query($path: String!) {
		mdx(frontmatter: { path: { eq: $path } }) {
			id
			frontmatter {
				path
				title
				subtitle
				author
				date
			}
			code {
				body
			}
		}
	}
`;

export default TextPage;
