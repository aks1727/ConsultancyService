import { Button, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
const CallToAction = ({bgHeader,textColor}) => {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            bgGradient={bgHeader}
        >
            <Heading
                size="lg"
                mb={6}
                color={textColor}
            >
                Ready to Transform Your Journey?
            </Heading>
            <Divider
                orientation="horizontal"
                mb={6}
            />
            <Stack
                spacing={4}
                align="center"
                maxW={"80%"}
            >
                <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color={textColor}
                    textAlign="center"
                >
                    Join our community and start making meaningful changes
                    today. Sign up now to get started!
                </Text>
                <Button
                    size="lg"
                    colorScheme="teal"
                    borderRadius="full"
                    px={10}
                    py={6}
                    onClick={() => {
                        if (!authStatus) {
                            navigate('/login')
                        }
                        else {
                            navigate('/search')
                        }
                    }}
                    _hover={{ transform: "scale(1.05)" }}
                >
                    Get Started
                </Button>
            </Stack>
        </Flex>
    );
};

export default CallToAction;
