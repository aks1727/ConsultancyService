import { Box, Image, keyframes, Text, useColorModeValue } from "@chakra-ui/react";
// import logo from "./path/to/logo.png"; // Replace with your logo path

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Loader = () => {

    const bg = useColorModeValue('gray.100','gray.800')
    const text = useColorModeValue('black', 'white')
    const ball = useColorModeValue('blue.500', 'blue.900')
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            width="100vw"
            bg={bg}
        >
            {/* <Image
                src={logo}
                alt="Logo"
                boxSize="100px"
                mb={4}
            /> */}
        <Text color={text} mb={4}>Logo</Text>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {[1, 2, 3].map((dot) => (
                    <Box
                        key={dot}
                        width="10px"
                        height="10px"
                        bg={ball}
                        borderRadius="50%"
                        mx="2px"
                        animation={`${bounce} 0.6s ${
                            dot * 0.1
                        }s infinite ease-in-out`}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Loader;
