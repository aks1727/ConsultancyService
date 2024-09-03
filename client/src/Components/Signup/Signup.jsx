import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice.js";
import {
    Button,
    Input,
    VStack,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    Image,
    keyframes,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Slider from "react-slick";
import conf from "../../conf/conf.js";
import Loader from "../Loader/Loader.jsx";

import careerLogin from "/img/careerLogin.png";
import businessLogin from "/img/businessLogin.jpeg";
import crLogin from "/img/crlogin1.jpeg";

function Signup() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isLoader, setIsLoader] = useState(false);

    const createUser = async (data) => {
        setIsLoader(true);
        setError("");
        try {
            const response = await fetch(`${conf.backendUser}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const userData = await response.json();
            dispatch(authLogin(userData.data));
            if (userData.data.isMentor === "yes") {
                navigate(`/mentor/${userData.data.username}`);
            } else navigate("/search");
        } catch (err) {
            setError(err.message);
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

    const slideInAnimation = keyframes`
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    `;

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
            >
                <Slider {...settings}>
                    <Image
                        w={"full"}
                        h={"100vh"}
                        src={careerLogin}
                        alt="Illustration 1"
                    />
                    <Image
                        w={"full"}
                        h={"100vh"}
                        src={businessLogin}
                        alt="Illustration 2"
                    />
                    <Image
                        w={"full"}
                        h={"100vh"}
                        src={crLogin}
                        alt="Illustration 3"
                    />
                </Slider>
            </Box>

            {/* Signup form with animation */}
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
                    w={{ base: "90%", md: "60%", lg: "40%" }}
                    textAlign="center"
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.02)" }}
                >
                    <Heading
                        as="h2"
                        size="lg"
                        mb={2}
                    >
                        Sign up to create an account
                    </Heading>
                    <Text
                        fontSize={["md", "lg"]}
                        color={textColor}
                        mb={4}
                    >
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            style={{
                                color: linkColor,
                                textDecoration: "underline",
                            }}
                        >
                            Sign In
                        </Link>
                    </Text>

                    {error && (
                        <Text
                            color={errorColor}
                            mb={4}
                        >
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleSubmit(createUser)}>
                        <VStack spacing={4}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    bg="white"
                                    color="black"
                                    autoComplete="off"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.username}>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                    bg="white"
                                    color="black"
                                    autoComplete="off"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.username && errors.username.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.phoneNumber}>
                                <FormLabel htmlFor="phoneNumber">
                                    Phone Number
                                </FormLabel>
                                <Input
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    bg="white"
                                    color="black"
                                    autoComplete="off"
                                    {...register("phoneNumber", {
                                        required: "Phone number is required",
                                        validate: {
                                            matchPattern: (value) =>
                                                /^(\+\d{1,3}[- ]?)?\d{10}$/.test(
                                                    value
                                                ) ||
                                                "Phone number must be 10 digits",
                                        },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.phoneNumber &&
                                        errors.phoneNumber.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.email}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    bg="white"
                                    color="black"
                                    autoComplete="off"
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
                                    Password
                                </FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    bg="white"
                                    color="black"
                                    autoComplete="off"
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
                            >
                                Sign Up
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Signup;
