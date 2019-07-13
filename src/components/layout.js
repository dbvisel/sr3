import React from 'react';
// import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';

import Header from './header';
import LeftMenu from './../components/leftmenu';
import Footer from './footer';
import ReportContext from './reportcontext';

// TODO: this needs to provide report ID to everything in it

const Main = styled.main`
	display: flex;
	width: 100%;
	max-width: 100vw;
	/* overflow-x: hidden; */ /* disabling this to make sticky work! */
	@media screen and (max-width: 767px) {
		flex-direction: column;
	}
`;

const Wrapper = styled.div`
	padding-bottom: 32px;
	padding-right: 10px;
	width: 100%;
	max-width: 800px;
	/* overflow-x: hidden; */ /* disabling this to make sticky work! */
	@media screen and (max-width: 767px) {
		padding-left: 10px;
	}
`;

const Layout = ({ data, children, menu, thisPage }) => {
	let masterData = data.allTheJson.master;
	// console.log(menu);
	// console.log(masterData);
	return (
		<ReportContext.Provider value={menu.id || null}>
			<Header
				siteTitle={masterData.projectTitle}
				reportTitle={menu.title || masterData.projectAuthor}
				reportID={menu.id || null}
			/>
			<Main>
				<LeftMenu menuData={menu.id ? menu : masterData} thisPage={thisPage} />
				<Wrapper>{children}</Wrapper>
			</Main>
			<Footer updated={menu.lastUpdated || masterData.lastUpdated} />
		</ReportContext.Provider>
	);
};

export default props => (
	<StaticQuery
		query={graphql`
			query MasterQuery {
				allTheJson(master: { id: { eq: "master" } }) {
					master {
						id
						lastUpdated
						projectTitle
						projectAuthor
						possibleReports {
							name
							id
						}
					}
				}
			}
		`}
		render={data => <Layout data={data} {...props} />}
	/>
);
