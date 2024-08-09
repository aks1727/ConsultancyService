import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
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
import { useDispatch, useSelector } from "react-redux";
import conf from "../../conf/conf.js";
import login from "../../store/authSlice.js";

const ProfileForm = () => {
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: userData?.name || "",
            username: userData?.username || "",
            email: userData?.email || "",
            phoneNumber: userData?.phoneNumber || "",
            bio: userData?.bio || "",
            gender: userData?.gender || "",
            avatar: userData?.avatar || "",
        },
    });

    const [avatarPreview, setAvatarPreview] = useState(
        userData?.avatar || null
    );
    const [error, setError] = useState("");

    const submit = async (data) => {
        console.log(data);
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
            // console.log(key, data[key]
        });
        const res = await fetch(`${conf.backendUser}/updateProfile`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        if (!res.ok) {
            setError("Something went wrong updating profile");
            return;
        }
        const responseData = await res.json();
        if (!responseData) {
            setError("Failed to update profile");
            return;
        }
        console.log(responseData.data)
        dispatch(login(responseData.data));
        navigate("/update-details/edit-education");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setValue("avatar", file); // Store the file in the form state
            };
            reader.readAsDataURL(file);
        }
    };

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const linkColor = useColorModeValue("blue.500", "blue.300");


    useEffect(()=>{console.log(userData)},[userData])
    return (
        <Flex
            align="center"
            justify={["flex-start", "center"]}
            pb={10}
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
                    <VStack spacing={4}>
                        <FormControl isInvalid={errors.avatar}>
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
                                            cursor="pointer"
                                        >
                                            Update Image{" "}
                                            <Text
                                                as="span"
                                                color="red"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Text fontSize="sm">
                                            Recommended 400x400
                                        </Text>
                                        <FormErrorMessage>
                                            {errors.avatar &&
                                                errors.avatar.message}
                                        </FormErrorMessage>
                                    </Box>
                                </Flex>
                            </FormLabel>
                        </FormControl>
                        <FormControl isInvalid={errors.name}>
                            <FormLabel htmlFor="name">
                                Full Name{" "}
                                <Text
                                    as="span"
                                    color="red"
                                >
                                    *
                                </Text>
                            </FormLabel>
                            <Input
                                id="name"
                                type="text"
                                {...register("name", {
                                    required: "Full Name is required",
                                })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
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
