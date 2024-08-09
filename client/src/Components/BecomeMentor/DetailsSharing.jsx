import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import conf from "../../conf/conf";
import {useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice.js'

const DetailsSharing = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await fetch(`${conf.backendUser}/submitMentorRequest`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...data }),
                    credentials: "include",
                }
            )
            if (res.ok) {
                const resData = await res.json()
                dispatch(login(resData.data));
                navigate('/become-mentor/3')
                
            } else {
                throw new Error("Failed to submit")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const linkedinProfile = watch("linkedinProfile");
    const resumeLink = watch("resumeLink");

    return (
        <Box
            p={8}
            maxWidth="500px"
            mx="auto"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl
                        isInvalid={errors.linkedinProfile || errors.resumeLink}
                    >
                        <FormLabel>Enter your LinkedIn Profile</FormLabel>
                        <Input
                            placeholder="https://www.linkedin.com/in/your-profile"
                            {...register("linkedinProfile", {
                                validate: (value) =>
                                    !value && !resumeLink
                                        ? "Both LinkedIn and Resume URL cannot be empty"
                                        : true,
                            })}
                        />
                        <FormErrorMessage>
                            {errors.linkedinProfile &&
                                errors.linkedinProfile.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.resumeLink}>
                        <FormLabel>Enter your Resume Link</FormLabel>
                        <Input
                            placeholder="Profile / Link here"
                            {...register("resumeLink", {
                                validate: (value) =>
                                    !value && !linkedinProfile
                                        ? "Both LinkedIn and Resume URL cannot be empty"
                                        : true,
                            })}
                        />
                        <FormErrorMessage>
                            {errors.resumeLink && errors.resumeLink.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Text
                        fontSize="sm"
                        color="blue.500"
                    >
                        Either adding your LinkedIn profile or adding your
                        Resume is a mandatory process to proceed your
                        application.
                    </Text>

                    <FormControl isInvalid={errors.whatsappNumber}>
                        <FormLabel>WhatsApp Phone Number</FormLabel>
                        <Input
                            placeholder="Enter your phone number"
                            type="tel"
                            {...register("whatsappNumber", {
                                required: "WhatsApp Phone Number is required",
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Phone number must be numeric",
                                },
                                validate :{
                                    matchPattern: (value) =>
                                        /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || "Phone number must be 10 digits",
                                }
                            })}
                        />
                        <FormErrorMessage>
                            {errors.whatsappNumber &&
                                errors.whatsappNumber.message}
                        </FormErrorMessage>
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
    );
};

export default DetailsSharing;
