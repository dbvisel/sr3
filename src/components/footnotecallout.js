import React from 'react';
import styled from 'styled-components';

const FootnoteCalloutSpan = styled.span`
	position: relative;
  font-size: 0.75em;
  bottom: 0.5em;}
`;

const FootnoteCallout = props => <FootnoteCalloutSpan>{props.id}</FootnoteCalloutSpan>;

export default FootnoteCallout;
