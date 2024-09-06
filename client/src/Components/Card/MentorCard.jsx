import React from "react";
import {
    Box,
    Text,
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
    Badge,
    Stack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FiUser, FiTarget, FiAward } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const MentorCard = ({ mentor, userDetails, id }) => {
    const cardBg = useColorModeValue(
        "linear-gradient(to bottom, #f9f9f9, #ffffff)",
        "linear-gradient(to bottom, #2D3748, #1A202C)"
    );
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const headingColor = useColorModeValue("blue.600", "blue.300");
    const textColor = useColorModeValue("gray.700", "gray.300");

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            bg={cardBg}
            color={useColorModeValue("black", "white")}
            shadow="lg"
            maxW="100%"
            width="100%"
            mt={4}
            borderColor={borderColor}
            transition="all 0.3s"
            _hover={{
                boxShadow: "2xl",
                transform: "scale(1.02)",
            }}
        >
            <HStack
                align="start"
                spacing={6}
            >
                <Flex
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    width="100%"
                >
                    {/* Left Section */}
                    <VStack
                        align="start"
                        spacing={4}
                        flex="1"
                    >
                        <HStack spacing={4}>
                            <Avatar
                                boxSize="120px"
                                src={userDetails?.avatar}
                                name={userDetails?.name}
                                alt={`${userDetails?.name}'s avatar`}
                                shadow="md"
                                border="2px solid"
                                borderColor={headingColor}
                            />
                            <VStack
                                align="start"
                                spacing={2}
                            >
                                <NavLink
                                    to={`/profile/u/${userDetails?.username}`}
                                >
                                    <Heading
                                        size="lg"
                                        color={headingColor}
                                    >
                                        {userDetails?.name}{" "}
                                        <Icon
                                            as={FaCheckCircle}
                                            color="blue.500"
                                        />
                                    </Heading>
                                    <Text
                                        color="blue.400"
                                        fontWeight="bold"
                                    >
                                        @{userDetails?.username}
                                    </Text>
                                </NavLink>
                                <Text
                                    fontSize="sm"
                                    color={textColor}
                                >
                                    {userDetails?.experiences
                                        ?.filter((exp) => exp.isWorking)
                                        .map(
                                            (exp) =>
                                                `${exp.title} @ ${exp.company}`
                                        )
                                        .join(", ")}
                                </Text>
                            </VStack>
                        </HStack>
                        <Text
                            color={textColor}
                            fontSize="sm"
                        >
                            {userDetails?.bio}
                        </Text>
                        <HStack
                            spacing={4}
                            align="center"
                        >
                            <HStack spacing={2}>
                                <Icon
                                    as={FaStar}
                                    color="yellow.400"
                                />
                                <Text
                                    fontWeight="bold"
                                    color={textColor}
                                >
                                    {mentor?.rating} Ratings
                                </Text>
                            </HStack>
                            <HStack spacing={2}>
                                <Icon
                                    as={FaCheckCircle}
                                    color="green.400"
                                />
                                <Text
                                    fontWeight="bold"
                                    color={textColor}
                                >
                                    {mentor?.sessionsTaken} Sessions Completed
                                </Text>
                            </HStack>
                        </HStack>
                        <HStack
                            spacing={2}
                            wrap="wrap"
                        >
                            {userDetails?.skills?.map((skill, index) => (
                                <Tag
                                    key={index}
                                    colorScheme="blue"
                                    borderRadius="full"
                                    p={2}
                                >
                                    {skill}
                                </Tag>
                            ))}
                        </HStack>
                        <Stack spacing={2}>
                            {userDetails?.certifications?.map((cert, index) => (
                                <Badge
                                    key={index}
                                    colorScheme="green"
                                    variant="subtle"
                                >
                                    <Icon
                                        as={FiAward}
                                        mr={2}
                                    />{" "}
                                    {cert}
                                </Badge>
                            ))}
                        </Stack>
                    </VStack>

                    {/* Divider */}
                    <Divider
                        borderColor={borderColor}
                        orientation="vertical"
                        height="auto"
                        width="2px" // Increased width for visibility
                        mx={6}
                    />
                    
                    {/* Right Section */}
                    <VStack
                        align="start"
                        spacing={4}
                        flex="0.6"
                    >
                        <Text
                            fontWeight="bold"
                            color={headingColor}
                        >
                            What this Mentor Offers:
                        </Text>
                        <VStack
                            align="start"
                            spacing={3}
                        >
                            <HStack>
                                <Icon
                                    as={FiUser}
                                    color="purple.400"
                                />
                                <Text>Chat Sessions</Text>
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
                            as={NavLink}
                            to={`/chat/${id}`}
                            colorScheme="blue"
                            size="md"
                            w="full"
                            shadow="md"
                            transition="background-color 0.2s, transform 0.2s"
                            _hover={{
                                bg: useColorModeValue("blue.400", "blue.600"),
                                transform: "translateY(-2px)",
                            }}
                        >
                            Chat with mentor @ ₹50
                        </Button>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default MentorCard;
