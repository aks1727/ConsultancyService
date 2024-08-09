import React, { useEffect } from "react";
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
    const navigate = useNavigate()
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


    useEffect(()=>{
        console.log(userData)
    },[userData])

    return (
        <Box
            zIndex={9999}
            position="fixed"
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            px={8}
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
                        <IconButton
                            aria-label="Toggle theme"
                            icon={
                                colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )
                            }
                            onClick={toggleColorMode}
                            variant="ghost"
                        />
                        {authStatus ? (
                            <>
                                {userData?.isMentor==='yes' ? (
                                    <Button
                                        as={NavLink}
                                        to={"/chats"}
                                        fontSize={"sm"}
                                        fontWeight={600}
                                        color={"white"}
                                        bg={"cyan.700"}
                                        _hover={{ bg: "cyan.500" }}
                                        display={{
                                            base: "inline-flex",
                                            md: "inline-flex",
                                        }}
                                    >
                                        Chats
                                    </Button>
                                ) : (
                                    <Button
                                        as={NavLink}
                                        to={ userData?.isMentor ==='pending'? "/become-mentor/3" :"/become-mentor/0"}
                                        fontSize={"sm"}
                                        fontWeight={600}
                                        color={"white"}
                                        bg={"cyan.700"}
                                        _hover={{ bg: "cyan.500" }}
                                        display={{
                                            base: "inline-flex",
                                            md: "inline-flex",
                                        }}
                                    >
                                        Become Mentor
                                    </Button>
                                )}
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={"full"}
                                        variant={"link"}
                                        cursor={"pointer"}
                                        minW={0}
                                    >
                                        <Avatar
                                            size={"sm"}
                                            name={userData?.name}
                                            src={userData?.avatar}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            as={NavLink}
                                            to="/profile"
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={logoutHandler}>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    as={NavLink}
                                    to={"/login"}
                                    fontSize={"sm"}
                                    fontWeight={400}
                                    variant={"link"}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    as={NavLink}
                                    to={"/signup"}
                                    display={{
                                        base: "inline-flex",
                                        md: "inline-flex",
                                    }}
                                    fontSize={"sm"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"pink.400"}
                                    _hover={{ bg: "pink.300" }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Stack>
                )}
                {isMobile && (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={"6"}
                        align={"center"}
                    >
                        {authStatus &&
                            (userData.isMentor ? (
                                <Button
                                    as={NavLink}
                                    to={"/chats"}
                                    fontSize={"sm"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"cyan.700"}
                                    _hover={{ bg: "cyan.500" }}
                                    display={{
                                        base: "inline-flex",
                                        md: "inline-flex",
                                    }}
                                >
                                    Chats
                                </Button>
                            ) : (
                                <Button
                                    as={NavLink}
                                    to={"/become-mentor/0"}
                                    fontSize={"sm"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"cyan.700"}
                                    _hover={{ bg: "cyan.500" }}
                                    display={{
                                        base: "inline-flex",
                                        md: "inline-flex",
                                    }}
                                >
                                    Become Mentor
                                </Button>
                            ))}
                        {authStatus && (
                            <Menu>
                                <MenuButton
                                    as={Box}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        name={userData?.name}
                                        src={userData?.avatar}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        as={NavLink}
                                        to="/profile"
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={logoutHandler}>
                                        Logout
                                    </MenuItem>

                                    <MenuItem onClick={toggleColorMode}>
                                        <IconButton
                                            aria-label="Toggle theme"
                                            icon={
                                                colorMode === "light" ? (
                                                    <MoonIcon />
                                                ) : (
                                                    <SunIcon />
                                                )
                                            }
                                            variant="ghost"
                                        />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                        {!authStatus && (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={"https://bit.ly/broken-link"}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        as={NavLink}
                                        to="/login"
                                    >
                                        Login
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem
                                        as={NavLink}
                                        to={"/signup"}
                                    >
                                        <Button
                                            display={{
                                                base: "inline-flex",
                                                md: "inline-flex",
                                            }}
                                            fontSize={"sm"}
                                            fontWeight={600}
                                            color={"white"}
                                            bg={"pink.400"}
                                            _hover={{ bg: "pink.300" }}
                                        >
                                            Sign Up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem onClick={toggleColorMode}>
                                        <IconButton
                                            aria-label="Toggle theme"
                                            icon={
                                                colorMode === "light" ? (
                                                    <MoonIcon />
                                                ) : (
                                                    <SunIcon />
                                                )
                                            }
                                            variant="ghost"
                                        />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                    </Stack>
                )}
            </Flex>

            {/* Mobile Navigation Links */}
            <Collapse
                in={isOpen}
                animateOpacity
            >
                <MobileNav NAV_ITEMS={NAV_ITEMS} />
            </Collapse>
        </Box>
    );
};

const DesktopNav = ({ NAV_ITEMS = [] }) => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "blue.800");

    return (
        <Stack
            direction={"row"}
            spacing={4}
        >
            {NAV_ITEMS.map((navItem) =>
                navItem.href === "#why-name" ||
                navItem.href === "#how-it-works" ? (
                    <Box key={navItem.label}>
                        <Link
                            to={navItem.href ?? "#"}
                            p={2}
                            fontSize={"md"}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: "none",
                                color: linkHoverColor,
                            }}
                            _activeLink={{
                                color: "pink.400",
                            }}
                        >
                            {navItem.label}
                        </Link>
                    </Box>
                ) : (
                    <Box key={navItem.label}>
                        <Link
                            as={NavLink}
                            to={navItem.href ?? "#"}
                            p={2}
                            fontSize={"md"}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: "none",
                                color: linkHoverColor,
                            }}
                            _activeLink={{
                                color: "pink.400",
                            }}
                        >
                            {navItem.label}
                        </Link>
                    </Box>
                )
            )}
        </Stack>
    );
};

const MobileNav = ({ NAV_ITEMS = [] }) => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            py={8}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    {...navItem}
                />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href }) => {
    return (
        <Stack spacing={4}>
            <Flex
                py={2}
                as={NavLink}
                to={href ?? "#"}
                justify={"center"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                    color: "blue",
                }}
                _activeLink={{
                    color: "pink.400",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                    textAlign="center"
                >
                    {label}
                </Text>
            </Flex>
        </Stack>
    );
};

export default Navbar;
