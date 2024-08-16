import React, { useEffect, useState } from "react";
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
import Loader from "../Loader/Loader.jsx"
const EducationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const education = useSelector((state) => state.auth.userData?.educations);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoader, setIsLoader] = useState(false)

    const formatDateToInput = (date) => {
        const d = new Date(date);
        const day = (`0${d.getDate()}`).slice(-2);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;  // Converts to 'YYYY-MM-DD'
    };

    const formatDateToDisplay = (date) => {
        const d = new Date(date);
        const day = (`0${d.getDate()}`).slice(-2);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;  // Converts to 'DD/MM/YYYY'
    };

    const { handleSubmit, control, reset, formState: { errors }, getValues, setValue, clearErrors } = useForm({
        defaultValues: {
            education: education?.length > 0 ? education.map(ed => ({
                ...ed,
                from: ed.from ? formatDateToInput(ed.from) : "",
                to: ed.to ? formatDateToInput(ed.to) : "",
            })) : [],
        },
    });

    const { fields, prepend, remove } = useFieldArray({
        control,
        name: "education",
    });

    



    useEffect(() => {
        if (education?.length > 0) {
            reset({
                education: education.map(ed => ({
                    ...ed,
                    from: ed.from ? formatDateToInput(ed.from) : "",
                    to: ed.to ? formatDateToInput(ed.to) : "",
                }))
            });
        }
    }, [education, reset]);

    const onSubmit = async (data) => {
        setIsLoader(true)
        if (data.education.length === 0) {
            setFormError('Please add at least one education entry.');
            return;
        }

        try {
            const response = await fetch(
                `${conf.backendUser}/updateEducationDetails`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ education: data.education }),
                }
            );
            if (response.ok) {
                const responseData = await response.json();
                dispatch(login(responseData.data));
                navigate('/update-details/edit-experience');
            } else {
                throw new Error("Education fetch error");
            }
        } catch (error) {
            console.log(error);
            setFormError('Failed to save education details.');
        }
        setIsLoader(false)
    };

    
    const handleCheckClick = (index) => {
        const values = getValues();
        const educationFields = values.education;

        // Check if all fields are filled
        const isValid = educationFields.every((field) => 
            field.collegeName && field.degree && field.from && field.to && field.cgpa
        );

        console.log('Values on Check:', values); // Debugging
        console.log('Is Valid:', isValid); // Debugging

        if (isValid) {
            // Update the fields array with the new values
            fields[index] = educationFields[index];
            clearErrors(`education[${index}]`); // Clear errors for the current field

            setEditingIndex(-1); // End editing mode
        } else {
            setAlertMessage("Please fill all required fields.");
            setIsAlertOpen(true);
        }
    };

    const handleCloseClick = (index) => {
        if (education && education[index]) {
            // Revert the form fields to their original data
            const originalData = education[index];
            setValue(`education[${index}].collegeName`, originalData.collegeName);
            setValue(`education[${index}].degree`, originalData.degree);
            setValue(`education[${index}].from`, originalData.from ? formatDateToInput(originalData.from) : "");
            setValue(`education[${index}].to`, originalData.to ? formatDateToInput(originalData.to) : "");
            setValue(`education[${index}].cgpa`, originalData.cgpa);
            clearErrors(`education[${index}]`); // Clear errors for the current field
        } else {
            remove(index); // If there was no original data, remove the entry
        }
        setEditingIndex(-1); // End editing mode
    };

    const handleAlertConfirm = () => {
        setIsAlertOpen(false);
    };

    const linkColor = useColorModeValue("blue.500", "blue.300");
    return (
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
                Edit Your Education details
            </Text>
            <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() => {
                    prepend({
                        collegeName: "",
                        degree: "",
                        from: "",
                        to: "",
                        cgpa: "",
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
                        key={item.id}
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
                                    Education {index + 1}
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
                                            errors.education?.[index]
                                                ?.collegeName
                                        }
                                    >
                                        <FormLabel>
                                            University or College{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`education[${index}].collegeName`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "University or College is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Search your University or College"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.education?.[index]
                                            ?.collegeName && (
                                            <Text color="red.500">
                                                {
                                                    errors.education[index]
                                                        .collegeName.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.education?.[index]?.degree
                                        }
                                    >
                                        <FormLabel>
                                            Degree or Specialization{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`education[${index}].degree`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "Degree or Specialization is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    placeholder="Select your Degree or Specialization"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.education?.[index]?.degree && (
                                            <Text color="red.500">
                                                {
                                                    errors.education[index]
                                                        .degree.message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.education?.[index]?.from
                                        }
                                    >
                                        <FormLabel>
                                            From{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`education[${index}].from`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "From date is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    type="date"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.education?.[index]?.from && (
                                            <Text color="red.500">
                                                {
                                                    errors.education[index].from
                                                        .message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.education?.[index]?.to
                                        }
                                    >
                                        <FormLabel>
                                            To{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`education[${index}].to`}
                                            control={control}
                                            rules={{
                                                required: "To date is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    type="date"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.education?.[index]?.to && (
                                            <Text color="red.500">
                                                {
                                                    errors.education[index].to
                                                        .message
                                                }
                                            </Text>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            errors.education?.[index]?.cgpa
                                        }
                                    >
                                        <FormLabel>
                                            CGPA or Percentage{" "}
                                            <Text
                                                as="span"
                                                color="red.500"
                                            >
                                                *
                                            </Text>
                                        </FormLabel>
                                        <Controller
                                            name={`education[${index}].cgpa`}
                                            control={control}
                                            rules={{
                                                required:
                                                    "CGPA or Percentage is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    type="text"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.education?.[index]?.cgpa && (
                                            <Text color="red.500">
                                                {
                                                    errors.education[index].cgpa
                                                        .message
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
                                        <b>University or College:</b>{" "}
                                        {item.collegeName}
                                    </Text>
                                    <Text>
                                        <b>Degree or Specialization:</b>{" "}
                                        {item.degree}
                                    </Text>
                                    <Text>
                                        <b>From:</b>{" "}
                                        {formatDateToDisplay(item.from)}
                                    </Text>
                                    <Text>
                                        <b>To:</b>{" "}
                                        {formatDateToDisplay(item.to)}
                                    </Text>
                                    <Text>
                                        <b>CGPA or Percentage:</b> {item.cgpa}
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

export default EducationForm;
