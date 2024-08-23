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
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import conf from "../conf/conf";
import {io} from "socket.io-client"


let socket;

const Chat = () => {
    const { userId } = useParams();
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentChatDetails, setCurrentChatDetails] = useState({});
    const [socketConnected, setSocketConnected] = useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const navigate = useNavigate()
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket = io(conf.backendEndpoint, {
            withCredentials:true
        });
        socket?.emit("setup", userData);
        socket?.on("connected", () => setSocketConnected(true));
        socket?.on("disconnect", () => setSocketConnected(false));

        fetchChat();

        return () => {
            socket?.disconnect();
        };
    }, [userId]);

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
            console.log(data)
            setChat(data.data);
            setCurrentChatDetails(data.data.mentorId);
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

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
            socket?.emit("new message",data.data)
            setMessages([...messages, data.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (chat?._id) {
            if (socketConnected) {
                socket?.emit("join chat", chat._id);
            } else {
                toast({
                    title: "Connection Error",
                    description: "Socket is not connected",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            fetchMessages(chat._id);
        }
    }, [chat]);

    useEffect(() => {
        socket?.on("message received", (newMessage) => {
            setMessages([...messages, newMessage]);
        });
    })

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    

    return (
        <Flex
            direction="column"
            height="calc(100vh - 60px)" // Adjust based on your navbar height
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
                overflowY="auto" // Make messages scrollable
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                css={{
                    "::-webkit-scrollbar": {
                        display:"none"
                    }, 
                }}
            >
                <VStack
                    spacing={4}
                    align="stretch"
                >
                    {messages.length > 0 ? (
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

            {/* Message Input */}
            <HStack
                p={4}
                bg={useColorModeValue("white", "gray.700")}
                borderTop="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                position="sticky"
                bottom="0"
                width="100%"
            >
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    bg={useColorModeValue("white", "gray.800")}
                    boxShadow="md"
                    flex="1"
                />
                <IconButton
                    onClick={handleSendMessage}
                    icon={<IoSend />}
                    aria-label="Send message"
                    colorScheme="blue"
                    variant="solid"
                />
            </HStack>
        </Flex>
    );
};

export default Chat;
