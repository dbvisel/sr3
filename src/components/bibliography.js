import React from 'react';
import styled from 'styled-components';

const BibliographyP = styled.p`
	margin-left: 2em !important;
	text-indent: -2em !important;
	& + p {
		margin-top: 1em !important;
	}
`;

const Bibliography = ({ children }) => <BibliographyP>{children}</BibliographyP>;

export default Bibliography;
