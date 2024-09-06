import React from "react";
import {
    Box,
    Flex,
    HStack,
    Icon,
    Link,
    useColorModeValue,
    useBreakpointValue,
    VStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Button,
    Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaUserFriends, FaStream, FaEllipsisH } from "react-icons/fa";

// Default Navigation Items
const DEFAULT_NAV_ITEMS = [
    {
        label: "Home",
        href: "/",
        icon: FaHome,
    },
    {
        label: "Search",
        href: "/search",
        icon: FaSearch,
    },
];

// Navbar component
const VNavbar = ({ navItems = DEFAULT_NAV_ITEMS }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    if (navItems.length === 0) {
        navItems = DEFAULT_NAV_ITEMS;
    }
    const primaryNavItems = (navItems.length > 4 ? navItems.slice(0, 3) : navItems) || [];
    const additionalNavItems = (navItems.length > 4 ? navItems.slice(3) : []) || [];

    return (
        <Box>
            {/* Main Navbar container */}
            <Flex
                direction={{ base: "row", md: "column" }}
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={{ base: "50px", md: "100vh" }}
                py={{ base: 2, md: 4 }}
                px={{ base: 3, md: 5 }}
                borderRight={{ md: "1px" }}
                borderTop={{ base: "1px", md: "none" }}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                position={{ base: "fixed", md: "fixed" }}
                w={{ base: "100%", md: "240px" }}
                bottom={{ base: 0, md: "auto" }}
                top={{ base: "auto", md: 0 }}
                alignItems={"center"}
                justifyContent={"center"}
                boxShadow={useColorModeValue("lg", "2xl")} // Added subtle shadow
                rounded={{ base: "none", md: "lg" }} // Rounded for desktop
                bgGradient={useColorModeValue("linear(to-r, blue.50, purple.50)", "linear(to-r, gray.700, gray.900)")} // Gradient background
            >
                {/* Mobile Bottom Navigation */}
                {isMobile && (
                    <HStack
                        spacing={4}
                        bg={useColorModeValue("white", "gray.800")}
                        borderTopWidth={1}
                        borderColor={useColorModeValue("gray.200", "gray.900")}
                        position="fixed"
                        bottom={0}
                        w="100%"
                        justifyContent="space-around"
                        py={2}
                    >
                        {primaryNavItems?.map((navItem) => (
                            <NavItem key={navItem.label} to={navItem.href} icon={navItem.icon} label={navItem.label} />
                        ))}
                        {additionalNavItems.length > 0 && (
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="ghost" p={0} height="auto">
                                        <Icon as={FaEllipsisH} boxSize={6} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent width="auto" minWidth="max-content" maxWidth="80vw">
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <VStack alignItems="start">
                                            {additionalNavItems.map((navItem) => (
                                                <NavItem key={navItem.label} to={navItem.href} icon={navItem.icon} label={navItem.label} />
                                            ))}
                                        </VStack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        )}
                    </HStack>
                )}

                {/* Desktop Navigation */}
                {!isMobile && (
                    <Flex
                        flex={{ base: 1 }}
                        justify={{ base: "center", md: "start" }}
                        direction={{ base: "row", md: "column" }}
                        mt={20}
                    >
                        <VStack
                            display={{ base: "none", md: "flex" }}
                            spacing={6}
                            alignItems="flex-start"
                        >
                            <DesktopNav navItems={navItems} />
                        </VStack>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

// Desktop Navigation Component
const DesktopNav = ({ navItems }) => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("blue.500", "blue.300");

    return (
        <>
            {navItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Link
                        as={NavLink}
                        to={navItem.href ?? "#"}
                        display="flex"
                        alignItems="center"
                        p={2}
                        fontSize={"md"}
                        fontWeight={600}
                        color={linkColor}
                        borderRadius="md"
                        _hover={{
                            textDecoration: "none",
                            bg: useColorModeValue("gray.100", "gray.700"),
                            color: linkHoverColor,
                            boxShadow: "lg",
                        }}
                        _activeLink={{
                            bg: useColorModeValue("pink.100", "gray.600"),
                            color: "pink.400",
                            borderLeft: "4px solid",
                            borderColor: "pink.400",
                        }}
                        transition="background-color 0.2s ease, color 0.2s ease"
                    >
                        <Icon as={navItem.icon} mr={3} boxSize={6} />
                        {navItem.label}
                    </Link>
                </Box>
            ))}
        </>
    );
};

// Navigation Item for Bottom Navigation
const NavItem = ({ to, icon, label }) => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("blue.500", "blue.300");

    return (
        <Link
            as={NavLink}
            to={to}
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
                textDecoration: "none",
                color: linkHoverColor,
            }}
            _activeLink={{
                color: "pink.400",
            }}
            textAlign="center"
        >
            <Icon as={icon} boxSize={6} />
            <Text fontSize="xs" mt={1}>
                {label}
            </Text>
        </Link>
    );
};

export default VNavbar;
