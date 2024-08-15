import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import conf from "../conf/conf";
import MentorCard from "../Components/Card/MentorCard";
import Loader from "../Components/Loader/Loader.jsx"
const Search = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const value = searchParams.get("value");
    const [searchQuery, setSearchQuery] = useState(value || "");
    const [searchData, setSearchData] = useState([]);
    const [isLoader, setIsLoader] = useState(false)

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
        setIsLoader(false)
    };

    useEffect(() => {
        // Fetch and display mentors based on the value or name
        if (value) {
            searchContent();
            console.log(searchData, "search Data");
        }
    }, [value]);

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`?value=${searchQuery}`);
    };

    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("black", "white");
    const placeholderColor = useColorModeValue("gray.500", "gray.300");

    return isLoader ? <Loader/> :(
        <>
            <VStack
                spacing={4}
                align="stretch"
                bg={bg}
                color={color}
                p={4}
                borderRadius="md"
                shadow="md"
                maxW="full"
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
                            />
                            <Button
                                type="submit"
                                colorScheme="blue"
                                ml={2}
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
                shadow="md"
                maxW="full"
                mt={1}
                mb={20}
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
                        {searchData?.map((item) => <MentorCard
                                key={item?.data._id}
                                mentor={item?.data}
                                userDetails={item?.data.userId}
                            /> 
                        )}
                    </VStack>
                )}
            </Box>
        </>
    );
};

export default Search;
