import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../components/layout';
import TextWrapper from '../components/textwrapper';

const IndexPage = () => (
	<StaticQuery
		query={graphql`
			query IndexQuery {
				markdownRemark(frontmatter: { path: { eq: "masterindex" } }) {
					html
				}
			}
		`}
		render={data => {
			let masterText = data.markdownRemark.html || 'error!';
			return (
				<Layout menu={{}}>
					<TextWrapper>
						<div dangerouslySetInnerHTML={{ __html: masterText }} />
					</TextWrapper>
				</Layout>
			);
		}}
	/>
);

export default IndexPage;
