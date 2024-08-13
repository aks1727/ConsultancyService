import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Divider,
    HStack,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black.800", "white")}
            w="100%"
            // overflowX="hidden" // Ensure no horizontal overflow
            px={0} // Adjust padding
        >
            <Container
                as={Stack}
                maxW="100%" // Ensure the container doesn't exceed the screen width
                py={8}
                px={4}
            >
                <HStack
                    justify="space-between"
                    w="100%"
                >
                    <Text fontSize="sm">
                        © {new Date().getFullYear()} Your Consultancy Name. All
                        rights reserved.
                    </Text>
                    <Stack
                        direction="row"
                        spacing={4}
                    >
                        <Link
                            href="/privacy-policy"
                            fontSize="sm"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            fontSize="sm"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/contact"
                            fontSize="sm"
                        >
                            Contact Us
                        </Link>
                    </Stack>
                </HStack>
                <Divider
                    my={4}
                    borderColor="gray.600"
                />
                <Stack
                    direction="row"
                    justify="center"
                    spacing={6}
                >
                    <IconButton
                        as={Link}
                        href="https://twitter.com"
                        aria-label="Twitter"
                        icon={<FaTwitter />}
                        variant="ghost"
                        color={useColorModeValue("black", "gray.200")}
                        _hover={{ color: "blue.400" }}
                    />
                    <IconButton
                        as={Link}
                        href="https://linkedin.com"
                        aria-label="LinkedIn"
                        icon={<FaLinkedin />}
                        variant="ghost"
                        color={useColorModeValue("black", "gray.200")}
                        _hover={{ color: "blue.400" }}
                    />
                    <IconButton
                        as={Link}
                        href="https://facebook.com"
                        aria-label="Facebook"
                        icon={<FaFacebook />}
                        variant="ghost"
                        color={useColorModeValue("black", "gray.200")}
                        _hover={{ color: "blue.400" }}
                    />
                    <IconButton
                        as={Link}
                        href="https://instagram.com"
                        aria-label="Instagram"
                        icon={<FaInstagram />}
                        variant="ghost"
                        color={useColorModeValue("black", "gray.200")}
                        _hover={{ color: "blue.400" }}
                    />
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
