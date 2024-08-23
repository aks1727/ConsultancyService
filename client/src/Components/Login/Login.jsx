import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../../store/authSlice.js";
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
import conf from "../../conf/conf.js";
import Loader from "../Loader/Loader.jsx";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");

    // Function to handle login form submission
    const login = async (data) => {
        setIsLoader(true)
        setError("");
        try {
            // console.log(data);

            // Send login request to backend
            const session = await fetch(`${conf.backendUser}/login`, {
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
                if (userData.isMentor === 'yes') {
                    navigate(`/mentor/${userData.username}`);
                }
                else navigate("/feed");
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

    // Color mode values for light and dark themes
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const errorColor = useColorModeValue("red.600", "red.400");
    const linkColor = useColorModeValue("blue.500", "blue.300");



    return isLoader ? <Loader/>: (
        <Flex
            align="center"
            justify="center"
            bg={bgColor}
            minH="100vh"
            p={[4, 6, 8]}
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

                    {/* Sign up link */}
                    <Text
                        fontSize={["md", "lg"]}
                        color={textColor}
                    >
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            style={{
                                color: linkColor,
                                textDecoration: "underline",
                            }}
                        >
                            Sign Up
                        </Link>
                    </Text>
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
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                id="email"
                                placeholder="Enter your Email"
                                type="email"
                                autoComplete="off" // Disable autocomplete
                                bg="white"
                                color="black"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) =>
                                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(
                                                value
                                            ) ||
                                            "Email Address Must be valid email address",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
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

export default Login;
