import React from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import conf from "../../conf/conf.js";

const AchievementsForms = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            achievementDetails: [
                {
                    organization: "",
                    achievement: "",
                    date: "",
                    url: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "achievements",
    });

    const onSubmit = async (data) => {
        // console.log(data.achievements);
        // Handle form submission
        try {
            const response = await fetch(`${conf.backendUser}/addAchievementDetails`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ achievementDetails}),
                }
            );
            if (!response.ok) {
                throw new Error("Achievemetn return errr")
            }
            const data = await response.json();
            if(!data){
                throw new Error("data eror")
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <Box
            maxW="600px"
            mx="auto"
            p={4}
            pb={20}
        >
            <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() =>
                    append({
                        organization: "",
                        achievement: "",
                        date: "",
                        url: "",
                    })
                }
            >
                Add
            </Button>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    Achievement {index + 1}
                                </Text>
                                {fields.length > 1 && (
                                    <IconButton
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        onClick={() => remove(index)}
                                    />
                                )}
                            </HStack>
                            <FormControl
                                isInvalid={
                                    errors.achievements?.[index]?.organization
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
                                    name={`achievements[${index}].organization`}
                                    control={control}
                                    rules={{
                                        required: "Organization is required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="CodeChef, GSOC, Hackathon etc."
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.achievements?.[index]?.organization && (
                                    <Text color="red.500">
                                        {
                                            errors.achievements[index]
                                                .organization.message
                                        }
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl
                                isInvalid={
                                    errors.achievements?.[index]?.achievement
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
                                    name={`achievements[${index}].achievement`}
                                    control={control}
                                    rules={{
                                        required: "Achievement is required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="5 Star Coder, 1st Prize in Hackathon etc."
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.achievements?.[index]?.achievement && (
                                    <Text color="red.500">
                                        {
                                            errors.achievements[index]
                                                .achievement.message
                                        }
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl
                                isInvalid={errors.achievements?.[index]?.date}
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
                                    name={`achievements[${index}].date`}
                                    control={control}
                                    rules={{ required: "Date is required" }}
                                    render={({ field }) => (
                                        <Input
                                            type="date"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.achievements?.[index]?.date && (
                                    <Text color="red.500">
                                        {
                                            errors.achievements[index].date
                                                .message
                                        }
                                    </Text>
                                )}
                            </FormControl>
                            <FormControl
                                isInvalid={errors.achievements?.[index]?.url}
                            >
                                <FormLabel>URL</FormLabel>
                                <Controller
                                    name={`achievements[${index}].url`}
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="CodeChef Profile, Hackathon Project URL etc."
                                            {...field}
                                        />
                                    )}
                                />
                            </FormControl>
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
        </Box>
    );
};

export default AchievementsForms;
