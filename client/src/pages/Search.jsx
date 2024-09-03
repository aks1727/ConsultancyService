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
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoader(false);
    };

    useEffect(() => {
        // Fetch and display mentors based on the value or name
        if (value) {
            searchContent();
            console.log(searchData, "search Data");
        }
    }, [value]);

    useEffect(() => {
        // GSAP animation for search results
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
        // Animate search box on page load
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

    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("black", "white");
    const placeholderColor = useColorModeValue("gray.500", "gray.300");

    return isLoader ? (
        <Loader />
    ) : (
        <>
            <VStack
                spacing={4}
                align="stretch"
                bg={bg}
                color={color}
                p={4}
                borderRadius="md"
                shadow="lg"
                maxW="full"
                ref={searchBoxRef}
            >
                <form onSubmit={handleSearch}>
                    <FormControl id="search">
                        <Flex>
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by value or name"
                                _placeholder={{ color: placeholderColor }}
                                bg={useColorModeValue("white", "gray.800")}
                                border="2px solid"
                                borderColor={useColorModeValue(
                                    "gray.300",
                                    "gray.700"
                                )}
                                _focus={{
                                    borderColor: useColorModeValue(
                                        "blue.400",
                                        "blue.600"
                                    ),
                                    boxShadow:
                                        "0 0 5px 2px rgba(0, 0, 255, 0.2)",
                                }}
                                transition="border-color 0.2s, box-shadow 0.2s"
                            />
                            <Button
                                type="submit"
                                colorScheme="blue"
                                ml={2}
                                _hover={{ transform: "scale(1.05)" }}
                                transition="transform 0.2s"
                            >
                                Search
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
                {value && (
                    <Box
                        bg={useColorModeValue("white", "gray.800")}
                        p={1}
                        borderRadius="md"
                    >
                        <Text
                            as="h2"
                            fontSize={"lg"}
                        >
                            Search Results for: {value}
                        </Text>
                    </Box>
                )}
            </VStack>
            <Box
                spacing={4}
                align="stretch"
                bg={bg}
                color={color}
                p={4}
                borderRadius="md"
                shadow="lg"
                maxW="full"
                mt={1}
                mb={20}
                ref={resultsRef}
            >
                <Heading
                    as="h2"
                    fontSize={"lg"}
                >
                    Mentors:
                </Heading>
                {searchData.length > 0 && (
                    <VStack
                        spacing={4}
                        w={"100%"}
                    >
                        {searchData?.map((item) => (
                            <MentorCard
                                key={item?.data._id}
                                mentor={item?.data}
                                userDetails={item?.data.userId}
                                id={item?.data._id}
                            />
                        ))}
                    </VStack>
                )}
            </Box>
        </>
    );
};

export default Search;
