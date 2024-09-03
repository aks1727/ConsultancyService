import React from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuDivider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { logout } from "../../store/authSlice.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import conf from "../../conf/conf.js";

const Navbar = ({ NAV_ITEMS = [] }) => {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const authStatus = useSelector((state) => state.auth.status);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await fetch(`${conf.backendUser}/logout`, {
                method: "POST",
                credentials: "include",
            });
            dispatch(logout());
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Box
            zIndex={9999}
            position="fixed"
            w="100%"
            bg={useColorModeValue(
                "linear-gradient(45deg, #f3f4f6, #e2e8f0)",
                "linear-gradient(45deg, #2d3748, #1a202c)"
            )}
            px={8}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            transition="background-color 0.3s ease, box-shadow 0.3s ease"
        >
            <Flex
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                w="100%"
                justify="space-between"
                transition="padding 0.3s ease"
            >
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: "start", md: "start" }}
                    align="center"
                >
                    {/* Toggle Button for Mobile View */}
                    {NAV_ITEMS.length > 0 && (
                        <Flex
                            display={{ base: "flex", md: "none" }}
                            align="center"
                        >
                            <IconButton
                                onClick={onToggle}
                                icon={
                                    <HamburgerIcon
                                        w={5}
                                        h={5}
                                    />
                                }
                                variant={"ghost"}
                                aria-label={"Toggle Navigation"}
                                transition="transform 0.3s ease"
                                _hover={{ transform: "scale(1.1)" }}
                            />
                        </Flex>
                    )}

                    {/* Logo */}
                    <Text
                        textAlign={useBreakpointValue({
                            base: "left",
                            md: "left",
                        })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                        fontSize="xl"
                        fontWeight="bold"
                        letterSpacing="wide"
                    >
                        <NavLink to="/">Logo</NavLink>
                    </Text>

                    {/* Navigation Links for Desktop View */}
                    <Flex
                        display={{ base: "none", md: "flex" }}
                        ml={10}
                    >
                        <DesktopNav NAV_ITEMS={NAV_ITEMS} />
                    </Flex>
                </Flex>

                {/* Theme Toggle Button and Auth Buttons */}
                {!isMobile && (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                        align="center"
                    >
                        <ThemeToggle
                            colorMode={colorMode}
                            toggleColorMode={toggleColorMode}
                        />
                        <AuthButtons
                            authStatus={authStatus}
                            userData={userData}
                            logoutHandler={logoutHandler}
                        />
                    </Stack>
                )}
                {isMobile && (
                    <Popover
                        placement="bottom-end"
                        isLazy
                    >
                        <PopoverTrigger>
                            <IconButton
                                icon={
                                    <Avatar
                                        size={"sm"}
                                        name={userData?.name}
                                        src={userData?.avatar}
                                    />
                                }
                                variant="ghost"
                                aria-label="Options"
                                _hover={{
                                    bg: useColorModeValue(
                                        "gray.100",
                                        "gray.700"
                                    ),
                                }}
                                transition="background-color 0.3s ease"
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            border="1px"
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                            boxShadow="lg"
                            borderRadius="lg"
                            bg={useColorModeValue(
                                "linear-gradient(135deg, #f0f4f8, #e2e8f0)",
                                "linear-gradient(135deg, #2D3748, #1A202C)"
                            )}
                            p={4}
                            transition="transform 0.3s ease, opacity 0.3s ease"
                            _hover={{
                                transform: "scale(1.05)",
                                opacity: 1,
                            }}
                        >
                            <PopoverArrow />
                            <PopoverCloseButton
                                _focus={{ boxShadow: "none" }}
                            />
                            <PopoverBody>
                                <Stack
                                    spacing={4}
                                    align="center"
                                    p={2}
                                    bg={useColorModeValue("white", "gray.800")}
                                    borderRadius="md"
                                    boxShadow="md"
                                    width="full"
                                >
                                    {/* Authentication Buttons */}
                                    <AuthButtons
                                        authStatus={authStatus}
                                        userData={userData}
                                        logoutHandler={logoutHandler}
                                        isMobile
                                    />
                                    {/* Theme Toggle */}
                                    <ThemeToggle
                                        colorMode={colorMode}
                                        toggleColorMode={toggleColorMode}
                                    />
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
            >
                <MobileNav NAV_ITEMS={NAV_ITEMS} />
            </Collapse>
        </Box>
    );
};

const DesktopNav = ({ NAV_ITEMS }) => (
    <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
            <DesktopNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
);

const DesktopNavItem = ({ label, href }) => (
    <Box>
        <Link
            p={2}
            href={href}
            fontSize={"sm"}
            fontWeight={500}
            color={useColorModeValue("gray.600", "white")}
            _hover={{
                textDecoration: "none",
                color: useColorModeValue("gray.800", "gray.200"),
            }}
            transition="color 0.3s ease"
        >
            {label}
        </Link>
    </Box>
);

const MobileNav = ({ NAV_ITEMS }) => (
    <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
        spacing={4}
    >
        {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
);

const MobileNavItem = ({ label, href }) => (
    <Stack spacing={4}>
        <Link
            href={href}
            fontSize={"sm"}
            fontWeight={500}
            color={useColorModeValue("gray.600", "white")}
            _hover={{
                textDecoration: "none",
                color:useColorModeValue("gray.800", "gray.200"),
            }}
            transition="color 0.3s ease"
        >
            {label}
        </Link>
    </Stack>
);

const ThemeToggle = ({ colorMode, toggleColorMode }) => (
    <IconButton
        aria-label="Toggle theme"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="outline"
        borderWidth={2}
        borderColor={useColorModeValue("gray.600", "gray.200")}
        transition="background-color 0.3s ease, transform 0.3s ease"
        _hover={{ transform: "scale(1.1)" }}
    />
);

const AuthButtons = ({ authStatus, userData, logoutHandler, isMobile = false }) => (
    authStatus ? (
        <>
            {userData?.isMentor === "yes" ? (
                <Button
                    as={NavLink}
                    to="/chatsd1f5702df5792711e9e30911c9489236"
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"cyan.700"}
                    _hover={{ bg: "cyan.500" }}
                    display={{ base: "inline-flex", md: "inline-flex" }}
                    transition="background-color 0.3s ease"
                >
                    Chats
                </Button>
            ) : (
                <Button
                    as={NavLink}
                    to={userData?.isMentor === "pending" ? "/become-mentor/3" : "/become-mentor/0"}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"cyan.700"}
                    _hover={{ bg: "cyan.500" }}
                    display={{ base: "inline-flex", md: "inline-flex" }}
                    transition="background-color 0.3s ease"
                >
                    Become Mentor
                </Button>
            )}
            {isMobile ? null : (
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                        transition="transform 0.3s ease"
                        _hover={{ transform: "scale(1.05)" }}
                    >
                        <Avatar
                            size={"sm"}
                            name={userData?.name}
                            src={userData?.avatar}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>{userData.name}</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            )}
        </>
    ) : (
        <>
            <Button
                as={NavLink}
                to="/login"
                fontSize={"sm"}
                fontWeight={400}
                variant={"outline"}
                borderWidth={2}
                borderColor={useColorModeValue("gray.600", "gray.200")}
                _hover={{ borderColor: "cyan.500" }}
                display={{ base: "inline-flex", md: "inline-flex" }}
                transition="border-color 0.3s ease"
            >
                Sign In
            </Button>
            <Button
                as={NavLink}
                to="/register"
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"cyan.700"}
                _hover={{ bg: "cyan.500" }}
                display={{ base: "inline-flex", md: "inline-flex" }}
                transition="background-color 0.3s ease"
            >
                Sign Up
            </Button>
        </>
    )
);

export default Navbar;
