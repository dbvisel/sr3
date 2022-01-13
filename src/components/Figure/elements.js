import styled from "styled-components";

export const FigureDiv = styled.figure`
  text-align: center;
  margin: 32px 0;
  & img {
    max-width: 100%;
  }
  & div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    & a {
      width: 49%;
      border: none;
      & + a {
        margin-left: 2%;
      }
    }
  }
  & figcaption {
    font-style: italic;
    font-family: var(--headerFont);
    margin: 16px 64px 0 64px;
    & em {
      font-style: normal;
    }
    & p {
      text-align: left;
    }
  }
`;
