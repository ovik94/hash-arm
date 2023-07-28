import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import JSConfetti from 'js-confetti'
import { Theme } from '@mui/material/styles';
import { IFortune } from '../../store/FortuneStore';
import styles from './styles';
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import useLocale from "../../hooks/useLocale";
import Locale from "./locale";

interface IProps {
  data: Array<IFortune>;
  prize?: { id: string; text: string; };
}

const spinertia = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const FortuneBlock: FC<IProps> = ({ data, prize }): JSX.Element => {
  const locale = useLocale(Locale);

  const [spinnerStyle, setSpinnerStyle] = useState<CSSProperties>({});
  const [prizeSlice, setPrizeSlice] = useState(0);
  const [prizeOffset, setPrizeOffset] = useState(0);
  const [tickerAnim, setTickerAnim] = useState(0);
  const [rotation, setRotation] = useState(25);
  const [disabled, setDisabled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [confetti, setConfetti] = useState<JSConfetti>();

  const currentSlice = useRef<number>(0);

  const createStyles = styles({
    rotation,
    size: 'clamp(250px, 80vmin, 700px)',
    lg: 'linear-gradient(hsl(0 3% 0%) 0 50%, hsl(0 3% 20%) 50% 100%)',
    lgHs: '0 3%',
    lgStop: '50%',
    hasPrize: Boolean(prize)
  });

  const spinnerRef = useRef<HTMLUListElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const setCanvasConfetti = () => {
    const canvas: HTMLCanvasElement = document.getElementById('canvasConfetti') as HTMLCanvasElement;
    setConfetti(new JSConfetti({ canvas }));
  };

  const startConfetti = () => {
    if (confetti) {
      confetti.addConfetti({
        confettiRadius: 5,
        confettiNumber: prize ? 200 : 1
      }).then(() => confetti.clearCanvas());
    }
  }

  useEffect(() => {
    if (data.length) {
      const style = {
        background: `conic-gradient(from -90deg,${data.map(({ color }, i) => `${color} 0 ${(100 / data.length) * (data.length - i)}%`).reverse()})`
      };

      setSpinnerStyle(style);
      setPrizeSlice(360 / data.length);
      setPrizeOffset(Math.floor(180 / data.length));
      setCanvasConfetti();
    }
  }, [data]);


  const selectPrize = (rotate: number) => {
    const selected = Math.floor(rotate / prizeSlice);
    setSelectedIndex(selected);
  };

  useEffect(() => {
    if (prize) {
      setDisabled(true);
      startConfetti();
    }
  }, [prize, confetti]);

  useEffect(() => {
    spinnerRef.current!.addEventListener("transitionend", () => {
      const newRotation = rotation % 360;

      cancelAnimationFrame(tickerAnim);
      setRotation(newRotation)
      selectPrize(newRotation);
      setIsSpinning(false);
      startConfetti();
    });
  }, [spinnerRef.current, prizeSlice, rotation, tickerAnim]);

  const runTickerAnimation = () => {
    const spinnerStyles = window.getComputedStyle(spinnerRef.current!);
    const values: Array<string> = spinnerStyles.transform?.split("(")[1].split(")")[0].split(",") || [];
    const a = values[0];
    const b = values[1];
    let rad = Math.atan2(Number(b), Number(a));

    if (rad < 0) rad += (2 * Math.PI);

    const angle = Math.round(rad * (180 / Math.PI));

    const slice = Math.floor(angle / prizeSlice);

    // анимация язычка, когда его задевает колесо при вращении
    // если появился новый сектор
    if (currentSlice.current !== slice) {
      // убираем анимацию язычка
      tickerRef.current!.style.animation = "none";
      // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
      setTimeout(() => {
        // @ts-ignore
        tickerRef.current!.style.animation = null;
      }, 10);
      // после того, как язычок прошёл сектор - делаем его текущим
      currentSlice.current = slice;
    }
    // запускаем анимацию
    setTickerAnim(requestAnimationFrame(runTickerAnimation));
  };

  const onRun = () => {
    setDisabled(true);
    setRotation(Math.floor(Math.random() * 360 + spinertia(2000, 5000)));
    setIsSpinning(true);
    tickerRef.current!.style.animation = 'none';
    runTickerAnimation();
  }

  return (
    <Box sx={createStyles.wrapper}>
      <Box sx={createStyles.dealWheel}>
        <ul
          className='spinner'
          style={isSpinning ?
            { ...spinnerStyle, transition: 'transform 8s cubic-bezier(0.1, -0.01, 0, 1)' } :
            spinnerStyle}
          ref={spinnerRef}
        >
          {data.map((item, index) => {
            const rotation = ((prizeSlice * index) * -1) - prizeOffset;

            return (
              <li key={item.id} style={{ transform: `rotate(${rotation}deg)` }}>
                <Typography
                  variant="caption"
                  sx={selectedIndex === index ? createStyles.selectedText : {}}
                >
                  {item.text}
                </Typography>
              </li>
            );
          })}
        </ul>
        <Box
          sx={[createStyles.ticker, ...(isSpinning ? [createStyles.isSpinningTicker] : [])] as SystemStyleObject<Theme>}
          ref={tickerRef}
        />
        <Button onClick={onRun} disabled={disabled} sx={createStyles.button} variant="contained">
          {locale.buttonLabel}
        </Button>
      </Box>

      {prize && (
        <Box sx={createStyles.prizeText}>
          <Typography variant="h6" dangerouslySetInnerHTML={{ __html: locale.prizeText(prize.text)}} />
        </Box>
      )}
      <canvas
        id="canvasConfetti"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
      />
    </Box>
  );
};

export default FortuneBlock;
