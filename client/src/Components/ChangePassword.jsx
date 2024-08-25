import React from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
} from "@chakra-ui/react";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate  = useNavigate()
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${conf.backendUser}//changePassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message)
            }

            alert("Password updated successfully")
            navigate('/login')


        } catch (error) {
            console.log(error)
        }
    };

    // Watch the new password field to validate the confirm password field
    const newPassword = watch("newPassword", "");

    return (
        <Box
            maxW="400px"
            mx="auto"
            mt="8"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                    isInvalid={errors.email}
                    mb="4"
                >
                    <FormLabel htmlFor="newPassword">Email:</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "email is required",
                            
                        })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={errors.newPassword}
                    mb="4"
                >
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <Input
                        id="newPassword"
                        type="password"
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.newPassword && errors.newPassword.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={errors.confirmPassword}
                    mb="4"
                >
                    <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FormLabel>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === newPassword ||
                                "Passwords do not match",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.confirmPassword &&
                            errors.confirmPassword.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    mt="4"
                    width="full"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Change Password
                </Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
