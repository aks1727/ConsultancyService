import React from "react";
import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";

function Feed() {
    return (
        <>
                {/* Main Content */}
                
                <VStack spacing="4">
                    {[...Array(20)].map((_, i) => (
                        <Box
                            key={i}
                            bg={useColorModeValue('gray.200','gray.800')}
                            p="4"
                            borderRadius="md"
                            w="100%"
                            color={useColorModeValue('black','white')}
                        >
                            <Text>Scrollable Content {i + 1}</Text>
                        </Box>
                    ))}
                </VStack>
        </>
    );
}

export default Feed;
