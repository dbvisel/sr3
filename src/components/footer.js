import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

const FooterDiv = styled.footer`
	margin-top: 0;
	border-top: 1px solid var(--borderColor);
	padding: 1em 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	& a {
		color: black;
		text-decoration: none;
		border-bottom: 2px solid var(--orange);
		&:hover {
			text-decoration: none;
			color: var(--orange);
		}
	}
	& p {
		text-align: center;
		max-width: 1024px;
		margin: 0;

		& + p {
			margin-top: 8px;
		}
	}
`;

//TODO: put in a static query to get footers on a per-site basis (or feed this through layout)
//TODO: figure out how to make React live with "xmlns:cc"

const getFooter = function(data, thisReport) {
	for (let i = 0; i < data.length; i++) {
		if (data[i].node.frontmatter.report === thisReport) {
			console.log(data[i].node);
			return data[i].node.code.body;
		}
	}
	return null;
};

const Footer = ({ reportID }) => (
	<StaticQuery
		query={graphql`
			query FooterQuery {
				allMdx(filter: { frontmatter: { title: { eq: "footer" } } }) {
					edges {
						node {
							frontmatter {
								report
								path
							}
							code {
								body
							}
						}
					}
				}
			}
		`}
		render={data => {
			let myFooter = getFooter(data.allMdx.edges, reportID || 'masterfooter');
			return (
				<FooterDiv>
					<MDXRenderer>{myFooter}</MDXRenderer>
				</FooterDiv>
			);
		}}
	/>
);

// const Footer = ({ updated }) => (
// 	<FooterDiv>
// 		<p>
// 			<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
// 				<img
// 					alt="Creative Commons License"
// 					style={{ borderWidth: 0 }}
// 					src="https://i.creativecommons.org/l/by/4.0/80x15.png"
// 				/>
// 			</a>{' '}
// 			<span /* xmlns:dct="https://purl.org/dc/terms/" */ property="dct:title">
// 				Southeast Asian Archaeological Site Reports No.1 - Singapore Cricket Club
// 			</span>{' '}
// 			by <span /* xmlns:cc="https://creativecommons.org/ns#"*/ property="cc:attributionName">John N. Miksic</span> is
// 			licensed under a{' '}
// 			<a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
// 				Creative Commons Attribution 4.0 International License
// 			</a>
// 			. Permissions beyond the scope of this license may be available at{' '}
// 			<a
// 				/* xmlns:cc="https://creativecommons.org/ns#" */
// 				href="https://nuspress.nus.edu.sg/pages/contact-us"
// 				rel="cc:morePermissions"
// 			>
// 				<em>https://nuspress.nus.edu.sg/pages/contact-us</em>
// 			</a>
// 			.
// 		</p>
// 		<p>
// 			DOI:{' '}
// 			<a href="https://doi.org/10.25717/7w0e-3n3c">
// 				<em>https://doi.org/10.25717/7w0e-3n3c</em>
// 			</a>
// 		</p>
// 		<p>
// 			Supported by Heritage Research Grant of the National Heritage Board, Singapore. Any opinions, findings, and
// 			conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily
// 			reflect the views of the National Heritage Board, Singapore.
// 			<br />
// 			Last updated {updated}.
// 		</p>
// 	</FooterDiv>
// );

export default Footer;
