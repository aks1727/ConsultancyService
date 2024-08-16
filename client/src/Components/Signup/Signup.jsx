import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice.js";
import {
    Button, Input, VStack, Box, FormControl, FormLabel, FormErrorMessage, Heading, Text, useColorModeValue, Flex
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import conf from "../../conf/conf.js"
import Loader from "../Loader/Loader.jsx";
function Signup() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoader, setIsLoader] = useState(false)

    const createUser = async (data) => {
        setIsLoader(true);
        setError("");
        console.log(data, typeof data);
        try {
            const response = await fetch(
                `${conf.backendUser}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...data }),
                    credentials:'include'
                }
            );
            if(!response.ok){
                console.log()
                const error = await response.json()
                console.log(error)
                
                throw new Error(error.message)
            }
            const userData = await response.json();
            dispatch(authLogin(userData.data))
            navigate("/feed");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
        setIsLoader(false)
    };

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const errorColor = useColorModeValue("red.600", "red.400");
    const linkColor = useColorModeValue("blue.500", "blue.300");

    return isLoader ? <Loader/> : (
        <Flex align="center" justify="center" bg={bgColor} minH="100vh" p={[4, 6, 8]}>
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
                <Box mb={2} textAlign="center">
                    <Heading as="h2" size="lg" mb={2}>Sign up to create account</Heading>
                    <Text fontSize={["md", "lg"]} color={textColor}>
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            style={{ color: linkColor, textDecoration: 'underline' }}
                        >
                            Sign In
                        </Link>
                    </Text>
                </Box>

                {error && (
                    <Text color={errorColor} mt={4} textAlign="center">{error}</Text>
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
                            <FormLabel htmlFor="username">Username</FormLabel>
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
                            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                            <Input
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                bg="white"
                                color="black"
                                autoComplete="off"
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    validate :{
                                        matchPattern: (value) =>
                                            /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || "Phone number must be 10 digits",
                                    }
                                })}
                            />
                            <FormErrorMessage>
                                {errors.phoneNumber && errors.phoneNumber.message}
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
                                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address Must be valid email address",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.password}>
                            <FormLabel htmlFor="password">Password</FormLabel>
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

                        <Button type="submit" colorScheme="blue" w="full">
                            Sign Up
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
}

export default Signup;
