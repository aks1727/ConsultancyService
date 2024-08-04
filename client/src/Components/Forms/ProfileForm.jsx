import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Container,
    Box,
    Flex,
    Avatar,
    Text,
    useColorModeValue,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Stack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const ProfileForm = () => {
    const userData = useSelector((state) => state.auth.userData);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const [avatarPreview, setAvatarPreview] = useState(
        userData?.avatar || null
    );
    const [error, setError] = useState("");

    const submit = (data) => {
        console.log(data);
        setError("");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const linkColor = useColorModeValue("blue.500", "blue.300");

;

    return (
        <Flex
            align={"center"}
            justify={["flex-start", "center"]}
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
                <NavLink to="/feed">
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        variant="link"
                        mb={4}
                        color={linkColor}
                    >
                        Back To Application
                    </Button>
                </NavLink>
                <Text
                    fontSize="lg"
                    mb={4}
                    color={textColor}
                >
                    Edit Your Profile
                </Text>
                <form onSubmit={handleSubmit(submit)}>
                    <VStack spacing={2}>
                        <FormControl>
                            <FormLabel htmlFor="avatar">
                                <Flex>
                                    <Avatar
                                        size="md"
                                        name={userData?.name}
                                        src={avatarPreview}
                                        mb={2}
                                        cursor="pointer"
                                    />
                                    <Box ml={4}>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            display={"none"}
                                        />
                                        <FormLabel
                                            htmlFor="avatar"
                                            cursor={"pointer"}
                                        >
                                            Update Image
                                        </FormLabel>
                                        <Text>Recommended 400x400</Text>
                                    </Box>
                                </Flex>
                            </FormLabel>
                        </FormControl>
                        <FormControl isInvalid={errors.fullName}>
                            <FormLabel htmlFor="fullName">
                                Full Name{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="fullName"
                                type="text"
                                defaultValue={userData?.name}
                                {...register("fullName", {
                                    required: "Full Name is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.fullName && errors.fullName.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.username}>
                            <FormLabel htmlFor="username">
                                Username{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="username"
                                type="text"
                                defaultValue={userData?.username}
                                {...register("username", {
                                    required: "Username is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email">
                                Email{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={userData?.email}
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.phoneNumber}>
                            <FormLabel htmlFor="phoneNumber">
                                Phone Number{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                defaultValue={userData?.phoneNumber}
                                {...register("phoneNumber", {
                                    required: "Phone Number is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.phoneNumber &&
                                    errors.phoneNumber.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.bio}>
                            <FormLabel htmlFor="bio">
                                Brief Bio{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="bio"
                                type="text"
                                defaultValue={userData?.bio}
                                {...register("bio", {
                                    required: "Bio is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.bio && errors.bio.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="gender">
                                Gender{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue={userData?.gender || "Male"}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        <Stack direction="row">
                                            <Radio value="Female">Female</Radio>
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Other">Other</Radio>
                                        </Stack>
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                        >
                            Submit
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default ProfileForm;
