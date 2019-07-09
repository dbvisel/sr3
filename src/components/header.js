import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import logo from '../images/logo.png';

const HeaderDiv = styled.div`
	box-sizing: border-box;
	height: 121px;
	display: flex;
	margin-bottom: 20px;
	padding: 10px;
	border-bottom: 1px solid var(--borderColor);
	& div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		& h1,
		h2 {
			margin: 0;
		}
		h2 {
			font-style: italic;
			font-weight: normal;
		}
	}
	& a {
		text-decoration: none;
		color: var(--black);
	}
	@media screen and (max-width: 767px) {
		flex-direction: column;
		height: unset;
		align-items: center;
		margin-bottom: 0;
		& div {
			& h1 {
				font-size: 24px;
				line-height: 30px;
				margin-top: 16px;
			}
			h2 {
				font-size: 20px;
				line-height: 27px;
			}
		}
	}
`;

const LogoBlock = styled.div`
	width: 72px;
	height: 100px;
	display: flex;
	margin-right: 20px;
	& img {
		width: 72px;
		height: 92px;
	}
`;

const Header = ({ siteTitle, reportTitle, reportID }) => (
	<HeaderDiv>
		<Link to="/">
			<LogoBlock>
				<img src={logo} alt="NUS Press Singapore" />
			</LogoBlock>
		</Link>
		<div>
			<h1>
				<Link to="/">{siteTitle}</Link>
			</h1>
			{reportID ? (
				<h2>
					<Link to={`/${reportID}`}>{reportTitle}</Link>
				</h2>
			) : null}
		</div>
	</HeaderDiv>
);

export default Header;
