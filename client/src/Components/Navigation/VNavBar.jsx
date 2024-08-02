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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaUserFriends, FaStream, FaEllipsisH } from "react-icons/fa";

// Default Navigation Items
const DEFAULT_NAV_ITEMS = [
    {
        label: "Feed",
        href: "/feed",
        icon: FaHome,
    },
    {
        label: "Search",
        href: "/search",
        icon: FaSearch,
    },
    {
        label: "Mentorship",
        href: "/mentorship",
        icon: FaUserFriends,
    },
    {
        label: "Roadmaps",
        href: "/roadmaps",
        icon: FaStream,
    },
];

// Navbar component
const VNavbar = ({ navItems = DEFAULT_NAV_ITEMS }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    if (navItems.length === 0) {
        navItems = DEFAULT_NAV_ITEMS;
    }
    const primaryNavItems = navItems.length > 4 ? navItems.slice(0, 3) : navItems;
    const additionalNavItems = navItems.length > 4 ? navItems.slice(3) : [];

    return (
        <Box>
            {/* Main Navbar container */}
            <Flex
                direction={{ base: "row", md: "column" }}
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={{ base: "50px", md: "100vh" }} // Reduced height
                py={{ base: 1, md: 2 }} // Reduced padding
                px={{ base: 2, md: 4 }} // Reduced padding
                borderRight={{ md: "1px" }}
                borderTop={{ base: "1px", md: "none" }}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                position={{ base: "fixed", md: "fixed" }}
                w={{ base: "100%", md: "240px" }} // Increased width
                bottom={{ base: 0, md: "auto" }}
                top={{ base: "auto", md: 0 }}
                alignItems={"center"}
                justifyContent={"center"}
                pt={6} // Reduced padding-top
            >
                {/* Mobile Bottom Navigation */}
                {isMobile && (
                    <HStack
                        spacing={2} // Reduced spacing
                        bg={useColorModeValue("white", "gray.800")}
                        borderTopWidth={1}
                        borderColor={useColorModeValue("gray.200", "gray.900")}
                        position="fixed"
                        bottom={0}
                        w="100%"
                        justifyContent="space-around"
                        py={1} // Reduced padding
                    >
                        {primaryNavItems.map((navItem) => (
                            <NavItem key={navItem.label} to={navItem.href} icon={navItem.icon} label={navItem.label} />
                        ))}
                        {additionalNavItems.length > 0 && (
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="ghost" p={0} height="auto">
                                        <Icon as={FaEllipsisH} boxSize={5} />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent width="auto" minWidth="max-content" maxWidth="80vw"> {/* Adjusted width properties */}
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
                        mt={20} // Increased top margin for desktop view
                    >
                        <VStack
                            display={{ base: "none", md: "flex" }}
                            mt={6}
                            spacing={4}
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
    const linkHoverColor = useColorModeValue("gray.800", "blue.800");

    return (
        <>
            {navItems.map((navItem) => (
                <Box key={navItem.label} mt={3}> {/* Reduced margin-top */}
                    <Link
                        as={NavLink}
                        to={navItem.href ?? "#"}
                        p={1} // Reduced padding
                        fontSize={"sm"} // Smaller font size
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: "none",
                            color: linkHoverColor,
                        }}
                        _activeLink={{
                            color: "pink.400", // Active link style
                        }}
                    >
                        <Icon as={navItem.icon} mr={1} boxSize={5} /> {/* Reduced icon size */}
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
    const linkHoverColor = useColorModeValue("gray.800", "blue.800");

    return (
        <Link
            as={NavLink}
            to={to}
            p={1} // Reduced padding
            fontSize={"sm"} // Smaller font size
            color={linkColor}
            _hover={{
                textDecoration: "none",
                color: linkHoverColor,
            }}
            _activeLink={{
                color: "pink.400", // Active link style
            }}
            textAlign="center"
        >
            <Icon as={icon} boxSize={5} /> {/* Reduced icon size */}
            <Box mt={1} fontSize="xs">
                {label} {/* Smaller font size for label */}
            </Box>
        </Link>
    );
};

export default VNavbar;
