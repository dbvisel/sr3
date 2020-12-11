import styled from "styled-components";

export const HeaderSection = styled.div`
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
    font-size: 14px;
    font-style: italic;
  }
`;
