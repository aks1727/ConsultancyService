import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Card({
    ConsultancyType = "",
    Description = "",
    cardBg,
    cardTextColor,
}) {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCardClick = () => {
        navigate(`/search?category=${ConsultancyType}`); // Navigate to search with category as a query parameter
    };

    return (
        <Box
            bg={cardBg}
            p={4}
            borderRadius="md"
            transform="scale(1)"
            _hover={{ transform: "scale(1.05)", cursor: "pointer" }}
            transition="transform 0.2s"
            onClick={handleCardClick} // Add click handler
        >
            <VStack>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={cardTextColor}
                >
                    {ConsultancyType}
                </Text>
                <Text color={cardTextColor}>{Description}</Text>
            </VStack>
        </Box>
    );
}

export default Card;
