import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    Image,
    useColorMode,
    keyframes,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import conf from "../../conf/conf.js";
import Loader from "../Loader/Loader.jsx";

import careerLogin from "/img/careerLogin.png";
import businessLogin from "/img/businessLogin.jpeg";
import crLogin from "/img/crlogin1.jpeg";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const [isLoader, setIsLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");

    const slideInAnimation = keyframes`
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    `;

    const login = async (data) => {
        setIsLoader(true);
        setError("");
        try {
            const session = await fetch(`${conf.backendUser}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (session.ok) {
                const userData = await fetch(
                    `${conf.backendUser}/currentUser`,
                    {
                        credentials: "include",
                    }
                )
                    .then((res) => res.json())
                    .then((res) => res.data);

                if (userData) {
                    dispatch(authLogin(userData));
                }

                if (userData.isMentor === "yes") {
                    navigate(`/mentor/${userData.username}`);
                } else navigate("/search");
            } else {
                const errorData = await session.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoader(false);
    };

    const bgColor = useColorModeValue(
        "white",
        "linear-gradient(135deg, #1A202C, #4A5568)"
    );
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const errorColor = useColorModeValue("red.600", "red.400");
    const linkColor = useColorModeValue("blue.500", "blue.300");

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return isLoader ? (
        <Loader />
    ) : (
        <Flex
            align="center"
            justify="center"
            bg={bgColor}
            minH="100vh"
            direction={{ base: "column", md: "row" }}
            position="relative"
            overflow="hidden"
        >
            {/* Carousel of Illustrations */}
            <Box
                flex="1"
                display={{ base: "none", md: "block" }}
                animation={`${slideInAnimation} 2s ease`}
                w="40%"
                h="100vh"
                position="relative"
                overflow="hidden"
            >
                <Slider {...settings}>
                    <Image
                        w="full"
                        h="100vh"
                        src={careerLogin}
                        alt="Illustration 1"
                        filter="brightness(90%)"
                    />
                    <Image
                        w="full"
                        h="100vh"
                        src={businessLogin}
                        alt="Illustration 2"
                        filter="brightness(90%)"
                    />
                    <Image
                        w="full"
                        h="100vh"
                        src={crLogin}
                        alt="Illustration 3"
                        filter="brightness(90%)"
                    />
                </Slider>
            </Box>

            {/* Login form with animation */}
            <Flex
                w={{ base: "100%", md: "60%" }}
                h="100vh"
                bg={formBgColor}
                rounded="xl"
                p={[6, 8, 10]}
                boxShadow="2xl"
                animation={`${slideInAnimation} 1s ease`}
                transition="all 0.3s ease"
                zIndex={2}
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    w={{ base: "90%", md: "80%", lg: "60%" }}
                    textAlign="center"
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.02)" }}
                >
                    <Heading
                        as="h2"
                        size="lg"
                        mb={4}
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                    >
                        Sign in to your account
                    </Heading>

                    <Text
                        fontSize={["md", "lg"]}
                        color={textColor}
                        mb={6}
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

                    {error && (
                        <Text
                            color={errorColor}
                            mb={6}
                            fontWeight="bold"
                        >
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleSubmit(login)}>
                        <VStack spacing={6}>
                            <FormControl isInvalid={errors.email}>
                                <FormLabel htmlFor="email">Email:</FormLabel>
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    autoComplete="off"
                                    bg="white"
                                    color="black"
                                    borderRadius="md"
                                    borderColor="gray.300"
                                    boxShadow="sm"
                                    _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "outline",
                                    }}
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

                            <FormControl isInvalid={errors.password}>
                                <FormLabel htmlFor="password">
                                    Password:
                                </FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                    bg="white"
                                    color="black"
                                    borderRadius="md"
                                    borderColor="gray.300"
                                    boxShadow="sm"
                                    _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "outline",
                                    }}
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                w="full"
                                borderRadius="md"
                                py={6}
                                fontSize="lg"
                                fontWeight="bold"
                                _hover={{ bg: "blue.600" }}
                            >
                                Sign in
                            </Button>

                            {error === "Passwords do not match" && (
                                <Text
                                    as={NavLink}
                                    to={"/changePassword"}
                                    mt={2}
                                    fontSize="sm"
                                    color={linkColor}
                                    _hover={{ textDecoration: "underline" }}
                                >
                                    Change your password here
                                </Text>
                            )}
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Login;
