import styled from "styled-components";

export const FooterDiv = styled.footer`
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
