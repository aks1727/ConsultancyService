import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit2, FiUserPlus } from "react-icons/fi";
import {
    FaBriefcase,
    FaGraduationCap,
    FaTrophy,
    FaPenAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/conf";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utility/basicDates.js";
import { Link } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [sameUser, setsameUser] = useState(true);
    const userId = useSelector((state) => state.auth.userData?._id);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await fetch(
                `${conf.backendUser}/getUserByUsername/${username}`
            );
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data = await res.json();
            if (data.data._id !== userId) {
                setsameUser(false);
            }
            setUserDetails(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
        console.log(userDetails);
    }, [username]);

    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("black", "white");
    const cardBg = useColorModeValue("gray.200", "gray.700");

    return (
        <Box
            maxW="full"
            mx="auto"
            p={4}
            bg={bg}
            color={color}
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                py={4}
            >
                <Avatar
                    size="xl"
                    src={userDetails?.avatar}
                    name={userDetails?.name}
                    bg="purple.500"
                />
                <VStack
                    align="start"
                    spacing={1}
                    mt={{ base: 4, md: 0 }}
                    ml={{ md: 4 }}
                >
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        {userDetails?.name}
                    </Text>
                    <Text>@{userDetails?.username}</Text>
                    <Text>{userDetails?.bio}</Text>
                    <HStack>
                        <Text>No Followers</Text>
                        <Text>No Following</Text>
                    </HStack>
                </VStack>
                {sameUser && (
                    <HStack
                        mt={{ base: 4, md: 0 }}
                        ml={{ md: "auto" }}
                    >
                        <Button
                            leftIcon={<FiEdit2 />}
                            colorScheme="blue"
                            onClick={() => {
                                navigate("/update-details");
                            }}
                        >
                            Edit
                        </Button>
                        {userDetails?.isMentor !== "yes" && (
                            <Button
                                leftIcon={<FiUserPlus />}
                                colorScheme="yellow"
                            >
                                Become a Mentor
                            </Button>
                        )}
                    </HStack>
                )}
            </Flex>

            <Tabs
                variant="enclosed"
                colorScheme="blue"
            >
                <TabList
                    overflowX="auto"
                    whiteSpace="nowrap"
                >
                    <Tab>
                        <Icon
                            as={FaBriefcase}
                            mr={2}
                        />
                        Experiences
                    </Tab>
                    <Tab>
                        <Icon
                            as={FaGraduationCap}
                            mr={2}
                        />
                        Education
                    </Tab>
                    <Tab>
                        <Icon
                            as={FaTrophy}
                            mr={2}
                        />
                        Achievements
                    </Tab>
                    <Tab>
                        <Icon
                            as={FaPenAlt}
                            mr={2}
                        />
                        Posts
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <VStack spacing={4}>
                            {userDetails?.experiences?.length === 0 ? (
                                <Box
                                    bg={cardBg}
                                    p={4}
                                    borderRadius="md"
                                    w="full"
                                    textAlign="center"
                                >
                                    <Icon
                                        as={FaBriefcase}
                                        boxSize={10}
                                        mb={2}
                                    />
                                    <Text>
                                        Let your experience shine! Fill in your
                                        experience to highlight your
                                        professional journey.
                                    </Text>
                                </Box>
                            ) : (
                                <VStack
                                    spacing={4}
                                    w="full"
                                >
                                    {userDetails?.experiences?.map((exp) => (
                                        <Box
                                            key={exp._id}
                                            mb={4}
                                            p={4}
                                            bg={cardBg}
                                            borderRadius="md"
                                            w="full"
                                        >
                                            <Text>
                                                <strong>Position: </strong>
                                                {exp.title}
                                            </Text>
                                            <Text>
                                                <strong>Company: </strong>
                                                {exp.company}
                                            </Text>
                                            <Text>
                                                <strong>Duration: </strong>
                                                {exp.duration}
                                            </Text>
                                            <Text>
                                                <strong>Location: </strong>
                                                {exp.location}
                                            </Text>
                                            <Text>
                                                <strong>Description: </strong>
                                                {exp.description}
                                            </Text>
                                            <Text>
                                                <strong>
                                                    Currently Working:{" "}
                                                </strong>
                                                {exp.isWorking ? "YES" : "NO"}
                                            </Text>
                                        </Box>
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack spacing={4}>
                            {userDetails?.educations?.length === 0 ? (
                                <Box
                                    bg={cardBg}
                                    p={4}
                                    borderRadius="md"
                                    w="full"
                                    textAlign="center"
                                >
                                    <Icon
                                        as={FaGraduationCap}
                                        boxSize={10}
                                        mb={2}
                                    />
                                    <Text>
                                        Let your education shine! Fill in your
                                        educational background to highlight your
                                        academic achievements.
                                    </Text>
                                </Box>
                            ) : (
                                <VStack
                                    spacing={4}
                                    w="full"
                                >
                                    {userDetails?.educations?.map((edu) => (
                                        <Box
                                            key={edu._id}
                                            m={4}
                                            p={4}
                                            minW={{ base: "full", md: 40 }}
                                            bg={cardBg}
                                            borderRadius="md"
                                            w="full"
                                        >
                                            <Text>
                                                <strong>College Name: </strong>
                                                {edu.collegeName}
                                            </Text>
                                            <Text>
                                                <strong>Degree: </strong>
                                                {edu.degree}
                                            </Text>
                                            <Text>
                                                <strong>Joined: </strong>
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
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack spacing={4}>
                            {userDetails?.achievments?.length === 0 ? (
                                <Box
                                    bg={cardBg}
                                    p={4}
                                    borderRadius="md"
                                    w="full"
                                    textAlign="center"
                                >
                                    <Icon
                                        as={FaTrophy}
                                        boxSize={10}
                                        mb={2}
                                    />
                                    <Text>
                                        Add your accomplishments or
                                        certifications to showcase your unique
                                        skills and make your profile unique.
                                    </Text>
                                </Box>
                            ) : (
                                <VStack
                                    spacing={4}
                                    w="full"
                                >
                                    {userDetails?.achievements?.map((ach) => (
                                        <Box
                                            key={ach._id}
                                            mb={4}
                                            p={4}
                                            bg={cardBg}
                                            borderRadius="md"
                                            w="full"
                                        >
                                            <Text>
                                                <strong>Organization: </strong>
                                                {ach.organization}
                                            </Text>
                                            <Text>
                                                <strong>Date Obtained: </strong>
                                                {formatDate(ach.date)}
                                            </Text>
                                            <Button
                                                as={Link}
                                                to={ach.url}
                                                target="_blank"
                                                colorScheme="blue"
                                                variant="outline"
                                                mt={2}
                                            >
                                                Visit Achievement
                                            </Button>
                                        </Box>
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <VStack spacing={4}>
                            <Box
                                bg={cardBg}
                                p={4}
                                borderRadius="md"
                                w="full"
                                textAlign="center"
                            >
                                <Icon
                                    as={FaPenAlt}
                                    boxSize={10}
                                    mb={2}
                                />
                                <Text>
                                    No Posts Created! Create a new post to show
                                    them in your profile and make your profile
                                    beautiful and exciting.
                                </Text>
                            </Box>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Profile;
