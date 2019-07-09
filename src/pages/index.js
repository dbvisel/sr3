import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../components/layout';

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
					<div dangerouslySetInnerHTML={{ __html: masterText }} />
				</Layout>
			);
		}}
	/>
);

export default IndexPage;
