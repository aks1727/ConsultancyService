import React from "react";
import {
    Box,
    Button,
    Flex,
    SlideFade,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    Text,
    useSteps,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MentorBenefits from "../Components/BecomeMentor/MentorBenefits";
import MentorUpdateDetails from "../Components/BecomeMentor/MentorUpdateDetails";

const StepContent = ({ stepIndex }) => {
    switch (stepIndex) {
        case 0:
            return <MentorBenefits/>;
        case 1:
            return <MentorUpdateDetails/>;
        case 2:
            return <Box p={4}><Text fontSize="xl">Select Rooms Component</Text><Text>Some more information about room selection.</Text></Box>;
        case 3:
            return <Box p={4}><Text fontSize="xl">Confirmation Component</Text><Text>Some more information about the confirmation process.</Text></Box>;
        default:
            return null;
    }
};

function BecomeMentor() {
    const steps = [
        { title: "Become mentor ", description: "Start your journey as Mentor" },
        { title: "Update Details", description: "Verification" },
        { title: "Third", description: "tmp" },
        { title: "Fourth", description: "Confirmation" },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });


    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const showStepper = useBreakpointValue({ base: false, md: true });

    const isDisable = useSelector(state => state.disableNext.disableNext);

    return (
        <Box p={8}>
            {showStepper && (
                <Stepper index={activeStep} mb={8}>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription color="blue.500">{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
            )}

            <Box>
                <SlideFade key={activeStep} in={true}>
                    <VStack spacing={4}>
                        <StepContent stepIndex={activeStep}/>
                        <Flex mt={4} mb={8} justify="space-between" w="100%">
                            <Button
                                onClick={prevStep}
                                isDisabled={activeStep === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={nextStep}
                                isDisabled={(activeStep === steps.length - 1) || (activeStep==1 && isDisable) }
                            >
                                Next
                            </Button>
                        </Flex>
                    </VStack>
                </SlideFade>
            </Box>
        </Box>
    );
}

export default BecomeMentor;
