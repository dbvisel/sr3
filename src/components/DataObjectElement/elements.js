import styled from "styled-components";

export const SuperfieldDiv = styled.div`
  & h3 {
    font-style: italic;
    font-weight: normal;
    font-size: 1em;
    margin-bottom: 0.5em;
  }
  & p span:first-of-type {
    padding-left: ${(props) => (props.indent ? "2em" : "0")};
  }
`;

export const DataP = styled.p`
  margin: 0;
  margin-bottom: 1em;
  text-indent: 0;
  display: flex;
`;

export const FieldName = styled.span`
  font-family: var(--headerFont);
  font-weight: normal;
  display: inline-block;
  width: 300px;
  margin-right: 16px;
  box-sizing: border-box;
`;

export const FieldValue = styled.span`
  flex: 1;
  & a {
    color: var(--orange);
    text-decoration: none;
  }
`;

export const FieldImage = styled.img`
  max-width: 100%;
`;
