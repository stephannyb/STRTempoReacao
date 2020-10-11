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
  TimeReactionTitle,
  TimeReactionValue,
} from './styles';

import Button from './components/Button';
import Lamp from './components/Lamp';

import GameData from './gameData';

const gameData = new GameData();

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

  const timeReaction = useMemo<number>(() => {
    return gameData.getTimeReaction();
  }, [score]);

  const [gameState, setGameState] = useState<'on' | 'off'>('off');

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [disableColorButton, setDisableColorButton] = useState<boolean>(true);

  const blinkColor = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (score > 9) {
      setGameState('off');
      return;
    }

    const colorCode = Math.floor(Math.random() * 4);

    setSelectedColor(colors[colorCode].name);

    await new Promise(resolve => setTimeout(resolve, 200));

    gameData.create(colors[colorCode].name);

    setDisableColorButton(false);
    setSelectedColor(null);
  }, [colors, score]);

  const handleStart = useCallback(async () => {
    if (gameState === 'on') return;

    gameData.reset();

    setGameState('on');

    setScore(0);

    blinkColor();
  }, [blinkColor, gameState]);

  const handleColorButton = useCallback(
    async (clickedColor: string) => {
      if (gameState === 'off') return;

      const isCorrect = gameData.verifyUserAnswear(clickedColor);
      const newScore = isCorrect ? score + 1 : score;
      if (isCorrect) setScore(score + 1);

      if (newScore < 10) await blinkColor();
      else setGameState('off');
    },
    [blinkColor, gameState, score],
  );

  return (
    <Container>
      <Header>
        <AppTitle>STeRa</AppTitle>
      </Header>
      <Score>
        <ScoreTitle>SCORE</ScoreTitle>
        <ScoreValue>{score}</ScoreValue>
        <TimeReactionTitle>Tempo de Reação:</TimeReactionTitle>
        <TimeReactionValue>{timeReaction.toFixed(2)}</TimeReactionValue>
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
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('yellow');
          }}
          backgroundColor="yellow"
        />
        <Button
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('blue');
          }}
          backgroundColor="blue"
        />
        <Button
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('green');
          }}
          backgroundColor="green"
        />
        <Button
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('red');
          }}
          backgroundColor="red"
        />
      </Buttons>

      <Menu>
        <StartButton onPress={() => handleStart()}>
          <StartButtonText>Start</StartButtonText>
        </StartButton>
        <StartButton onPress={() => setGameState('off')}>
          <StartButtonText>Stop</StartButtonText>
        </StartButton>
      </Menu>
    </Container>
  );
};

export default App;
