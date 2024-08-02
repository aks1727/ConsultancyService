import React, { useEffect, useState } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    Image,
    Link,
    List,
    ListItem,
    ListIcon,
} from "@chakra-ui/react";
import { FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { disableNext, enableNext } from "../../store/disableSlice";
import { NavLink } from "react-router-dom";
import conf from "../../conf/conf";
import { updateAchivement, updateEducation, updateExperience } from "../../store/authSlice";

const MentorUpdateDetails = () => {
    const userData = useSelector(state => state.auth.userData);
    const stateDetails = useSelector(state => state)
    const [isEducation, setIsEducation] = useState(false);
    const [isExperience, setIsExperience] = useState(false);
    const [isAchievements, setIsAchievements] = useState(false);
    const [isSkills, setIsSkills] = useState(false);
    const [isBio, setIsBio] = useState(false);
    const dispatch = useDispatch();

    const fetchDetails = async () => {
        try {
            let response = await fetch(`${conf.backendUser}/getEducationDetails`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = await response.json();
            if (data.success) {
                dispatch(updateEducation(data.data));
                setIsEducation(true);
            } else {
                console.log("Failed to fetch user data");
            }

            response = await fetch(`${conf.backendUser}/getExperienceDetails`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data = await response.json();
            if (data.success) {
                dispatch(updateExperience(data.data));
                setIsExperience(true);
            } else {
                console.log("Failed to fetch user experience data");
            }

            response = await fetch(`${conf.backendUser}/getAchievementsDetails`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data = await response.json();
            if (data.success) {
                dispatch(updateAchivement(data.data));
                setIsAchievements(true);
            } else {
                console.log("Failed to fetch user achievements data");
            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        setIsEducation(stateDetails.education && stateDetails.education.length > 0);
        setIsExperience(stateDetails.experience && stateDetails.experience.length > 0);
        setIsAchievements(stateDetails.achievements && stateDetails.achievements.length > 0);
        setIsSkills(userData.skills && userData.skills.length > 0);
        setIsBio(userData.bio);
    }, [userData]);

    useEffect(() => {
        if (isEducation && (isExperience || isAchievements) && isSkills && isBio) {
            dispatch(enableNext());
        } else {
            dispatch(disableNext());
        }
    }, [isEducation, isExperience, isAchievements, isSkills, isBio, dispatch]);

    return (
        <Box p={5} maxW="600px" mx="auto" textAlign="center">
            <VStack spacing={4} align="start">
                <Text fontSize="2xl" fontWeight="bold">Welcome!</Text>
                <Text>Filing your profile for a ProPeer verification should not take more than 5-10 minutes. As a part of the process, we will ask you to fill some necessary details.</Text>
                <Text fontWeight="bold">You will need to:</Text>
                <List spacing={3} textAlign="left">
                    <ListItem>
                        <ListIcon as={FiCheckSquare} color={isEducation ? "green.500" : "gray.500"} />
                        Add your educational details.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FiCheckSquare} color={(isExperience || isAchievements) ? "green.500" : "gray.500"} />
                        Add any 1 of your achievements or experience.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FiCheckSquare} color={isSkills ? "green.500" : "gray.500"} />
                        Add at least 1 skill
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FiCheckSquare} color={isBio ? "green.500" : "gray.500"} />
                        Add your bio.
                    </ListItem>
                </List>
                <HStack justifyContent="center" spacing={4} pt={4}>
                    <Image boxSize="100px" src="https://example.com/image1.png" alt="Illustration 1" />
                    <Image boxSize="100px" src="https://example.com/image2.png" alt="Illustration 2" />
                </HStack>
                <Text>Make sure you have filled the basic details while signing up such as LinkedIn profile, etc. <Link as={NavLink} color="blue.500" to={'/update-details/'}>Click Here</Link> to complete it if not yet done.</Text>
            </VStack>
        </Box>
    );
};

export default MentorUpdateDetails;
