// AdminNavbar.js
import React from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaUserEdit, FaTools, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminNavbar = ({ navItems=[] }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // console.log(navItems, typeof navItems)
    return (
        <Box>
            {/* Mobile View */}
            <Box display={{ base: "block", md: "none" }}>
                <IconButton
                    icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    onClick={onOpen}
                    m={4}
                />
                <Drawer
                    placement="left"
                    onClose={onClose}
                    isOpen={isOpen}
                >
                    <DrawerOverlay>
                        <DrawerContent bg="black">
                            <DrawerCloseButton />
                            <DrawerHeader color="white">
                                Admin Menu
                            </DrawerHeader>
                            <DrawerBody>
                                <Flex
                                    direction="column"
                                    color="white"
                                >
                                    {navItems.map((item) => (
                                        <Link
                                            to={item.href}
                                            key={item.label}
                                        >
                                            <Flex
                                                align="center"
                                                py={2}
                                                cursor="pointer"
                                            >
                                                <item.icon
                                                    style={{
                                                        marginRight: "8px",
                                                    }}
                                                />
                                                <Text fontSize={'1xl'}>{item.label}</Text>
                                            </Flex>
                                        </Link>
                                    ))}
                                </Flex>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            </Box>

            {/* Desktop View */}
            <Box
                display={{ base: "none", md: "block" }}
                bg="black"
                w="20vw"
                h="100vh"
                color="white"
                p={4}
            >
                <Flex direction="column">
                    {navItems.map((item) => (
                        <Link
                            to={item.href}
                            key={item.label}
                        >
                            <Flex
                                align="center"
                                py={2}
                                cursor="pointer"
                            >
                                <item.icon style={{ marginRight: "8px" }} />
                                <Text fontSize={'1xl'}>{item.label}</Text>
                            </Flex>
                        </Link>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
};

export default AdminNavbar;
