import {
    Box,
    Divider,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = ({ bgHeader, textColor }) => {
    const headingRef = useRef(null);
    const faqRefs = useRef([]);

    useEffect(() => {
        // Animate heading
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    once: true,
                },
            }
        );

        // Animate FAQ items
        faqRefs.current.forEach((faq, index) => {
            gsap.fromTo(
                faq,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: faq,
                        start: "top 85%",
                        once: true,
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
            bgGradient={bgHeader}
        >
            <Heading
                size="lg"
                mb={6}
                color={textColor}
                ref={headingRef}
            >
                Frequently Asked Questions
            </Heading>
            <Divider
                orientation="horizontal"
                mb={6}
                borderColor={useColorModeValue("gray.400", "gray.600")}
            />
            <Stack
                spacing={6}
                w="100%"
                maxW={"80%"}
                px={4}
            >
                {[
                    {
                        question: "How do I get started?",
                        answer: "Simply sign up on our platform and choose the consultancy type that suits you.",
                    },
                    {
                        question: "What types of consultants are available?",
                        answer: "We offer a wide range of consultants including career, fitness, and business experts.",
                    },
                    {
                        question:
                            "Can I book a session with multiple consultants?",
                        answer: "Yes, you can book sessions with different consultants based on your needs.",
                    },
                ].map((faq, index) => (
                    <Box
                        key={index}
                        p={6}
                        borderRadius="lg"
                        boxShadow="xl"
                        // bg={useColorModeValue("white", "gray.700")}
                        color={textColor}
                        transition="all 0.3s ease"
                        ref={(el) => (faqRefs.current[index] = el)}
                        _hover={{
                            transform: "scale(1.03)",
                            boxShadow: "2xl",
                        }}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                            mb={2}
                        >
                            {faq.question}
                        </Text>
                        <Text>{faq.answer}</Text>
                    </Box>
                ))}
            </Stack>
        </Flex>
    );
};

export default FAQ;
