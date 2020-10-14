import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
// import { IoIosRadioButtonOn } from 'react-icons/io';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  background-color: grey;
  width: 100%;
  height: 90px;
  justify-content: center;
  align-items: center;
`;

export const AppTitle = styled.Text`
  font-size: 30px;
  padding: 10px;
`;

export const ScoreTitle = styled.Text`
  font-size: 25px;
  padding: 2px;
`;

export const ScoreValue = styled.Text`
  font-size: 25px;
  padding: 2px;
`;

export const TimeReactionTitle = styled.Text`
  font-size: 20px;
  padding: 2px;
`;

export const TimeReactionValue = styled.Text`
  font-size: 20px;
  padding: 2px;
`;

export const Score = styled.View`
  background-color: #dcdcdc;
  height: 200px;
  align-items: center;
`;

export const Lamps = styled.View`
  background-color: #dcdcdc;
  height: 300px;
  border: 1px;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const LampRow = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Buttons = styled.View`
  background-color: #dcdcdc;
  height: 100px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Menu = styled.View`
  flex-direction: row;
  background-color: #dcdcdc;
  height: 70%;
  padding: 10px;
  justify-content: space-evenly;
  /* align-items: center; */
`;

export const StartButton = styled(RectButton)`
  width: 100px;
  border-radius: 10px;
  padding: 2px;
  background-color: gray;
  align-items: center;
`;

export const StartButtonText = styled.Text`
  font-size: 30px;
  padding: 10px;
`;
