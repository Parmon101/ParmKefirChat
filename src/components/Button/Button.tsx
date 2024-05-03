import styled from "styled-components";
import { Text } from "../Text";

interface ButtonProps {
  title?: string;
  disabled?: boolean
  onClick?: () => void;
}

const ButtonStyle = styled.button`
  cursor: pointer;
  width: 234px;
  height: 36px;
  margin-top: 60px;
  border-radius: 4px;
  backdrop-filter: blur(27px);
  background: rgb(49, 52, 57);
  border: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7; 
  }


  &:disabled {
    opacity: 0.5; 
    cursor: not-allowed;
  }

  @media screen and (max-width: 562px) {
    margin-top: 40px;
  }
`;


export const Button = ({ title, disabled, onClick }: ButtonProps) => {
  return (
    <ButtonStyle onClick={onClick} disabled={disabled}>
      <Text fontSize="16px" fontWeight="400" lineHeight="22px" alignment="center">{title}</Text>
    </ButtonStyle>
  );
};
