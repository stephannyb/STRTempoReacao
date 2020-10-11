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
  const [timeReaction, setTimeReaction] = useState<number>(0);
  const [timeReactionMedia, setTimeReactionMedia] = useState<number | null>(
    null,
  );

  const [stop, setStop] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

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
    // console.log({ initialTime, date: new Date(initialTime || 0) });
    await new Promise(resolve => setTimeout(resolve, 200));
    setSelectedColor(null);
  }, [colors]);

  const handleStart = useCallback(async () => {
    // console.log('start');
    setScore(0);
    setTimeReaction(0);
    setTimeReactionMedia(null);
    getNewColor();
    setStart(true);
    setTimes([]);
  }, [getNewColor]);

  const handleColorButton = useCallback(
    async (colorName: string) => {
      setFinalTime(new Date().getTime());

      if (start) {
        const isCorrectAnswer = colorName === colorVerification;

        if (finalTime && initialTime && !stop && isCorrectAnswer) {
          const tr = finalTime - initialTime;
          setTimeReaction(tr);
          times.push(tr);
        }
        if (!stop) setScore(isCorrectAnswer ? score + 1 : score - 1);
        setStop(score >= 9);

        await new Promise(resolve => setTimeout(resolve, 1000));
        getNewColor();
      }
      if (stop) {
        const trSoma = times.reduce((acc, cur) => acc + cur);
        // console.log({ trSoma });
        // console.log(times.length);

        const trMedia = trSoma / times.length;
        trMedia.toFixed(2);
        setTimeReactionMedia(trMedia);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorVerification, getNewColor, score, stop, start, finalTime, times],
  );

  return (
    <Container>
      <Header>
        <AppTitle>STeRa</AppTitle>
      </Header>
      <Score>
        <ScoreTitle>SCORE</ScoreTitle>
        <ScoreValue>{score}</ScoreValue>
        <TimeReactionTitle>Tempo de Reação (ms)</TimeReactionTitle>
        <TimeReactionValue> {timeReaction} </TimeReactionValue>
        <TimeReactionTitle>Tempo de Reação Medio (ms)</TimeReactionTitle>
        <TimeReactionValue> {timeReactionMedia} </TimeReactionValue>
        {/* <ScoreValue>{times.map(time => time)}</ScoreValue> */}
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
