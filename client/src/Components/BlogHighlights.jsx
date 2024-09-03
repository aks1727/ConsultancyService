import {
    Box,
    Divider,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlogHighlights = ({ bgHeader, textColor }) => {
    const headingRef = useRef(null);
    const blogRefs = useRef([]);

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

        // Animate blog items
        blogRefs.current.forEach((blog, index) => {
            gsap.fromTo(
                blog,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: blog,
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
                Blog Highlights
            </Heading>
            <Divider
                orientation="horizontal"
                mb={6}
                borderColor={useColorModeValue("gray.400", "gray.600")}
            />
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={8}
                w="100%"
                maxW={"80%"}
            >
                {[
                    {
                        title: "Maximizing Your Career Potential",
                        excerpt:
                            "Discover tips and strategies to enhance your career growth and opportunities.",
                        imgSrc: "/img/careerTips.jpeg",
                    },
                    {
                        title: "Achieving Fitness Goals: A Comprehensive Guide",
                        excerpt:
                            "A detailed guide to setting and achieving your fitness goals effectively.",
                        imgSrc: "/img/fitnessGuide.jpeg",
                    },
                ].map((blog, index) => (
                    <Box
                        key={index}
                        p={5}
                        borderRadius="xl"
                        boxShadow="lg"
                        // bg={useColorModeValue("white", "gray.800")}
                        color={textColor}
                        transition="all 0.3s ease"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "2xl",
                        }}
                        ref={(el) => (blogRefs.current[index] = el)}
                    >
                        <Image
                            src={blog.imgSrc}
                            alt={blog.title}
                            borderRadius="md"
                            mb={4}
                            transition="all 0.3s ease"
                            _hover={{
                                transform: "scale(1.03)",
                            }}
                        />
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                            mb={2}
                        >
                            {blog.title}
                        </Text>
                        <Text>{blog.excerpt}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default BlogHighlights;
