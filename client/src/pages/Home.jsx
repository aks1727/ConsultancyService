import {
    Box,
    Button,
    Text,
    useColorModeValue,
    Flex,
    SimpleGrid,
    VStack,
    Image,
    Divider,
    Stack,
    Heading,
} from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import Navbar from "../Components/Navigation/Navbar";
import Card from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CallToAction from "../Components/CallToAction"
import BlogHighlights from "../Components/BlogHighlights"
import FAQ from "../Components/FAQ"
import Testimonials from "../Components/Testimonials"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function Home() {
    const bgHeader = useColorModeValue(
        "white",
        "linear(to-r, blue.900, teal.800)"
    );
    const textColor = useColorModeValue("black", "white");
    const cardTextColor = useColorModeValue("black", "white");

    // Refs for animations
    const headerRef = useRef(null);
    const buttonRef = useRef(null);
    const cardsRef = useRef([]);

    // Initialize refs dynamically
    if (!cardsRef.current) {
        cardsRef.current = [];
    }

    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    useEffect(() => {
        // Header Animation
        gsap.from(headerRef.current, {
            opacity: 0,
            y: -100,
            duration: 1.2,
            ease: "power3.out",
        });

    

        // Cards Animation using GSAP timeline and ScrollTrigger
        const cardsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                once: true, // Trigger animation only once
                markers: false, // Disable markers for production
                toggleActions: "play none none none", // Only play animation on enter
            },
        });

        // Ensure each card is visible during animation
        cardsRef.current.forEach((card, index) => {
            if (card) {
                cardsTimeline.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    immediateRender: false, // Ensures correct render behavior
                });
            }
        });

        return () => {
            // Cleanup ScrollTrigger on component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleCardRef = (el, index) => {
        if (el) cardsRef.current[index] = el; // Ensure ref is correctly assigned
    };

    return (
        <>
            <Flex
                flexDirection="column"
                overflowX="hidden"
            >
                <Navbar
                    NAV_ITEMS={[
                        { label: "Home", href: "/" },
                        { label: "Search Mentors", href: "/search" },
                        { label: "Consultancy", href: "#consultancy" },
                    ]}
                />
                {/* Hero Section */}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    w="100%"
                    minH="100vh"
                    bgGradient={bgHeader}
                    p={6}
                    ref={headerRef}
                    pt={20}
                >
                    <VStack
                        spacing={6}
                        textAlign="center"
                        maxW="600px"
                        px={4}
                    >
                        <Text
                            fontSize={{ base: "3xl", md: "5xl" }}
                            fontWeight="extrabold"
                            color={textColor}
                        >
                            Accelerate Your Learning Journey
                        </Text>
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            opacity={0.8}
                        >
                            Dive into our newly launched skill-based roadmaps
                            and get guidance from top-notch mentors.
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
                            Explore Now
                        </Button>
                    </VStack>
                    <Image
                        src="/img/learningIllustration.jpg"
                        alt="Learning illustration"
                        maxW="50%"
                        mt={10}
                        boxShadow="xl"
                        borderRadius="lg"
                    />
                </Flex>
                {/* Additional Section */}
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    py={12}
                    bgGradient={bgHeader}
                    id="consultancy"
                >
                    <Heading
                        size="lg"
                        mb={6}
                        color={textColor}
                    >
                        Our Top Consultants
                    </Heading>
                    <Divider
                        orientation="horizontal"
                        mb={6}
                    />
                    <Stack
                        spacing={4}
                        align="center"
                    >
                        <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color={textColor}
                            textAlign="center"
                        >
                            Discover our experts who are here to guide you
                            through various professional and personal
                            challenges.
                        </Text>
                    </Stack>
                </Flex>
                {/* Cards Section */}
                <Flex
                    w="100%"
                    py={10}
                    px={5}
                    align="center"
                    justify="center"
                    bgGradient={bgHeader}
                >
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={8}
                        w="100%"
                        maxW={"60%"}
                    >
                        {[
                            {
                                title: "Career Consultant",
                                bg: "green.200",
                                description:
                                    "Get personalized advice to excel in your professional journey.",
                            },
                            {
                                title: "Fitness Coach",
                                bg: "purple.200",
                                description:
                                    "Achieve your fitness goals with guidance from certified trainers.",
                            },
                            {
                                title: "Exam/College Consultancy",
                                bg: "red.200",
                                description:
                                    "Navigate exams and college admissions with expert support.",
                            },
                            {
                                title: "Freelancers Consultant",
                                bg: "cyan.200",
                                description:
                                    "Learn how to build a successful freelance career.",
                            },
                            {
                                title: "HealthCare Consultant",
                                bg: "yellow.200",
                                description:
                                    "Receive expert health advice and wellness plans tailored to you.",
                            },
                            {
                                title: "Business Consultant",
                                bg: "orange.200",
                                description:
                                    "Grow your business with strategies from seasoned professionals.",
                            },
                            {
                                title: "Social Media Consultant",
                                bg: "teal.200",
                                description:
                                    "Boost your brand's presence on social media platforms.",
                            },
                            {
                                title: "Financial Consultant",
                                bg: "pink.200",
                                description:
                                    "Manage your finances and investments with expert insights.",
                            },
                        ].map((consultancy, index) => (
                            <Box
                                key={index}
                                ref={(el) => handleCardRef(el, index)}
                                bg={useColorModeValue(
                                    consultancy.bg,
                                    consultancy.bg.replace(".200", ".600")
                                )}
                                p={5}
                                borderRadius="xl"
                                boxShadow="lg"
                                _hover={{
                                    transform: "translateY(-5px)",
                                    boxShadow: "2xl",
                                }}
                                transition="all 0.3s ease"
                            >
                                <Card
                                    ConsultancyType={consultancy.title}
                                    Description={consultancy.description}
                                    cardBg={useColorModeValue(
                                        consultancy.bg,
                                        consultancy.bg.replace(".200", ".600")
                                    )}
                                    cardTextColor={cardTextColor}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Flex>
                {/* // Testimonials Section */}
                <Testimonials
                    bgHeader={bgHeader}
                    textColor={textColor}
                />
                
                {/* // FAQ Section */}
                <FAQ
                    bgHeader={bgHeader}
                    textColor={textColor}
                />
                {/* // Blog Highlights Section */}
                <BlogHighlights
                    bgHeader={bgHeader}
                    textColor={textColor}
                />
                {/* // Call-to-Action Section */}
                <CallToAction
                    bgHeader={bgHeader}
                    textColor={textColor}
                />
                {/* Footer Section */}
                <Footer bgHeader={bgHeader} />
            </Flex>
        </>
    );
}

export default Home;
