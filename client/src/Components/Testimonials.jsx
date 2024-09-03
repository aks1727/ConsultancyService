import {
    Box,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ bgHeader, textColor }) => {
    const textRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }
        );

        cardRefs.current.forEach((card, index) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                        once: true,
                        stagger: 0.2,
                    },
                }
            );
        });
    }, []);


    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            py={12}
            px={4}
            bgGradient={bgHeader}
            maxW="100%"
            mx="auto"
        >
            <Heading
                size="lg"
                mb={6}
                color={textColor}
                ref={textRef}
                textAlign="center"
            >
                What Our Clients Say
            </Heading>
            <Divider
                orientation="horizontal"
                mb={6}
                borderColor={useColorModeValue("teal.500", "teal.200")}
                width="100%"
            />
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={8}
                w="100%"
                maxW={"80%"}
            >
                {[
                    "This service has truly transformed my career. The guidance I received was invaluable!",
                    "The mentorship I got here helped me reach my fitness goals faster than I ever expected.",
                    "Exceptional support and advice during my college application process. Highly recommended!",
                ].map((testimonial, index) => (
                    <Box
                        key={index}
                        p={6}
                        borderRadius="xl"
                        boxShadow="2xl"
                        color={textColor}
                        transition="all 0.3s ease"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "2xl",
                        }}
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        <Text
                            fontSize="lg"
                            textAlign="center"
                            fontStyle="italic"
                            color={useColorModeValue("gray.700", "gray.300")}
                        >
                            "{testimonial}"
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default Testimonials;
