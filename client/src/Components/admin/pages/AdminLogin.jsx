import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../store/authSlice.js";
import {
    Button,
    Input,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import conf from "../../../conf/conf.js";
import { adminBaseUrl } from "../AdminConstant.js";
import Loader from "../../Loader/Loader.jsx";
function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");
    const [isLoader, setIsLoader] = useState(false)

    const login = async (data) => {
        setError("");
        setIsLoader(true)
        try {
            const session = await fetch(`${conf.backendAdmin}/loginAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", // Include credentials (cookies)
            });

            // console.log(session);

            // Check if login was successful
            if (session.ok) {
                // Fetch current user data
                const userData = await fetch(
                    `${conf.backendUser}/currentUser`,
                    { credentials: "include" }
                )
                    .then((res) => res.json())
                    .then((res) => res.data);

                // console.log(userData);

                // Dispatch login action with user data
                if (userData) {
                    dispatch(authLogin(userData));
                }

                // Navigate to the home page
                navigate(`${adminBaseUrl}/home`);
                console.log('navigated')
            } else {
                // Handle login error
                const errorData = await session.json();
                setError(errorData.message);
            }
        } catch (error) {
            // Handle network or other errors
            setError(error.message);
        }
        setIsLoader(false)
    };
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const errorColor = useColorModeValue("red.600", "red.400");
    const linkColor = useColorModeValue("blue.500", "blue.300");

    return isLoader ? <Loader/> : (
        <Flex
            id="marlele"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            minW={'100%'}
        >
            <Box
                w="full"
                maxW={["full", "lg"]}
                bg={formBgColor}
                rounded="xl"
                p={[6, 8, 10]}
                border="1px"
                borderColor="blackAlpha.200"
                boxShadow="xl"
            >
                <Box
                    mb={2}
                    textAlign="center"
                >
                    {/* Logo */}
                    <Box className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            Logo
                        </span>
                    </Box>

                    {/* Heading */}
                    <Heading
                        as="h2"
                        size="lg"
                        mb={2}
                    >
                        Sign in to your account
                    </Heading>
                </Box>

                {/* Display error message if any */}
                {error && (
                    <Text
                        color={errorColor}
                        mt={4}
                        textAlign="center"
                    >
                        {error}
                    </Text>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit(login)}>
                    <VStack spacing={4}>
                        {/* Email input */}
                        <FormControl isInvalid={errors.username}>
                            <FormLabel htmlFor="username">Username:</FormLabel>
                            <Input
                                id="username"
                                placeholder="Enter your Username"
                                type="text"
                                autoComplete="off" // Disable autocomplete
                                bg="white"
                                color="black"
                                {...register("username", {
                                    required: "Username is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Password input */}
                        <FormControl isInvalid={errors.password}>
                            <FormLabel htmlFor="password">Password:</FormLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="off" // Disable autocomplete
                                bg="white"
                                color="black"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            colorScheme="blue"
                            w="full"
                        >
                            Sign in
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}

export default AdminLogin;
