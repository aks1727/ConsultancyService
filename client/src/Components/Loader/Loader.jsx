import { Box, Image, keyframes, Text, useColorModeValue } from "@chakra-ui/react";
// import logo from "./path/to/logo.png"; // Replace with your logo path

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px); /* Increased height for a bigger bounce */
  }
`;

const Loader = () => {
    const bg = useColorModeValue('gray.100', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const ballColor = useColorModeValue('blue.500', 'blue.900');

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
            {/* Replace the text with an image logo if necessary */}
            <Text
                color={textColor}
                fontSize="2xl" /* Increased font size */
                fontWeight="bold"
                mb={6}
                _hover={{
                    transform: "scale(1.05)", // Subtle hover effect
                    transition: "transform 0.3s ease",
                }}
            >
                Logo
            </Text>

            {/* Loader Dots */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {[1, 2, 3].map((dot) => (
                    <Box
                        key={dot}
                        width={{ base: "12px", md: "16px" }} /* Responsive size */
                        height={{ base: "12px", md: "16px" }}
                        bg={ballColor}
                        borderRadius="50%"
                        mx="4px" /* Increased spacing between dots */
                        boxShadow="0 4px 10px rgba(0, 0, 0, 0.2)" /* Added shadow for depth */
                        animation={`${bounce} 0.8s ${dot * 0.2}s infinite ease-in-out`}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Loader;
