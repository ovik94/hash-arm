import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const selected = keyframes`
  25% {
    transform: scale(1.25);
    text-shadow: 1vmin 1vmin 0 hsla(0 0% 0% / 0.1);
  }
  40% {
    transform: scale(0.92);
    text-shadow: 0 0 0 hsla(0 0% 0% / 0.2);
  }
  60% {
    transform: scale(1.02);
    text-shadow: 0.5vmin 0.5vmin 0 hsla(0 0% 0% / 0.1);
  }
  75% {
    transform: scale(0.98);
  }
  85% {
    transform: scale(1);
  }
}`;

const tickAnimate = keyframes`
  40% {
     transform: rotate(-12deg);
   }
`;

const styles = (
  props: {
    size?: string,
    lg?: string,
    lgHs?: string,
    lgStop?: string,
    rotation?: number,
    hasPrize?: boolean
  } = {}
): Record<string, SxProps<Theme>> => ({
  wrapper: {
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden'
  },
  dealWheel: {
    opacity: props.hasPrize ? 0.3 : 1,
    height: '100vh',
    position: 'relative',
    display: 'grid',
    gridGap: `calc(${props.size} / 20)`,
    alignItems: 'center',
    gridTemplateAreas: '"spinner" "trigger"',

    span: {
      fontSize: `calc(${props.size} / 26)`
    },

    ul: {
      padding: 0,
      position: 'relative',
      display: 'grid',
      alignItems: 'center',
      gridTemplateAreas: '"spinner"',
      width: props.size,
      height: props.size,
      transform: `rotate(calc(${props.rotation} * 1deg))`,
      borderRadius: '50%',
      gridArea: 'spinner'
    },

    li: {
      display: 'flex',
      alignItems: 'center',
      padding: `0 calc(${props.size} / 6) 0 calc(${props.size} / 10)`,
      width: '50%',
      height: '50%',
      transformOrigin: 'center right',
      userSelect: 'none',
      gridArea: 'spinner'
    }
  },

  ticker: {
    gridArea: 'spinner',
    position: 'relative',
    left: `calc(${props.size} / -15)`,
    width: `calc(${props.size} / 10)`,
    height: `calc(${props.size} / 20)`,
    background: `${props.lg}`,
    zIndex: 1,
    clipPath: 'polygon(20% 0, 100% 50%, 20% 100%, 0% 50%)',
    transformOrigin: 'center left'
  },

  isSpinningTicker: {
    animation: `${tickAnimate} 700ms cubic-bezier(0.34, 1.56, 0.64, 1)`
  },

  selectedText: {
    color: 'white',
    animation: `${selected} 800ms ease`
  },

  button: {
    zIndex: 11,
    paddingTop: '16px',
    paddingBottom: '16px'
  },
  prizeText: {
    position: 'absolute',
    textAlign: 'center',
    top: '40%',
    color: '#9f2720',
    paddingRight: '24px',
    paddingLeft: '24px'
  }
});

export default styles;
