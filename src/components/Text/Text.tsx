
import styled from "styled-components";

interface TextProps {
  fontSize?: string;
  fontWeight?: string;
  line?: string;
  margin?: string
  color?: string;
  alignment?: string
}

export const Text = styled.div<TextProps>`
  color: ${(props) => props.color || "rgb(255, 255, 255)"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "700"};
  line-height: ${(props) => props.line || ""};
  margin: ${(props) => props.margin || ""};
  text-align: ${(props) => props.alignment || "left"};

  @media screen and (max-width: 562px) {
    font-size: 14px;
  }
`;
