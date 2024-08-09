import React, { useEffect } from "react";
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
import { useParams, useNavigate, NavLink } from "react-router-dom";
import MentorBenefits from "../Components/BecomeMentor/MentorBenefits";
import MentorUpdateDetails from "../Components/BecomeMentor/MentorUpdateDetails";
import DetailsSharing from "../Components/BecomeMentor/DetailsSharing";

const StepContent = ({ stepIndex }) => {
    switch (stepIndex) {
        case 0:
            return <MentorBenefits />;
        case 1:
            return <MentorUpdateDetails />;
        case 2:
            return <DetailsSharing/>;
        case 3:
            return <Box p={4}><Text fontSize="xl" mb={4}>Application for become mentor has been submitted </Text><Text>It will take upto 24 hours to verify the provided details <NavLink to={'/feed'}><Text color={'blue.500'}>Go Back</Text></NavLink></Text></Box>;
        default:
            return null;
    }
};

function BecomeMentor() {
    const steps = [
        { title: "Become mentor ", description: "Start your journey as Mentor" },
        { title: "Update Details", description: "Verification" },
        { title: "Details Sharing", description: "" },
        { title: "Verifying", description: "Confirmation" },
    ];

    const { stepIndex } = useParams();
    const navigate = useNavigate();
    const { activeStep, setActiveStep } = useSteps({
        index: Number(stepIndex),
        count: steps.length,
    });

    useEffect(() => {
        setActiveStep(Number(stepIndex));
    }, [stepIndex, setActiveStep]);

    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            navigate(`/become-mentor/${activeStep + 1}`);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            navigate(`/become-mentor/${activeStep - 1}`);
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
                        <StepContent stepIndex={activeStep} />
                        <Flex mt={4} mb={8} justify="space-between" w="100%">
                            <Button
                                onClick={prevStep}
                                isDisabled={activeStep === 0}
                                {... activeStep === 0 ? ({visibility:'hidden'}) :({})}
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={nextStep}
                                isDisabled={(activeStep === steps.length - 1) || (activeStep == 1 && isDisable)}
                                {... (activeStep === steps.length-1 || activeStep ===steps.length-2) ? ({visibility:'hidden'}) :({})}
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
