import React from "react";
import {
    Box,
    Image,
    Text,
    Link,
    VStack,
    Heading,
    Tag,
    HStack,
    Icon,
    Button,
    useColorModeValue,
    Flex,
    Divider,
    Avatar,
} from "@chakra-ui/react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FiPhoneCall, FiUser, FiTarget, FiFileText } from "react-icons/fi";

const MentorCard = ({ mentor, userDetails }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black", "white")}
            shadow="md"
            maxW="100%"
            width={'100%'}
            mt={2}
        >
            <HStack
                align="start"
                spacing={6}
            >
                <Flex flexDirection={{base:'column', md:'row'}} justifyContent={'space-between'} width={'100%'}>
                    {/* Left Section */}
                    <VStack
                        align="start"
                        spacing={4}
                        flex="1"
                    >
                        <HStack spacing={4}>
                            <Avatar
                                boxSize="100px"
                                src={userDetails?.avatar}
                                name={userDetails?.name}
                                alt={`${userDetails?.name}'s avatar`}
                            />
                            <VStack
                                align="start"
                                spacing={0}
                            >
                                <Heading size="lg">
                                    {userDetails?.name}{" "}
                                    <Icon
                                        as={FaCheckCircle}
                                        color="blue.500"
                                    />
                                </Heading>
                                <Text color="blue.400">@{userDetails?.username}</Text>
                                <Text>
                                    {
                                        userDetails?.experiences?.map(exp =>  exp.isWorking === true ? `${exp.title} @ ${exp.company}` : "")
                                    }
                                </Text>
                            </VStack>
                        </HStack>
                        <Text color="gray.400">{userDetails?.bio}</Text>
                        <HStack
                            spacing={4}
                            align="center"
                        >
                            <Icon
                                as={FaStar}
                                color="yellow.400"
                            />
                            <Text>{mentor?.rating} Ratings</Text>
                            <Icon
                                as={FaCheckCircle}
                                color="green.400"
                            />
                            <Text>
                                {mentor?.sessionsTaken} Sessions Completed
                            </Text>
                        </HStack>
                        <HStack
                            spacing={2}
                            wrap="wrap"
                        >
                            {userDetails?.skills?.map((skill, index) => (
                                <Tag
                                    key={index}
                                    colorScheme="blue"
                                >
                                    {skill}
                                </Tag>
                            ))}
                        </HStack>
                    </VStack>
                    {/* Right Section */}
                    <VStack
                        align="start"
                        spacing={4}
                        flex="0.6"
                    >
                        <Text>What this Mentor offers:</Text>
                        <VStack
                            align="start"
                            spacing={3}
                        >
                            {/* <HStack>
                                <Icon
                                    as={FiPhoneCall}
                                    color="orange.400"
                                />
                                <Text>Audio/Video Sessions</Text>
                            </HStack> */}
                            <HStack>
                                <Icon
                                    as={FiUser}
                                    color="purple.400"
                                />
                                <Text> Chat Sessions</Text>
                            </HStack>
                            <HStack>
                                <Icon
                                    as={FiTarget}
                                    color="red.400"
                                />
                                <Text>Goal Setting & Follow Ups</Text>
                            </HStack>
                        </VStack>
                        <Button
                            colorScheme="blue"
                            size="sm"
                            w="full"
                        >
                            Book One Time Mentorship @ ₹50
                        </Button>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default MentorCard;
