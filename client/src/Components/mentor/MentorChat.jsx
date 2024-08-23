import React, { useEffect, useRef, useState } from "react";
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
    Avatar,
    Divider,
    HStack,
    Input,
    Button,
    VStack,
    useToast,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import conf from "../../conf/conf";

let socket;

const MentorChat = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [chatId, setChatId] = useState("");
    const [currentChatDetails, setCurrentChatDetails] = useState(null);

    const { colorMode, toggleColorMode } = useColorMode();

    const userData = useSelector((state) => state.auth.userData);
    const toast = useToast();

    const lastMessageRef = useRef(null);
    const scrollToBottom = () => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fetchChats = async () => {
        try {
            const res = await fetch(`${conf.backendChat}/fetchChatsforMentor`, {
                credentials: "include",
            });
            const data = await res.json();
            if (data.statusCode >= 400) {
                throw new Error(data.message);
            }
            setChats(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMessages = async (chatId) => {
        try {
            const res = await fetch(
                `${conf.backendMessage}/allMessages/${chatId}`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            setMessages(data.data);
            if (socketConnected) {
                socket.emit("join chat", chatId);
            } else {
                toast({
                    title: "Connection Error",
                    description: "Socket is not connected",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!userData) {
            navigate("/");
        } else if (userData?.isMentor !== "yes") {
            navigate("/feed");
        }

        socket = io(conf.backendEndpoint,
            {
                withCredentials:true
            }
        );
        socket.emit("setup", userData);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("disconnect", () => setSocketConnected(false));

        fetchChats();

        return () => {
            socket.disconnect();
        };
    }, [userData]);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        socket?.on("message received", (newMessage) => {
            setMessages([...messages, newMessage]);
        });
    });

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            const res = await fetch(`${conf.backendMessage}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ chatId, content: newMessage }),
            });
            const data = await res.json();
            
            socket?.emit("new message", data.data);
            
            setMessages([...messages, data.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    const trimTo20 = (str) => {
        if (!str) return str;
        return str.length > 20 ? str.substring(0, 15) + "..." : str;
    };

    const handleChatSelect = async (chatId) => {
        setChatId(chatId);
        const current = chats?.find((chat) => chat._id === chatId);
        if (!current) {
            toast({
                title: "Error",
                description: "Chat not found",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        setCurrentChatDetails(current);
        await fetchMessages(chatId);
        
    };

    return (
        <Flex
            w="100vw"
            h="100vh"
            direction={{ base: "column", md: "row" }}
        >
            {/* Sidebar - Chat List */}
            <Box
                display={{ base: "none", md: "block" }}
                bg={useColorModeValue("gray.100", "gray.800")}
                w="300px"
                h="100vh"
                p={4}
                borderRight="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
            >
                <Flex
                    direction="column"
                    h="full"
                >
                    <Text
                        mb={4}
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.900", "gray.200")}
                    >
                        Chat List
                    </Text>
                    <Flex
                        direction="column"
                        overflowY="scroll"
                        flex="1"
                        css={{
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        {chats?.map((chat) => (
                            <Box
                                key={chat._id}
                                onClick={() => handleChatSelect(chat._id)}
                                mb={2}
                                p={3}
                                bg={"transparent"}
                                borderRadius="md"
                                _hover={{
                                    bg: useColorModeValue(
                                        "gray.200",
                                        "gray.700"
                                    ),
                                    cursor: "pointer",
                                }}
                            >
                                <Flex alignItems="center">
                                    <Avatar
                                        name={chat?.userId?.name}
                                        src={chat?.userId?.avatar}
                                    />
                                    <Box ml={3}>
                                        <Text
                                            fontSize="lg"
                                            fontWeight="medium"
                                            color={useColorModeValue(
                                                "gray.900",
                                                "white"
                                            )}
                                        >
                                            {chat?.userId?.name}
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            color={useColorModeValue(
                                                "gray.600",
                                                "gray.300"
                                            )}
                                        >
                                            {trimTo20(
                                                chat?.latestMessage?.content
                                            )}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </Box>

            {/* Chat Messages */}
            <Box
                flex="1"
                display="flex"
                flexDirection="column"
                overflowY="hidden"
                bg={useColorModeValue("gray.50", "gray.900")}
            >
                {currentChatDetails ? (
                    <Flex
                        direction="column"
                        h="full"
                    >
                        <Box
                            bg={useColorModeValue("white", "gray.700")}
                            px={{base: 20, md:4}}
                            py={3}
                            borderBottom="1px solid"
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                        >
                            <Flex
                                justify="space-between"
                                align="center"
                            >
                                <Flex align="center">
                                    <Avatar
                                        name={currentChatDetails?.userId?.name}
                                        src={currentChatDetails?.userId?.avatar}
                                        size="md"
                                    />
                                    <Box ml={4}>
                                        <Text
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color={useColorModeValue(
                                                "gray.900",
                                                "white"
                                            )}
                                        >
                                            {currentChatDetails?.userId?.name}
                                        </Text>
                                    </Box>
                                </Flex>
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
                            </Flex>
                        </Box>
                        <Box
                            flex="1"
                            px={4}
                            py={4}
                            overflowY="scroll"
                            css={{
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                        >
                            <VStack
                                spacing={4}
                                align="stretch"
                            >
                                {messages.length > 0 ? (
                                    messages.map((message, idx) => {
                                        const isCurrentUser =
                                            message?.sender?._id ===
                                            userData?._id;

                                        const isLastMessage =
                                            messages.length - 1 === idx;
                                        return (
                                            <HStack
                                                key={message?._id}
                                                justify={
                                                    isCurrentUser
                                                        ? "flex-end"
                                                        : "flex-start"
                                                }
                                                ref={
                                                    isLastMessage
                                                        ? lastMessageRef
                                                        : null
                                                }
                                            >
                                                {!isCurrentUser && (
                                                    <Avatar
                                                        name={
                                                            message?.sender
                                                                ?.name
                                                        }
                                                        src={
                                                            message?.sender
                                                                ?.avatar
                                                        }
                                                        size="sm"
                                                    />
                                                )}
                                                <Box
                                                    bg={
                                                        isCurrentUser
                                                            ? "blue.500"
                                                            : "gray.200"
                                                    }
                                                    color={
                                                        isCurrentUser
                                                            ? "white"
                                                            : "black"
                                                    }
                                                    p={3}
                                                    borderRadius="lg"
                                                    maxWidth="70%"
                                                >
                                                    <Text>
                                                        {message?.content}
                                                    </Text>
                                                </Box>
                                                {isCurrentUser && (
                                                    <Avatar
                                                        name={
                                                            message?.sender
                                                                ?.name
                                                        }
                                                        src={
                                                            message?.sender
                                                                ?.avatar
                                                        }
                                                        size="sm"
                                                    />
                                                )}
                                            </HStack>
                                        );
                                    })
                                ) : (
                                    <Text
                                        textAlign="center"
                                        color={useColorModeValue(
                                            "gray.600",
                                            "gray.300"
                                        )}
                                    >
                                        No messages in this chat yet.
                                    </Text>
                                )}
                            </VStack>
                        </Box>
                        <Box
                            borderTop="1px solid"
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                            p={3}
                        >
                            <Flex
                                as="form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                            >
                                <Input
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    mr={2}
                                    bg={useColorModeValue("white", "gray.800")}
                                    borderColor={useColorModeValue(
                                        "gray.200",
                                        "gray.600"
                                    )}
                                />
                                <IconButton
                                    type="submit"
                                    icon={<IoSend />}
                                    aria-label="Send message"
                                    colorScheme="blue"
                                    variant="solid"
                                />
                            </Flex>
                        </Box>
                    </Flex>
                ) : (
                    <Flex
                        h="full"
                        align="center"
                        justify="center"
                    >
                        <Text
                            fontSize="lg"
                            color={useColorModeValue("gray.600", "gray.300")}
                        >
                            Select a chat to start messaging.
                        </Text>
                    </Flex>
                )}
            </Box>

            {/* Mobile Sidebar */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Chat List</DrawerHeader>
                    <DrawerBody>
                        {chats?.map((chat) => (
                            <Box
                                key={chat._id}
                                onClick={() => {
                                    handleChatSelect(chat._id);
                                    onClose();
                                }}
                                mb={2}
                                p={3}
                                bg={"transparent"}
                                borderRadius="md"
                                _hover={{
                                    bg: useColorModeValue(
                                        "gray.200",
                                        "gray.700"
                                    ),
                                    cursor: "pointer",
                                }}
                            >
                                <Flex alignItems="center">
                                    <Avatar
                                        name={chat?.userId?.name}
                                        src={chat?.userId?.avatar}
                                    />
                                    <Box ml={3}>
                                        <Text
                                            fontSize="lg"
                                            fontWeight="medium"
                                        >
                                            {chat?.userId?.name}
                                        </Text>
                                        <Text fontSize="sm">
                                            {trimTo20(
                                                chat?.latestMessage?.content
                                            )}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Hamburger Menu for Mobile */}
            <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                position="fixed"
                top={4}
                left={4}
            />
        </Flex>
    );
};

export default MentorChat;
