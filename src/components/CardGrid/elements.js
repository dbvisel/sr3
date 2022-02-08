import styled from "styled-components";

const colors = [
  "#e8e800",
  "#7ffd00",
  "#3dff9e",
  "#00fafa",
  "#c9e4ff",
  "#dedeff",
  "#ecdaff",
  "#ffd3ff",
  "#ffd5ea",
  "#ffd7d7",
  "#ffdab6",
  "#ffdab6",
];

const getColor = (index) => colors[index % colors.length];

export const CardGridWrapper = styled.div`
  --insidePadding: 12px;
  --gutter: 16px;
  --cardWidth: 180px;
  --cardHeight: 180px;
  --borderRadius: 4px;
  margin-top: var(--gutter);
  margin-right: calc(0px - var(--gutter));
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;
`;

export const CardGridCard = styled.div`
  border: 1px solid var(--black);
  margin: 0 var(--gutter) var(--gutter) 0;
  width: var(--cardWidth);
  min-height: var(--cardHeight);
  border-radius: var(--borderRadius);
  transition: 0.5s;
  background-color: ${(props) => getColor(props.color)};
  user-select: none;
  & > a {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: var(--insidePadding);
    border-bottom: none !important;
    & h3 {
      margin: 0 0 var(--insidePadding);
      font-size: 16px;
    }
    & h4 {
      margin: 0;
      font-weight: normal;
      font-size: 14px;
      margin: 0 0 var(--insidePadding);
    }
    & p {
      text-align: right;
      font-style: italic;
      font-family: var(--headerFont);
      font-size: 11px;
    }
  }
  &:hover {
    transform: scale(1.05);
  }
`;
