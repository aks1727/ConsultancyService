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
    SimpleGrid,
    VStack,
    Input,
    Button,
    Image,
    Heading,
} from "@chakra-ui/react";
import {
    FaTwitter,
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Importing framer-motion for animations

const MotionBox = motion(Box); // Creating motion components
const MotionIconButton = motion(IconButton);

const Footer = ({bgHeader}) => {
    const linkColor = useColorModeValue("gray.600", "gray.300");
    const hoverColor = useColorModeValue("blue.400", "blue.200");

    return (
        <MotionBox
            bgGradient={useColorModeValue(
                "linear(to-r, white, white)",
                "linear(to-r, blue.900, teal.800)"
            )}
            color={useColorModeValue("black.800", "white")}
            w="100%"
            px={4}
            py={12}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Box
                px={4}
            >
                {/* Decorative Logo Section */}
                <VStack
                    align="center"
                    mb={6}
                >
                    {/* <Image
                        src="/path/to/your/logo.png"
                        alt="Company Logo"
                        boxSize="80px"
                        mb={2}
                    /> */}
                    <Text>LOGO</Text>
                    <Heading
                        as="h3"
                        size="lg"
                    >
                        Your Consultancy Name
                    </Heading>
                    <Text
                        fontSize="md"
                        textAlign="center"
                        maxW="600px"
                        color={linkColor}
                    >
                        Helping you achieve your career goals with professional
                        guidance and support.
                    </Text>
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, md: 3, lg: 4 }}
                    spacing={{ base: 8, md: 10 }}
                    mb={8}
                >
                    {/* About Us Section */}
                    <VStack
                        align="start"
                        spacing={4}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            About Us
                        </Text>
                        <Text
                            fontSize="sm"
                            color={linkColor}
                        >
                            We are a leading consultancy firm specializing in
                            providing top-tier services to help you achieve your
                            professional goals.
                        </Text>
                        <Link
                            href="/about"
                            fontSize="sm"
                            color={hoverColor}
                            _hover={{ textDecoration: "underline" }}
                        >
                            Learn More
                        </Link>
                    </VStack>

                    {/* Services Section */}
                    <VStack
                        align="start"
                        spacing={4}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            Services
                        </Text>
                        <Link
                            href="/service1"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Career Coaching
                        </Link>
                        <Link
                            href="/service2"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Resume Building
                        </Link>
                        <Link
                            href="/service3"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Leadership Training
                        </Link>
                    </VStack>

                    {/* Quick Links Section */}
                    <VStack
                        align="start"
                        spacing={4}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            Quick Links
                        </Text>
                        <Link
                            href="/privacy-policy"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/contact"
                            fontSize="sm"
                            color={linkColor}
                            _hover={{ color: hoverColor }}
                        >
                            Contact Us
                        </Link>
                    </VStack>

                    {/* Newsletter Subscription Section */}
                    <VStack
                        align="start"
                        spacing={4}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            Stay Updated
                        </Text>
                        <Text
                            fontSize="sm"
                            color={linkColor}
                        >
                            Subscribe to our newsletter to receive the latest
                            updates and offers.
                        </Text>
                        <HStack>
                            <Input
                                p={5}
                                placeholder="Enter your email"
                                size="sm"
                                bg={useColorModeValue("white", "gray.700")}
                                borderRadius="md"
                            />
                            <Button
                                colorScheme="blue"
                                size="sm"
                                p={5}
                                leftIcon={<FaEnvelope />}
                            >
                                Subscribe
                            </Button>
                        </HStack>
                    </VStack>
                </SimpleGrid>

                {/* Divider */}
                <Divider
                    my={6}
                    borderColor="gray.600"
                />

                {/* Social Media Section */}
                <Stack
                    direction="row"
                    justify="center"
                    spacing={6}
                    mb={6}
                >
                    {[
                        {
                            icon: FaTwitter,
                            label: "Twitter",
                            href: "https://twitter.com",
                        },
                        {
                            icon: FaLinkedin,
                            label: "LinkedIn",
                            href: "https://linkedin.com",
                        },
                        {
                            icon: FaFacebook,
                            label: "Facebook",
                            href: "https://facebook.com",
                        },
                        {
                            icon: FaInstagram,
                            label: "Instagram",
                            href: "https://instagram.com",
                        },
                    ].map((social, index) => (
                        <MotionIconButton
                            key={index}
                            as={Link}
                            href={social.href}
                            aria-label={social.label}
                            icon={<social.icon />}
                            variant="ghost"
                            color={useColorModeValue("black", "gray.200")}
                            whileHover={{ scale: 1.2, color: hoverColor }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </Stack>

                {/* Footer Bottom */}
                <Text
                    fontSize="sm"
                    textAlign="center"
                    mt={6}
                >
                    © {new Date().getFullYear()} Your Consultancy Name. All
                    rights reserved.
                </Text>
            </Box>
        </MotionBox>
    );
};

export default Footer;
