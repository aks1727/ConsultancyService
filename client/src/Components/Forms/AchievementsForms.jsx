import React, { useEffect, useId, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Text,
    IconButton,
    Alert,
    AlertIcon,
    useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, CheckIcon, CloseIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice.js';
import conf from "../../conf/conf";
import AlertModal from '../alerts/AlertModal'; // Adjust the import path accordingly
import Loader from "../Loader/Loader.jsx";
const AchievementsForm = () => {
    const id = useId()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const achievements = useSelector((state) => state.auth.userData?.achievements);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoader, setIsLoader] = useState(false)

    const { handleSubmit, control, reset, formState: { errors }, getValues, setValue, clearErrors } = useForm({
        defaultValues: {
            achievementDetails: achievements?.length > 0 ? achievements : [],
        },
    });

    const { fields, prepend, remove } = useFieldArray({
        control,
        name: "achievementDetails",
    });

    useEffect(() => {
        if (achievements?.length > 0) {
            reset({
                achievementDetails: achievements,
            });
        }
    }, [achievements, reset]);

    const onSubmit = async (data) => {
        if (data.achievementDetails.length === 0) {
            setFormError('Please add at least one achievement entry.');
            return;
        }
        
        setIsLoader(true)
        try {
            const response = await fetch(
                `${conf.backendUser}/updateAchievementDetails`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ achievementDetails: data.achievementDetails }),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                dispatch(login(responseData.data));
                navigate('/become-mentor/1')
            } else {
                throw new Error("Achievement fetch error");
            }
        } catch (error) {
            console.log(error);
            setFormError('Failed to save achievement details.');
        }
        setIsLoader(false)
    };

    const handleCheckClick = (index) => {
        const values = getValues();
        const achievementFields = values.achievementDetails;

        // Check if all fields are filled
        const isValid = achievementFields.every((field) => 
            field.organization && field.achievement && field.date && field.url
        );

        console.log('Values on Check:', values); // Debugging
        console.log('Is Valid:', isValid); // Debugging

        if (isValid) {
            // Update the fields array with the new values
            fields[index] = achievementFields[index];
            clearErrors(`achievementDetails[${index}]`); // Clear errors for the current field

            setEditingIndex(-1); // End editing mode
        } else {
            setAlertMessage("Please fill all required fields.");
            setIsAlertOpen(true);
        }
    };

    const handleCloseClick = (index) => {
        if (achievements && achievements[index]) {
            // Revert the form fields to their original data
            const originalData = achievements[index];
            setValue(`achievementDetails[${index}].organization`, originalData.organization);
            setValue(`achievementDetails[${index}].achievement`, originalData.achievement);
            setValue(`achievementDetails[${index}].date`, originalData.date);
            setValue(`achievementDetails[${index}].url`, originalData.url);
            clearErrors(`achievementDetails[${index}]`); // Clear errors for the current field
        } else {
            remove(index); // If there was no original data, remove the entry
        }
        setEditingIndex(-1); // End editing mode
    };

    const handleAlertConfirm = () => {
        setIsAlertOpen(false);
    };

    const linkColor = useColorModeValue("blue.500", "blue.300");
    return isLoader ? <Loader/> : (
        <Box
            maxW="600px"
            mx="auto"
            p={4}
            pb={20}
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
                fontSize={"2xl"}
                fontWeight={"bold"}
                mb={"2"}
            >
                Edit Your Achievement Details
            </Text>
            <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() => {
                    prepend({
                        organization: "",
                        achievement: "",
                        date: "",
                        url: "",
                    });
                    setEditingIndex(0); // Set new field as being edited
                }}
                mb={4}
            >
                Add
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
                {formError && (
                    <Alert
                        status="error"
                        mb={4}
                    >
                        <AlertIcon />
                        {formError}
                    </Alert>
                )}
                {fields.map((item, index) => (
                    <Box
                        key={id}
                        mt={4}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <VStack
                            spacing={4}
                            align="flex-start"
                        >
                            <HStack
                                justify="space-between"
                                width="100%"
                            >
                                <Text fontWeight="bold">
                                    Achievement {index + 1}
                                </Text>
                                <HStack>
                                    {editingIndex !== index && (
                                        <>
                                            <IconButton
                                                icon={<EditIcon />}
                                                colorScheme="teal"
                                                onClick={() =>
                                                    setEditingIndex(index)
                                                }
                                            />
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                onClick={() => remove(index)}
                                            />
                                        </>
                                    )}
                                </HStack>
                            </HStack>
                            {editingIndex === index ? (
                                <>
                                    <FormControl
                                        isInvalid={
                                            errors.achievementDetails?.[index]
                                                ?.organization
                                        }
                                    >
                                        <FormLabel>
                                            Organization{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`achievementDetails[${index}].organization`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Organization is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter the organization"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.achievementDetails?.[index]
                                            ?.organization && (
                                            <Text color="red.500">
                                                {
                                                    errors.achievementDetails[
                                                        index
                                                    ].organization.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.achievementDetails?.[index]
                                                ?.achievement
                                        }
                                    >
                                        <FormLabel>
                                            Achievement{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`achievementDetails[${index}].achievement`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Achievement is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter your achievement"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.achievementDetails?.[index]
                                            ?.achievement && (
                                            <Text color="red.500">
                                                {
                                                    errors.achievementDetails[
                                                        index
                                                    ].achievement.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.achievementDetails?.[index]
                                                ?.date
                                        }
                                    >
                                        <FormLabel>
                                            Date{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`achievementDetails[${index}].date`}
                                            control={control}
                                            rules={{
                                                required: "Date is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    type="date"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.achievementDetails?.[index]
                                            ?.date && (
                                            <Text color="red.500">
                                                {
                                                    errors.achievementDetails[
                                                        index
                                                    ].date.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.achievementDetails?.[index]
                                                ?.url
                                        }
                                    >
                                        <FormLabel>
                                            URL{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`achievementDetails[${index}].url`}
                                            control={control}
                                            rules={{
                                                required: "URL is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter the URL"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.achievementDetails?.[index]
                                            ?.url && (
                                            <Text color="red.500">
                                                {
                                                    errors.achievementDetails[
                                                        index
                                                    ].url.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <HStack
                                        width="100%"
                                        justifyContent="space-between"
                                    >
                                        <IconButton
                                            icon={<CheckIcon />}
                                            colorScheme="teal"
                                            width="48%"
                                            onClick={() =>
                                                handleCheckClick(index)
                                            }
                                        />
                                        <IconButton
                                            icon={<CloseIcon />}
                                            colorScheme="red"
                                            width="48%"
                                            onClick={() =>
                                                handleCloseClick(index)
                                            }
                                        />
                                    </HStack>
                                </>
                            ) : (
                                <>
                                    <Text>
                                        <b>Organization:</b> {item.organization}
                                    </Text>
                                    <Text>
                                        <b>Achievement:</b> {item.achievement}
                                    </Text>
                                    <Text>
                                        <b>Date:</b> {item.date}
                                    </Text>
                                    <Text>
                                        <b>URL:</b> {item.url}
                                    </Text>
                                </>
                            )}
                        </VStack>
                    </Box>
                ))}
                <Button
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            {/* Alert Modal */}
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onConfirm={handleAlertConfirm}
                onCancel={() => setIsAlertOpen(false)}
                message={alertMessage}
            />
        </Box>
    );
};

export default AchievementsForm;
