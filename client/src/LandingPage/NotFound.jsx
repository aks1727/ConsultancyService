// src/components/NotFound.jsx
import React from "react";
import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    useColorModeValue,
    keyframes
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const NotFound = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            height="100vh"
            bg={bgColor}
            p={4}
        >
            <Box mb={4}>
                <Box animation={`${spin} infinite 20s linear`}>
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95.49-7.43-2.94-7.93-6.93H5v-2h1.07c.48-2.14 2.07-3.87 4.15-4.54V5h2v1.07c2.14.48 3.87 2.07 4.54 4.15H19v2h-1.07c-.48 2.14-2.07 3.87-4.15 4.54V19h-2v-1.07c-1.05-.26-2.02-.75-2.86-1.44l-1.41 1.41C10.05 17.98 11 18.5 12 18.93v1.14z"
                            fill="currentColor"
                        />
                    </svg>
                </Box>
            </Box>
            <Heading
                as="h1"
                size="2xl"
                mb={4}
                color={textColor}
            >
                Page Not Found
            </Heading>
            <Text
                fontSize="lg"
                mb={4}
                color={textColor}
            >
                Oops! The page you are looking for does not exist.
            </Text>
            <Flex
                direction="column"
                align="center"
            >
                <Button
                    colorScheme="teal"
                    as={NavLink}
                    to="/"
                    mb={2}
                >
                    Go to Home
                </Button>
                <Button
                    colorScheme="teal"
                    as={NavLink}
                    to="/feed"
                    mb={2}
                >
                    Go to feed
                </Button>
                <Button
                    colorScheme="teal"
                    as={NavLink}
                    to="/roadmaps"
                    mb={2}
                >
                    Roadmaps
                </Button>
            </Flex>
        </Flex>
    );
};

export default NotFound;
