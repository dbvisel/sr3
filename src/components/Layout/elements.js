import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  width: 100%;
  max-width: 100vw;
  /* overflow-x: hidden; */ /* disabling this to make sticky work! */
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  padding-bottom: 32px;
  padding-right: 10px;
  width: 100%;
  /* max-width: 800px; */
  /* overflow-x: hidden; */ /* disabling this to make sticky work! */
  width: calc(100% - 220px);
  & article h1 a {
    color: var(--black);
    text-decoration: none;
    transition: 0.25s;
    &:hover {
      color: var(--orange);
      text-decoration: underline;
      transition: 0.25s;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    padding-left: 10px;
  }
`;
