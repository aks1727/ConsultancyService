import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    VStack,
    HStack,
    Box,
    Text,
    Input,
    IconButton,
    Avatar,
    Flex,
    useToast,
    useColorMode,
    useColorModeValue,
    Spinner,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import conf from "../conf/conf";
import { io } from "socket.io-client";

let socket;

const Chat = () => {
    const { userId } = useParams();
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChatDetails, setCurrentChatDetails] = useState({});
    const [socketConnected, setSocketConnected] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const navigate = useNavigate();
    const lastMessageRef = useRef(null);

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            navigate("/login");
            return;
        }

        setLoadingUser(false);

        socket = io(conf.backendEndpoint, {
            transports: ["websocket", "polling"],
        });

        socket.on("connected", () => setSocketConnected(true));
        socket.on("disconnect", () => setSocketConnected(false));
        socket.on("message received", (newMessage) => {
            console.log("Message received:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        fetchChat();

        return () => {
            socket.disconnect();
            socket.off("message received");
        };
    }, [userData, navigate]);

    const fetchChat = async () => {
        try {
            const response = await fetch(
                `${conf.backendChat}/accessMentorChat/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await response.json();
            setChat(data.data);
            setCurrentChatDetails(data.data.mentorId);
            fetchMessages(data.data._id);
        } catch (error) {
            toast({
                title: "Error fetching chat",
                description: "An error occurred while fetching chat details.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const fetchMessages = async (chatId) => {
        try {
            const response = await fetch(
                `${conf.backendMessage}/allMessages/${chatId}`,
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            setMessages(data.data);
        } catch (error) {
            toast({
                title: "Error fetching messages",
                description: "An error occurred while fetching messages.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoadingMessages(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (newMessage.trim() === "") return;
        const newmsg1 = {
            chatId: chat?._id,
            content: newMessage,
            sender: {
                _id: userData?._id,
                name: userData?.name,
                avatar: userData?.avatar,
            },
            _id: Date.now(),
        };

        setMessages((prevMessages) => [...prevMessages, newmsg1]);
        setNewMessage("");
        try {
            const response = await fetch(`${conf.backendMessage}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    chatId: chat?._id,
                    content: newMessage,
                }),
            });
            const data = await response.json();
            console.log("Message sent:", data.data);
            socket?.emit("new message", data.data);
        } catch (error) {
            toast({
                title: "Error sending message",
                description: "An error occurred while sending the message.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        if (chat?._id && socketConnected) {
            socket?.emit("join chat", chat._id);
        }
    }, [chat, socketConnected]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (loadingUser) {
        return (
            <Flex
                direction="column"
                height="calc(100vh - 60px)"
                maxW={{ base: "100%", md: "80%" }}
                mx="auto"
                bg={useColorModeValue("gray.50", "gray.900")}
                align="center"
                justify="center"
            >
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Flex
            direction="column"
            height="calc(100vh - 60px)"
            maxW={{ base: "100%", md: "80%" }}
            mx="auto"
            bg={useColorModeValue("gray.50", "gray.900")}
        >
            {/* Chat Header */}
            <Box
                bg={useColorModeValue("white", "gray.700")}
                p={4}
                borderBottom="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
            >
                <Flex
                    justify="space-between"
                    align="center"
                >
                    <Flex align="center">
                        <Avatar
                            name={currentChatDetails?.userId?.name}
                            src={currentChatDetails?.userId?.avatar}
                        />
                        <Box ml={5}>
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color={useColorModeValue("gray.900", "white")}
                            >
                                {currentChatDetails?.userId?.name}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Chat Messages */}
            <Box
                flex="1"
                overflowY="auto"
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                css={{ "::-webkit-scrollbar": { display: "none" } }}
            >
                <VStack
                    spacing={4}
                    align="stretch"
                >
                    {loadingMessages ? (
                        <Flex
                            justify="center"
                            align="center"
                            height="100%"
                        >
                            <Spinner size="xl" />
                        </Flex>
                    ) : messages.length > 0 ? (
                        messages.map((message, idx) => {
                            const isCurrentUser =
                                message?.sender?._id === userData?._id;
                            const isLastMessage = messages.length - 1 === idx;

                            return (
                                <HStack
                                    key={message?._id}
                                    justify={
                                        isCurrentUser
                                            ? "flex-end"
                                            : "flex-start"
                                    }
                                    ref={isLastMessage ? lastMessageRef : null}
                                >
                                    {!isCurrentUser && (
                                        <Avatar
                                            name={message?.sender?.name}
                                            src={message?.sender?.avatar}
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
                                            isCurrentUser ? "white" : "black"
                                        }
                                        p={3}
                                        borderRadius="lg"
                                        maxWidth="70%"
                                    >
                                        <Text>{message?.content}</Text>
                                    </Box>
                                    {isCurrentUser && (
                                        <Avatar
                                            name={message?.sender?.name}
                                            src={message?.sender?.avatar}
                                            size="sm"
                                        />
                                    )}
                                </HStack>
                            );
                        })
                    ) : (
                        <Text
                            textAlign="center"
                            color={useColorModeValue("gray.600", "gray.300")}
                        >
                            No messages in this chat yet.
                        </Text>
                    )}
                </VStack>
            </Box>

            {/* Chat Input */}
            <form>
                <HStack
                    p={4}
                    bg={useColorModeValue("white", "gray.800")}
                    borderTop="1px solid"
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    spacing={3}
                >
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        size="md"
                        bg={useColorModeValue("gray.100", "gray.700")}
                    />
                    <IconButton
                        type="submit"
                        icon={<IoSend />}
                        onClick={handleSendMessage}
                        colorScheme="blue"
                        aria-label="Send message"
                    />
                </HStack>
            </form>
        </Flex>
    );
};

export default Chat;
