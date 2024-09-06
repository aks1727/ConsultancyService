import React from 'react';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button, 
    Text, 
    useDisclosure, 
    useColorModeValue 
} from '@chakra-ui/react';

const AlertModal = ({ isOpen, onClose, message, onConfirm }) => {
    // Define color schemes for light/dark mode
    const headerBg = useColorModeValue("teal.400", "teal.600");
    const bodyBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.800", "gray.200");

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent 
                bg={bodyBg} 
                borderRadius="xl" 
                shadow="2xl" 
                transition="all 0.3s ease"
            >
                <ModalHeader 
                    bgGradient="linear(to-r, teal.500, blue.400)" 
                    color="white" 
                    borderTopRadius="xl" 
                    textAlign="center"
                    fontSize="xl"
                    fontWeight="bold"
                >
                    Alert
                </ModalHeader>
                <ModalCloseButton 
                    color="white" 
                    _hover={{ transform: 'scale(1.1)' }} 
                    transition="all 0.2s ease"
                />
                <ModalBody textAlign="center" bg={bodyBg} py={6}>
                    <Text fontSize="lg" color={textColor}>
                        {message}
                    </Text>
                </ModalBody>
                <ModalFooter 
                    bg={useColorModeValue("gray.50", "gray.800")} 
                    borderBottomRadius="xl"
                >
                    <Button 
                        colorScheme="teal" 
                        mr={3} 
                        onClick={onConfirm} 
                        _hover={{ bgGradient: 'linear(to-r, teal.500, blue.400)' }}
                        transition="all 0.3s ease"
                    >
                        OK
                    </Button>
                    <Button 
                        variant="ghost" 
                        onClick={onClose} 
                        _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
                        transition="all 0.3s ease"
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AlertModal;
