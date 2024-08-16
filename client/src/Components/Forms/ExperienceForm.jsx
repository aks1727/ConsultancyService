import React, { useEffect, useState, useId } from "react";
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
    Checkbox,
    useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon, CheckIcon, CloseIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice.js';
import conf from "../../conf/conf";
import AlertModal from '../alerts/AlertModal'; // Adjust the import path accordingly
import Loader from "../Loader/Loader.jsx";


const ExperienceForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const experiences = useSelector((state) => state.auth.userData?.experiences);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoader, setIsLoader] = useState(false)
    const uniqueId = useId();

    const { handleSubmit, control, reset, formState: { errors }, getValues, setValue, clearErrors } = useForm({
        defaultValues: {
            experienceDetails: experiences?.length > 0 ? experiences : [],
        },
    });

    const { fields, prepend, remove } = useFieldArray({
        control,
        name: "experienceDetails",
    });

    useEffect(() => {
        if (experiences?.length > 0) {
            reset({
                experienceDetails: experiences,
            });
        }
    }, [experiences, reset]);

    const onSubmit = async (data) => {
        setIsLoader(true)
        if (data.experienceDetails.length === 0) {
            setFormError('Please add at least one experience entry.');
            return;
        }

        try {
            const response = await fetch(
                `${conf.backendUser}/updateExperienceDetails`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ experienceDetails: data.experienceDetails }),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                dispatch(login(responseData.data));
                navigate('/update-details/edit-achievements');
            } else {
                throw new Error("Experience fetch error");
            }
        } catch (error) {
            console.log(error);
            setFormError('Failed to save experience details.');
        }
        setIsLoader(false)
    };

    const handleCheckClick = (index) => {
        const values = getValues();
        const experienceFields = values.experienceDetails;

        // Check if all fields are filled
        const isValid = experienceFields.every((field) => 
            field.title && field.duration && field.company && field.location && field.description
        );

        console.log('Values on Check:', values); // Debugging
        console.log('Is Valid:', isValid); // Debugging

        if (isValid) {
            // Update the fields array with the new values
            fields[index] = experienceFields[index];
            clearErrors(`experienceDetails[${index}]`); // Clear errors for the current field

            setEditingIndex(-1); // End editing mode
        } else {
            setAlertMessage("Please fill all required fields.");
            setIsAlertOpen(true);
        }
    };

    const handleCloseClick = (index) => {
        if (experiences && experiences[index]) {
            // Revert the form fields to their original data
            const originalData = experiences[index];
            setValue(`experienceDetails[${index}].title`, originalData.title);
            setValue(`experienceDetails[${index}].duration`, originalData.duration);
            setValue(`experienceDetails[${index}].company`, originalData.company);
            setValue(`experienceDetails[${index}].location`, originalData.location);
            setValue(`experienceDetails[${index}].description`, originalData.description);
            setValue(`experienceDetails[${index}].isWorking`, originalData.isWorking);
            clearErrors(`experienceDetails[${index}]`); // Clear errors for the current field
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
                Edit Your Experience details
            </Text>
            <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() => {
                    prepend({
                        title: "",
                        duration: "",
                        company: "",
                        location: "",
                        description: "",
                        isWorking: false,
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
                        key={item.id || uniqueId}
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
                                    Experience {index + 1}
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
                                            errors.experienceDetails?.[index]
                                                ?.title
                                        }
                                    >
                                        <FormLabel>
                                            Title{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].title`}
                                            control={control}
                                            rules={{
                                                required: "Title is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter your title"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.experienceDetails?.[index]
                                            ?.title && (
                                            <Text color="red.500">
                                                {
                                                    errors.experienceDetails[
                                                        index
                                                    ].title.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.experienceDetails?.[index]
                                                ?.duration
                                        }
                                    >
                                        <FormLabel>
                                            Duration{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].duration`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Duration is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter the duration"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.experienceDetails?.[index]
                                            ?.duration && (
                                            <Text color="red.500">
                                                {
                                                    errors.experienceDetails[
                                                        index
                                                    ].duration.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.experienceDetails?.[index]
                                                ?.company
                                        }
                                    >
                                        <FormLabel>
                                            Company{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].company`}
                                            control={control}
                                            rules={{
                                                required: "Company is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter the company name"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.experienceDetails?.[index]
                                            ?.company && (
                                            <Text color="red.500">
                                                {
                                                    errors.experienceDetails[
                                                        index
                                                    ].company.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.experienceDetails?.[index]
                                                ?.location
                                        }
                                    >
                                        <FormLabel>
                                            Location{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].location`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Location is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter the location"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.experienceDetails?.[index]
                                            ?.location && (
                                            <Text color="red.500">
                                                {
                                                    errors.experienceDetails[
                                                        index
                                                    ].location.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.experienceDetails?.[index]
                                                ?.description
                                        }
                                    >
                                        <FormLabel>
                                            Description{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].description`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Description is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Enter a brief description"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.experienceDetails?.[index]
                                            ?.description && (
                                            <Text color="red.500">
                                                {
                                                    errors.experienceDetails[
                                                        index
                                                    ].description.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Currently Working</FormLabel>
                                        <Controller
                                            name={`experienceDetails[${index}].isWorking`}
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    {...field}
                                                    isChecked={field.value}
                                                >
                                                    I'm currently working here
                                                </Checkbox>
                                            )}
                                        />
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
                                        <b>Title:</b> {item.title}
                                    </Text>
                                    <Text>
                                        <b>Duration:</b> {item.duration}
                                    </Text>
                                    <Text>
                                        <b>Company:</b> {item.company}
                                    </Text>
                                    <Text>
                                        <b>Location:</b> {item.location}
                                    </Text>
                                    <Text>
                                        <b>Description:</b> {item.description}
                                    </Text>
                                    <Text>
                                        <b>Currently Working:</b>{" "}
                                        {item.isWorking ? "Yes" : "No"}
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

export default ExperienceForm;
