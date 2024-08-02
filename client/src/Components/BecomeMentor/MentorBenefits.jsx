import React from "react";
import { Box, VStack, HStack, Text, Icon, Stack, useBreakpointValue } from "@chakra-ui/react";
import { FiCreditCard, FiVideo } from "react-icons/fi";
import { FaRegFileAlt, FaRegSmile } from "react-icons/fa";

const MentorBenefits = () => {
    const direction = useBreakpointValue({ base: "column", md: "row" });

    return (
        <Box p={5}>
            <VStack spacing={8} align="start">
                <Text fontSize="2xl" fontWeight="bold">
                    Benefits of Being a Mentor!
                </Text>

                <Stack direction={direction} spacing={10} justify="center">
                    <HStack spacing={3}>
                        <Icon as={FiCreditCard} w={8} h={8} />
                        <Text>Earn by taking Sessions with our Peers</Text>
                    </HStack>
                    <HStack spacing={3}>
                        <Icon as={FiVideo} w={8} h={8} />
                        <Text>Give Sessions Anytime from Anywhere</Text>
                    </HStack>
                </Stack>

                <Text fontSize="xl" fontWeight="bold">
                    How to become a Mentor?
                </Text>
                <Text>It’s a two step verification process</Text>

                <Stack direction={{ base: "column", md: "row" }} spacing={8} align="start">
                    <VStack align="start" spacing={3}>
                        <HStack>
                            <Icon as={FaRegFileAlt} w={8} h={8} />
                            <Text fontWeight="bold">Step 1</Text>
                        </HStack>
                        <Text>Complete your profile details.</Text>
                    </VStack>

                    <VStack align="start" spacing={3}>
                        <HStack>
                            <Icon as={FaRegSmile} w={8} h={8} />
                            <Text fontWeight="bold">Step 2</Text>
                        </HStack>
                        <Text>
                            Help us understand your experience and domain by
                            uploading your resume or providing us your LinkedIn
                            profile
                        </Text>
                    </VStack>
                </Stack>
            </VStack>
        </Box>
    );
};

export default MentorBenefits;
