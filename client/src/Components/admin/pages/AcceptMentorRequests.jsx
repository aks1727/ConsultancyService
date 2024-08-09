import {
    Avatar,
    Badge,
    Box,
    Button,
    Collapse,
    Divider,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useId, useState } from "react";
import conf from "../../../conf/conf";
import { Link, NavLink } from "react-router-dom";
import { FaLinkedin, FaFileDownload } from "react-icons/fa";

function AcceptMentorRequests() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const toast = useToast();
    const {isOpen, onToggle} = useDisclosure();
    const fetchRequest = async () => {
        try {
            const res = await fetch(
                `${conf.backendAdmin}/getAllMentorsRequest`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to load data");
            }
            const resData = await res.json();
            setData(resData.data.mentorRequests);
            console.log(resData.data.mentorRequests);
        } catch (err) {
            setError(err.message);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        

        return isNaN(date.getTime())
            ? "Invalid Date"
            : `${date.getDate().toString().padStart(2, "0")}-${(
                  date.getMonth() + 1
              )
                  .toString()
                  .padStart(2, "0")}-${date.getFullYear()}`;
    };

    const handleAccept = async (requestId, mentorName) => {
        try {
            const res = await fetch(
                `${conf.backendAdmin}/acceptMentorRequest/${requestId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to accept request");
            }
            toast({
                title: "Mentor Accepted",
                description: `Mentor ${mentorName} has been accepted`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setData((prevData) =>
                prevData.filter((req) => req._id !== requestId)
            );
        } catch (error) {
            setError(error.message);
            toast({
                title: "Error",
                description: "Failed to accept request",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const handleReject = async (requestId) => {
        try {
            const res = await fetch(
                `${conf.backendAdmin}/rejectMentorRequest/${requestId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to reject request");
            }
            toast({
                title: "Mentor Rejected",
                description: "Mentor request has been rejected",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setData((prevData) =>
                prevData.filter((req) => req._id !== requestId)
            );
        } catch (error) {
            setError(error.message)
            toast({
                title: "Error",
                description: "Failed to reject request",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    return (
        <>
            <Flex
                p={6}
                h={"100vh"}
                w={"full"}
                flexDirection={"column"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Box mb={6}>
                    <Heading
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                    >
                        Pending Mentor Requests
                    </Heading>
                    <Divider borderBottomWidth={2} />
                </Box>

                <Flex
                    as={"section"}
                    id="mentor-requests"
                    flexDirection={"column"}
                    width={"full"}
                    height={"max-content"}
                    overflowY={"auto"}
                >
                    {data.length > 0 ? (
                        data.map((request, index) => (
                            <Box
                                key={`mentor-request-${index}`}
                                bg={useColorModeValue("white", "gray.700")}
                                w={"full"}
                                p={6}
                                mb={6}
                                borderRadius={"lg"}
                                boxShadow={"lg"}
                            >
                                <Flex
                                    mb={4}
                                    justifyContent={"space-between"}
                                >
                                    <Avatar
                                        name={request.user.name}
                                        src={request.user.avatar}
                                        size={"xl"}
                                        mr={4}
                                    />
                                    <Flex flexDirection={"column"}>
                                        <Text
                                            fontSize={"xl"}
                                            fontWeight={"bold"}
                                        >
                                            {request.user.name}
                                        </Text>
                                        <Text
                                            fontSize={"md"}
                                            color={"gray.500"}
                                        >
                                            {request.user.email}
                                        </Text>
                                        <Text fontSize={"sm"}>
                                            @{request.user.username}
                                        </Text>
                                        <Text fontSize={"sm"}>
                                            {request.user.phoneNumber}
                                        </Text>
                                    </Flex>
                                    <Flex flexDirection={"column"}>
                                        <Text mb={4}>
                                            <strong>Bio: </strong>
                                            {request.user.bio}
                                        </Text>

                                        <Divider
                                            borderBottomWidth={1}
                                            mb={4}
                                        />

                                        <Text mb={4}>
                                            <strong>Gender: </strong>
                                            {request.user.gender}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Divider
                                    borderBottomWidth={1}
                                    mb={4}
                                />
                            {!isOpen && <Button mb={3} w={'full'} onClick={onToggle}>{isOpen ? "Hide Details":"View Details"}</Button>}
                                <Collapse in={isOpen}>
                                    <Flex
                                        wrap={"wrap"}
                                        mb={4}
                                    >
                                        {request.user.skills.map(
                                            (skill, skillIndex) => (
                                                <Badge
                                                    key={`skill-${index}-${skillIndex}`}
                                                    colorScheme={"purple"}
                                                    mr={2}
                                                    mb={2}
                                                >
                                                    {skill}
                                                </Badge>
                                            )
                                        )}
                                    </Flex>

                                    <Divider
                                        borderBottomWidth={1}
                                        mb={4}
                                    />

                                    <Text
                                        fontSize={"lg"}
                                        fontWeight={"bold"}
                                        mb={2}
                                    >
                                        Education Details
                                    </Text>

                                    <Flex wrap={"wrap"}>
                                        {request.user.educations.map(
                                            (edu, eduIndex) => (
                                                <Box
                                                    key={`education-${index}-${eduIndex}`}
                                                    m={4}
                                                    p={4}
                                                    minW={20}
                                                    bg={useColorModeValue(
                                                        "gray.100",
                                                        "gray.600"
                                                    )}
                                                    borderRadius={"md"}
                                                >
                                                    <Text>
                                                        <strong>
                                                            College Name:{" "}
                                                        </strong>
                                                        {edu.collegeName}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Degree:{" "}
                                                        </strong>
                                                        {edu.degree}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Joined:{" "}
                                                        </strong>
                                                        {formatDate(edu.from)}
                                                    </Text>
                                                    <Text>
                                                        <strong>End: </strong>
                                                        {formatDate(edu.to)}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            CGPA/Percentage:{" "}
                                                        </strong>
                                                        {edu.cgpa}
                                                    </Text>
                                                </Box>
                                            )
                                        )}
                                    </Flex>

                                    <Text
                                        fontSize={"lg"}
                                        fontWeight={"bold"}
                                        mb={2}
                                    >
                                        Experience Details
                                    </Text>

                                    <Flex wrap={"wrap"}>
                                        {request.user.experiences.map(
                                            (exp, expIndex) => (
                                                <Box
                                                    key={`experience-${index}-${expIndex}`}
                                                    mb={4}
                                                    p={4}
                                                    bg={useColorModeValue(
                                                        "gray.100",
                                                        "gray.600"
                                                    )}
                                                    borderRadius={"md"}
                                                >
                                                    <Text>
                                                        <strong>
                                                            Position:{" "}
                                                        </strong>
                                                        {exp.title}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Company:{" "}
                                                        </strong>
                                                        {exp.company}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Duration:{" "}
                                                        </strong>
                                                        {exp.duration}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Location:{" "}
                                                        </strong>
                                                        {exp.location}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Description:{" "}
                                                        </strong>
                                                        {exp.description}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Currently Working:{" "}
                                                        </strong>
                                                        {exp.isWorking
                                                            ? "YES"
                                                            : "NO"}
                                                    </Text>
                                                </Box>
                                            )
                                        )}
                                    </Flex>

                                    <Text
                                        fontSize={"lg"}
                                        fontWeight={"bold"}
                                        mb={2}
                                    >
                                        Achievements
                                    </Text>
                                    <Flex wrap={"wrap"}>
                                        {request.user.achievements.map(
                                            (ach, achIndex) => (
                                                <Box
                                                    key={`achievement-${index}-${achIndex}`}
                                                    mb={4}
                                                    p={4}
                                                    bg={useColorModeValue(
                                                        "gray.100",
                                                        "gray.600"
                                                    )}
                                                    borderRadius={"md"}
                                                >
                                                    <Text>
                                                        <strong>
                                                            Organization:{" "}
                                                        </strong>
                                                        {ach.organization}
                                                    </Text>
                                                    <Text>
                                                        <strong>
                                                            Date Obtained:{" "}
                                                        </strong>
                                                        {formatDate(ach.date)}
                                                    </Text>
                                                    <Button
                                                        as={Link}
                                                        to={ach.url}
                                                        target="_blank"
                                                        colorScheme={"blue"}
                                                        variant={"outline"}
                                                        mt={2}
                                                    >
                                                        Visit Achievement
                                                    </Button>
                                                </Box>
                                            )
                                        )}
                                    </Flex>
                                    {request.linkedinProfile && (
                                        <Button
                                            as={Link}
                                            to={request.linkedinProfile}
                                            target="_blank"
                                            colorScheme={"linkedin"}
                                            leftIcon={<FaLinkedin />}
                                            mt={4}
                                        >
                                            Visit LinkedIn
                                        </Button>
                                    )}

                                    {request.resumeLink && (
                                        <Button
                                            as={Link}
                                            to={request.resumeLink}
                                            target="_blank"
                                            colorScheme={"teal"}
                                            leftIcon={<FaFileDownload />}
                                            mt={4}
                                            ml={2}
                                        >
                                            Check Resume
                                        </Button>
                                    )}
                                </Collapse>
                                {isOpen && <Button w={'full'} mb={3} mt={3} onClick={onToggle}>{isOpen ? "Hide Details":"View Details"}</Button>}
                                <Flex
                                    justifyContent={"space-between"}
                                    mt={6}
                                >

                                    <Button
                                        colorScheme={"red"}
                                        onClick={() =>
                                            handleReject(request._id)
                                        }
                                    >
                                        Reject
                                    </Button>

                                    <Button
                                        colorScheme={"green"}
                                        onClick={()=>{handleAccept(request._id,request.user.name)}}
                                    >
                                        Accept
                                    </Button>
                                </Flex>
                            </Box>
                        ))
                    ) : (
                        <Text>No pending requests.</Text>
                    )}
                </Flex>
            </Flex>
        </>
    );
}

export default AcceptMentorRequests;
