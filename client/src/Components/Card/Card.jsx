import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";

function Card({ ConsultancyType = "", Description = "", cardBg, cardTextColor }) {
    return (
        <Box
            bg={cardBg}
            p={4}
            borderRadius="md"
            transform="scale(1)"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
        >
            <VStack>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={cardTextColor}
                >
                    {ConsultancyType}
                </Text>
                <Text color={cardTextColor}>
                    {Description}
                </Text>
            </VStack>
        </Box>
    );
}

export default Card;
