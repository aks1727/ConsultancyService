import React, { useState } from "react";
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
import { login } from "../../store/authSlice.js";
import Loader from "../Loader/Loader.jsx";

const ProfileForm = () => {
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [error, setError] = useState("");
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

    const [avatarPreview, setAvatarPreview] = useState(userData?.avatar || null);

    const submit = async (data) => {
        if (!data.avatar && !userData?.avatar) {
            setError("Please select an avatar");
            return;
        }
        setIsLoader(true);
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        const res = await fetch(`${conf.backendUser}/updateProfile`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        if (!res.ok) {
            setError("Something went wrong updating profile");
            setIsLoader(false);
            return;
        }
        const responseData = await res.json();
        if (responseData?.data) {
            dispatch(login(responseData.data));
            navigate('/update-details/edit-skills');
        }
        setIsLoader(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
                setValue("avatar", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const formBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("black", "white");
    const linkColor = useColorModeValue("blue.500", "blue.300");

    return isLoader ? (
        <Loader />
    ) : (
        <Flex h={'full'} alignItems={'center'} justifyContent={'center'}>
            <Flex alignItems="center" justifyContent="center" pb={10}>
            <Box
                w="full"
                maxW="3xl"
                bg={formBgColor}
                rounded="xl"
                p={8}
                border="1px"
                borderColor="blackAlpha.200"
                boxShadow="xl"
            >
                <NavLink to="/feed">
                    <Button leftIcon={<ArrowBackIcon />} variant="link" mb={4} color={linkColor}>
                        Back To Application
                    </Button>
                </NavLink>
                <Text fontSize="lg" mb={4} color={textColor}>
                    Edit Your Profile
                </Text>
                <Text color="red">{error}</Text>
                <form onSubmit={handleSubmit(submit)}>
                    <Flex gap={6} flexWrap="wrap">
                        {/* Left Column */}
                        <VStack flex={1} spacing={4}>
                            <FormControl isInvalid={errors.avatar}>
                                <FormLabel htmlFor="avatar">
                                    <Flex alignItems="center">
                                        <Avatar size="md" name={userData?.name} src={avatarPreview} mb={2} />
                                        <Box ml={4}>
                                            <Input
                                                id="avatar"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                display="none"
                                            />
                                            <FormLabel htmlFor="avatar" cursor="pointer">
                                                Update Image <Text as="span" color="red">*</Text>
                                            </FormLabel>
                                            <Text fontSize="sm">Recommended 400x400</Text>
                                            <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
                                        </Box>
                                    </Flex>
                                </FormLabel>
                            </FormControl>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="name">Full Name <Text as="span" color="red">*</Text></FormLabel>
                                <Input id="name" type="text" {...register("name", { required: "Full Name is required" })} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.email}>
                                <FormLabel htmlFor="email">Email <Text as="span" color="red">*</Text></FormLabel>
                                <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                        </VStack>
                        {/* Right Column */}
                        <VStack flex={1} spacing={4}>
                            <FormControl isInvalid={errors.username}>
                                <FormLabel htmlFor="username">Username <Text as="span" color="red">*</Text></FormLabel>
                                <Input id="username" type="text" {...register("username", { required: "Username is required" })} />
                                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.phoneNumber}>
                                <FormLabel htmlFor="phoneNumber">Phone Number <Text as="span" color="red">*</Text></FormLabel>
                                <Input id="phoneNumber" type="tel" {...register("phoneNumber", { required: "Phone Number is required" })} />
                                <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.bio}>
                                <FormLabel htmlFor="bio">Brief Bio <Text as="span" color="red">*</Text></FormLabel>
                                <Input id="bio" type="text" {...register("bio", { required: "Bio is required" })} />
                                <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="gender">Gender <Text as="span" color="red">*</Text></FormLabel>
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
                        </VStack>
                    </Flex>
                    <Button type="submit" colorScheme="blue" w="full" mt={6}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Flex>
        </Flex>
    );
};

export default ProfileForm;
