import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Input,
    Flex,
    Heading,
    useColorModeValue,
    VStack,
    FormControl,
    Text,
    HStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import gsap from "gsap";
import { CiSearch } from "react-icons/ci";
import conf from "../conf/conf";
import MentorCard from "../Components/Card/MentorCard";
import Loader from "../Components/Loader/Loader.jsx";

const Search = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const value = searchParams.get("value");
    const [searchQuery, setSearchQuery] = useState(value || "");
    const [searchData, setSearchData] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const resultsRef = useRef(null); // For GSAP animations
    const searchBoxRef = useRef(null);

    const searchContent = async () => {
        setIsLoader(true);
        try {
            const res = await fetch(
                `${conf.backendSearch}/searchMentors/?value=${searchQuery}`
            );
            if (!res.ok) throw new Error("Failed to fetch search results");
            const data = await res.json();
            setSearchData(data.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoader(false);
    };

    useEffect(() => {
        if (value) {
            searchContent();
        }
    }, [value]);

    useEffect(() => {
        if (searchData.length > 0) {
            gsap.from(resultsRef.current, {
                duration: 1,
                opacity: 0,
                y: 30,
                ease: "power2.out",
            });
        }
    }, [searchData]);

    useEffect(() => {
        gsap.from(searchBoxRef.current, {
            duration: 1.2,
            y: -20,
            opacity: 0,
            ease: "power2.out",
        });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`?value=${searchQuery}`);
    };

    const bgGradient = useColorModeValue(
        "linear(to-r, teal.400, blue.500)",
        "linear(to-r, teal.800, blue.900)"
    );
    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("black", "white");
    const placeholderColor = useColorModeValue("gray.500", "gray.300");

    return isLoader ? (
        <Loader />
    ) : (
        <>
            <VStack
                spacing={1}
                align="stretch"
                bgGradient={bgGradient}
                color={color}
                p={{base:2, md:8}}
                px={{base:4, md:20}}
                borderRadius="lg"
                shadow="2xl"
                w="100%" 
                maxW="100%" 
                ref={searchBoxRef}
                mx="auto"
            >
                <Heading
                    as="h1"
                    fontSize="2xl"
                    color={useColorModeValue("white", "teal.200")}
                    textAlign="center"
                    mb={1}
                >
                    Find Your Mentor
                </Heading>
                <form onSubmit={handleSearch}>
                    <FormControl id="search">
                        <Flex
                            border="1px solid"
                            borderRadius="full"
                            bg={bg}
                            boxShadow="md"
                            align="center"
                            p={1}
                            pl={4}
                        >
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by value or name"
                                _placeholder={{ color: placeholderColor }}
                                border="none"
                                focusBorderColor="transparent"
                                _focus={{
                                    boxShadow: "none",
                                }}
                                w="100%"
                                bg="transparent"
                            />
                            <Button
                                type="submit"
                                colorScheme="blue"
                                ml={2}
                                borderRadius="full"
                                _hover={{ transform: "scale(1.05)" }}
                                transition="transform 0.2s"
                            >
                                <CiSearch size={20} />
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
                {value && (
                    <Box bg={bg} p={2} borderRadius="lg" mt={2}>
                        <Text
                            as="h2"
                            fontSize="lg"
                            textAlign="center"
                        >
                            Search Results for: <strong>{value}</strong>
                        </Text>
                    </Box>
                )}
            </VStack>

            <Box
                spacing={6}
                bg={bg}
                color={color}
                p={8}
                borderRadius="lg"
                shadow="2xl"
                maxW="full"
                mt={8}
                ref={resultsRef}
            >
                <Heading as="h2" fontSize="xl" mb={4}>
                    Mentors:
                </Heading>
                {searchData.length > 0 ? (
                    <VStack spacing={6} w="100%">
                        {searchData?.map((item) => (
                            <MentorCard
                                key={item?.data._id}
                                mentor={item?.data}
                                userDetails={item?.data.userId}
                                id={item?.data._id}
                            />
                        ))}
                    </VStack>
                ) : (
                    <Text fontSize="lg">No mentors found.</Text>
                )}
            </Box>
        </>
    );
};

export default Search;
