// eslint-disable-next-line no-use-before-define
import React, { useCallback, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  TimeReactionTitle,
  TimeReactionValue,
} from './styles';

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

  const timeReactionMedio = useMemo<number | null>(() => {
    return gameData.getTimeReactionMedio();
  }, [score]);

  const [gameState, setGameState] = useState<'on' | 'off'>('off');

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const [timeMedio, setTimeMedio] = useState<number>(0);

  const [disableColorButton, setDisableColorButton] = useState<boolean>(true);

  const blinkColor = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (score > 9) {
      setGameState('off');
      return;
    }

    const colorCode = Math.floor(Math.random() * 4);
    const lampPosition = Math.floor(Math.random() * 15);

    setSelectedColor(colors[colorCode].name);
    setSelectedPosition(lampPosition);

    await new Promise(resolve => setTimeout(resolve, 200));

    gameData.create(colors[colorCode].name);

    setDisableColorButton(false);
    setSelectedColor(null);
  }, [colors, score]);

  const handleStart = useCallback(async () => {
    if (gameState === 'on') return;

    gameData.reset();

    setGameState('on');
    setTimeMedio(0);

    setScore(0);

    blinkColor();
  }, [blinkColor, gameState]);

  const handleColorButton = useCallback(
    async (clickedColor: string) => {
      if (gameState === 'off') return;

      const isCorrect = gameData.verifyUserAnswear(clickedColor);
      const newScore = isCorrect ? score + 1 : score - 1;
      if (newScore >= 0) setScore(newScore);

      if (newScore < 10) await blinkColor();
      else {
        setGameState('off');
        setTimeMedio(timeReactionMedio || 0);
      }
    },
    [blinkColor, gameState, score, timeReactionMedio],
  );

  return (
    <Container>
      <Header>
        <AppTitle>STeRa</AppTitle>
      </Header>
      <Score>
        <ScoreTitle>SCORE</ScoreTitle>
        <ScoreValue>{score}</ScoreValue>
        <TimeReactionTitle>Tempo de Reação: (ms)</TimeReactionTitle>
        <TimeReactionValue>{timeReaction.toFixed(2)}</TimeReactionValue>
        <TimeReactionTitle>Tempo Medio de Reação: (ms)</TimeReactionTitle>
        <TimeReactionValue>{timeMedio.toFixed(2)}</TimeReactionValue>
      </Score>
      <Lamps>
        <LampRow>
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 0 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 1 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 2 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 3 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 4 && selectedColor) || 'transparent'}
          />
        </LampRow>
        <LampRow>
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 5 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 6 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 7 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 8 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 9 && selectedColor) || 'transparent'}
          />
        </LampRow>
        <LampRow>
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 10 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 11 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 12 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 13 && selectedColor) || 'transparent'}
          />
          <MaterialCommunityIcons
            name="lightbulb"
            size={80}
            color={(selectedPosition === 14 && selectedColor) || 'transparent'}
          />
        </LampRow>
      </Lamps>
      <Buttons>
        <Ionicons
          name="ios-radio-button-on"
          size={80}
          color="yellow"
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('yellow');
          }}
        />
        <Ionicons
          name="ios-radio-button-on"
          size={80}
          color="blue"
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('blue');
          }}
        />
        <Ionicons
          name="ios-radio-button-on"
          size={80}
          color="green"
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('green');
          }}
        />
        <Ionicons
          name="ios-radio-button-on"
          size={80}
          color="red"
          disabled={disableColorButton}
          onPress={() => {
            setDisableColorButton(true);
            handleColorButton('red');
          }}
        />
      </Buttons>

      <Menu>
        <MaterialCommunityIcons
          name="play-circle"
          size={75}
          color="gray"
          onPress={() => handleStart()}
        />
        <MaterialCommunityIcons
          name="stop-circle"
          size={75}
          color="gray"
          onPress={() => setGameState('off')}
        />
      </Menu>
    </Container>
  );
};

export default App;
