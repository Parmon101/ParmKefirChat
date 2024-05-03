
import styled from "styled-components";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  margin?: string
  color?: string;
  textAlign?: string
}

export const Text = styled.div<TextProps>`
  color: ${(props) => props.color || "rgb(255, 255, 255)"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "700"};
  line-height: ${(props) => props.lineHeight || ""};
  line-height: ${(props) => props.lineHeight || ""};
  margin: ${(props) => props.margin || ""};
  text-align: ${(props) => props.textAlign || "left"};


  @media screen and (max-width: 562px) {
    font-size: 14px;
  }
`;
