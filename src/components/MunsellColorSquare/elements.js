import styled from "styled-components";

export const MunsellBlock = styled.span`
  display: inline-block;
  height: 1em;
  width: 1em;
  background-color: ${(props) => props.color || "transparent"};
  position: relative;
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 1px;
  top: 1.5px;
`;
