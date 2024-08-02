import React from 'react';
import { Box, keyframes, useColorModeValue } from '@chakra-ui/react';

const Loader = () => {
  const bg = useColorModeValue('gray.800', 'gray.800');
  const squareColor = useColorModeValue('yellow.400', 'yellow.300');

  const animation = keyframes`
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(100%, 0);
    }
    50% {
      transform: translate(100%, 100%);
    }
    75% {
      transform: translate(0, 100%);
    }
    100% {
      transform: translate(0, 0);
    }
  `;

  const loaderBoxStyles = {
    width: '230px',
    aspectRatio: '1',
    padding: '10px',
    boxSizing: 'border-box',
    display: 'grid',
    background: bg,
    filter: ' blur(5px) contrast(10) hue-rotate(300deg)',
    mixBlendMode: 'darken'
  };

  const loaderAnimationStyles = {
    content: '""',
    gridArea: '1/1',
    width: '100px',
    height: '100px',
    background: squareColor,
    filter: 'brightness(2)', // Increase brightness of the squares
    animation: `${animation} 2s infinite`,
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    bg,
  };

  return (
    <Box {...containerStyles}>
        Logo
      <Box {...loaderBoxStyles}>
        <Box as="div" sx={loaderAnimationStyles} />
        <Box as="div" sx={{ ...loaderAnimationStyles, animationDelay: '-1s' }} />
      </Box>
    </Box>
  );
};

export default Loader;
