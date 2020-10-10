import styled from 'styled-components/native';

interface ButtonProps {
  backgroundColor: string;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 60px;
  height: 60px;
  border-radius: 25px;
  border: 2px;
  background-color: ${props => props.backgroundColor};
`;
