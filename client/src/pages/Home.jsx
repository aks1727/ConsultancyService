import {
    Box,
    Button,
    Text,
    useColorModeValue,
    Flex,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import Loader from "../Components/Loader/Loader";
import Card from "../Components/Card/Card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Home() {
    const [isLoader, setIsLoader] = useState(false);
    const bgHeader = useColorModeValue("blue.100", "blue.900");
    const textColor = useColorModeValue("black", "white");
    const boxBg = useColorModeValue("blue.100", "blue.900");
    const cardBg = useColorModeValue("blue.100", "blue.900");

    const cardBg1 = useColorModeValue("green.200", "green.600");
    const cardBg2 = useColorModeValue("purple.200", "purple.600");
    const cardBg3 = useColorModeValue("red.200", "red.600");
    const cardBg4 = useColorModeValue("cyan.300", "cyan.600");
    const cardBg5 = useColorModeValue("yellow.200", "yellow.600");
    const cardBg6 = useColorModeValue("orange.200", "orange.600");
    const cardBg7 = useColorModeValue("teal.200", "teal.500");
    const cardBg8 = useColorModeValue("pink.100", "pink.600");
    const cardTextColor = useColorModeValue("black", "white");
    useEffect(() => {
        setIsLoader(true);
        setTimeout(() => {
            setIsLoader(false);
        }, 2000);
    }, []);


    return isLoader ? (
        <Loader />
    ) : (
        <>
            <Navbar
                NAV_ITEMS={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Feed",
                        href: "/feed",
                    },
                    {
                        label: "Mentorship",
                        href: "/mentorship",
                    },
                    {
                        label: "Roadmaps",
                        href: "/roadmaps",
                    },
                    {
                        label: "Why <Name>",
                        href: "#why-name",
                    },
                    {
                        label: "How it Works",
                        href: "#how-it-works",
                    },
                ]}
            />
            <Flex
                w="100%"
                h="max-content"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-evenly"
                p={5}
                pt="8rem"
                pb={20}
                bg={bgHeader}
            >
                <Box
                    w="40rem"
                    bg="red"
                    id="firstBox"
                >
                    <Box
                        p={10}
                        bg={bgHeader}
                    >
                        <Text
                            fontSize="4xl"
                            fontWeight="bold"
                            color={textColor}
                        >
                            Your one stop solution for skill-based learning
                        </Text>
                        <Text
                            fontSize="xl"
                            color={textColor}
                        >
                            Launched NEW FREE Skill Based Roadmaps to Upskill
                            Yourself
                        </Text>

                        <Box
                            pt={10}
                            pb={10}
                            bg={bgHeader}
                            textAlign={"left"}
                        >
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <Box
                                    bg={cardBg}
                                    color={cardTextColor}
                                    p={4}
                                    borderRadius="md"
                                >
                                    Connect with peers for jobs, projects and
                                    much more
                                </Box>
                                <Box
                                    bg={cardBg}
                                    color={cardTextColor}
                                    p={4}
                                    borderRadius="md"
                                >
                                    Build connections that help you grow!
                                </Box>
                                <Box
                                    bg={cardBg}
                                    color={cardTextColor}
                                    p={4}
                                    borderRadius="md"
                                >
                                    Network with peers for projects, interview
                                    preparation
                                </Box>
                                <Box
                                    bg={cardBg}
                                    color={cardTextColor}
                                    p={4}
                                    borderRadius="md"
                                >
                                    Expert advice a one click away for jobs,
                                    mock interviews
                                </Box>
                            </SimpleGrid>
                        </Box>

                        <Button
                            colorScheme="blue"
                            mt={4}
                        >
                            Checkout Now
                        </Button>
                    </Box>
                </Box>
                <Box
                    w="40rem"
                    bg={boxBg}
                    p={4}
                    borderRadius="md"
                >
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={5}
                    >
                        <Card
                            ConsultancyType="Career Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg1}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Fitness Coach"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg2}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Exam/College Consultancy"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg3}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Freelancers Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg4}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="HealthCare Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg5}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Business Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg6}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Social Media Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg7}
                            cardTextColor={cardTextColor}
                        />
                        <Card
                            ConsultancyType="Financial Consultant"
                            Description="Lorem ipsum dolor sit amet, consectetur adipisicing."
                            cardBg={cardBg8}
                            cardTextColor={cardTextColor}
                        />
                    </SimpleGrid>
                </Box>
            </Flex>
        </>
    );
}

export default Home;
