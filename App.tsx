// eslint-disable-next-line no-use-before-define
import React, { useCallback, useMemo, useState } from 'react';

import {
  AppTitle,
  Container,
  Header,
  Score,
  Lamps,
  Buttons,
  Menu,
  LampRow,
  ScoreTitle,
  ScoreValue,
  StartButton,
  StartButtonText,
} from './styles';

import Button from './components/Button';
import Lamp from './components/Lamp';

interface IColor {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const colors = useMemo<IColor[]>(() => {
    return [
      { id: 0, name: 'yellow' },
      { id: 1, name: 'blue' },
      { id: 2, name: 'green' },
      { id: 3, name: 'red' },
    ];
  }, []);

  const [score, setScore] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number | null>(null);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorVerification, setColorVerification] = useState<string | null>(
    null,
  );

  const getNewColor = useCallback(async () => {
    const random = Math.floor(Math.random() * 4);
    setSelectedColor(colors[random].name);
    setColorVerification(colors[random].name);
    setInitialTime(new Date().getTime());
    console.log({ initialTime, date: new Date(initialTime || 0) });
    await new Promise(resolve => setTimeout(resolve, 200));
    setSelectedColor(null);
  }, [colors]);

  const handleStart = useCallback(() => {
    console.log('start');
    setScore(0);
    getNewColor();
    setTimes([]);
  }, [getNewColor]);

  const handleColorButton = useCallback(
    async (colorName: string) => {
      setFinalTime(new Date().getTime());
      console.log({ finalTime, date: new Date(finalTime || 0) });
      const isCorrectAnswer = colorName === colorVerification;

      if (finalTime && initialTime)
        setTimes([...times, finalTime - initialTime]);

      setScore(isCorrectAnswer ? score + 1 : score - 1);

      await new Promise(resolve => setTimeout(resolve, 1000));
      getNewColor();
    },
    [colorVerification, getNewColor, score, initialTime, finalTime, times],
  );

  return (
    <Container>
      <Header>
        <AppTitle>STeRa</AppTitle>
      </Header>
      <Score>
        <ScoreTitle>SCORE</ScoreTitle>
        <ScoreValue>{times.map(time => time)}</ScoreValue>
      </Score>
      <Lamps>
        <LampRow>
          <Lamp backgroundColor={selectedColor || 'transparent'} />
          {/* <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="blue" /> */}
        </LampRow>
        {/* <LampRow>
          <Lamp backgroundColor="yellow" />
          <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="blue" />
        </LampRow>
        <LampRow>
          <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="blue" />
          <Lamp backgroundColor="red" />
          <Lamp backgroundColor="blue" />
        </LampRow> */}
      </Lamps>
      <Buttons>
        <Button
          onPress={() => handleColorButton('yellow')}
          backgroundColor="yellow"
        />
        <Button
          onPress={() => handleColorButton('blue')}
          backgroundColor="blue"
        />
        <Button
          onPress={() => handleColorButton('green')}
          backgroundColor="green"
        />
        <Button
          onPress={() => handleColorButton('red')}
          backgroundColor="red"
        />
      </Buttons>

      <Menu>
        <StartButton onPress={() => handleStart()}>
          <StartButtonText>Start</StartButtonText>
        </StartButton>
      </Menu>
    </Container>
  );
};

export default App;
