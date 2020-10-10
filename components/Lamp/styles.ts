import styled from 'styled-components/native';

interface LampProps {
  backgroundColor: string;
}

export const Lamp = styled.View<LampProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.backgroundColor};
`;
