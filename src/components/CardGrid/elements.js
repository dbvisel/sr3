import styled from "styled-components";
import { withPrefix } from "gatsby";

export const CardGridWrapper = styled.div`
  --insidePadding: 12px;
  --gutter: 16px;
  --cardWidth: 180px;
  --cardHeight: 360px;
  --borderRadius: 4px;
  max-width: 100%;
  overflow-x: hidden;
  & > div {
    padding: var(--gutter);
    padding-top: 25px;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    min-width: 100%;
    overflow-x: scroll;
  }
`;

export const CardGridCard = styled.div`
  margin: 0 var(--gutter) var(--gutter) 0;
  min-width: var(--cardWidth);
  min-height: var(--cardHeight);
  border-radius: var(--borderRadius);
  transition: 0.5s;
  user-select: none;
  flex: 1;
  background-image: url(${(props) => withPrefix(props.image)});
  background-size: cover;
  background-position: center center;
  position: relative;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 var(--gutter) rgba(0, 0, 0, 0.125);
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.color};
    opacity: 0.5;
    z-index: 1;
  }
  & > a {
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: var(--cardHeight);
    padding: var(--insidePadding);
    border-bottom: none !important;
    color: var(--white) !important;
    justify-content: center;
    transition: 0.5s;
    & h3 {
			font-family: var(--textFont)
      margin: 0;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      font-size: 20px;
    }
    & h4 {
			font-family: var(--textFont)
      margin: 0;
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 var(--insidePadding);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
    & p {
      width: 100%;
      text-align: left;
      font-style: italic;
      font-family: var(--headerFont);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const LocationList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  & li {
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-flex;
    align-items: center;
    & span {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      margin-right: 4px;
    }
    & + li {
      margin-left: 16px;
    }
  }
`;
