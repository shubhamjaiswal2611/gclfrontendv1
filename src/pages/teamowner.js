import React,{ useState, useEffect } from "react"

// import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/react"
import {
    ChakraProvider,
    useDisclosure,
    Box,
    Text,
    Link,
    Card,
    CardBody,
    Stack,
    Heading,
    Divider,
    CardFooter,
    VStack,
    Code,
    Grid,
    theme,
    HStack,
    SimpleGrid,
    ButtonGroup, Button, Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    GridItem,
    extendTheme,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useToast,
    Select
} from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import Header from "./header";
import Footer from "./footer";
import { FiLock, FiLogIn, FiChevronLeft } from "react-icons/fi";

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = React.useRef()
    const toast = useToast()
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [contractName, setContractName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fullname, setFullname] = useState('');
    const currentDate = new Date().toLocaleDateString('en-GB');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);   
    const [showErrorMessage, setShowErrorMessage] = useState(false);    
    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('user');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFullname(parsedData.fullname);
         
        }
      }, [localStorage]); 
    
    const successMessageStyle = { 
        padding: '10px',
        backgroundColor: '#5cb85c',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '5px',
        transition: 'opacity 0.3s ease-in-out',
        textAlign: 'center',
     };
     const errorMessageStyle = { 
        padding: '10px',
        backgroundColor: 'red',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '5px',
        transition: 'opacity 0.3s ease-in-out',
        textAlign: 'center',
     };
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
     }; 

    const handleContractNameChange = (event) => {
        setContractName(event.target.value);
      }; 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };
    const onHandleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(true);
      };
    const handleSubmit =  async (event) => {
        event.preventDefault();
         // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('teamName', selectedValue);
    formData.append('contractWith', contractName);
    formData.append('uploadedBy', fullname);
    formData.append('contractType', 'Team');
    formData.append('recordDate', currentDate);
    formData.append('status', 'pending');

    try {
    // Call the API to upload the file and submit the form data
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    const data =  response.json();
    if (response.status===200) {
        
        setContractName('');
        setSelectedFile(null);
        setSelectedValue('');
        setShowSuccessMessage(true);
        setIsOpen(false);
        setTimeout(() => {
            setShowSuccessMessage(false);
          }, 50000);
        
        
      } else if (response.status === 401) {
        setContractName('');
        setSelectedFile(null);
        setSelectedValue('');
        setShowErrorMessage(true);
        setIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 40000);
        
      } else {
        // Handle other response statuses as needed
        setContractName('');
        setSelectedFile(null);
        setSelectedValue('');
        setShowErrorMessage(true);
        setIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 40000);
        
      }
    } catch (error) {
        setContractName('');
        setSelectedFile(null);
        setSelectedValue('');
        setShowErrorMessage(true);
        setIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 40000);
    }
  };
  const handleViewFile = async () => {
    window.open('/downloads/sample_document.pdf', '_blank');
   
  };
  const handleCancelSubmit = () => {
    setIsOpen(false);
  };
    const theme = extendTheme({
        components: {
            Modal: {
                baseStyle: (props) => ({
                    dialog: {
                        bg: "#2D3748"
                    },
                    header: {
                        color: "#fff"
                    },
                    closeButton: {
                        color: "#fff"
                    },
                    body: {
                        color: "#CBD5E0"
                    }
                })
            }
        }
    });
   
    useEffect(() => {
        fetch('/getTeamsList')
          .then((response) => response.json())
          .then((data) => setOptions(data))
          .catch((error) => console.error('Error fetching dropdown options:', error));
      }, []);
    

    return (
        

        <ChakraProvider theme={theme}>

            <Header />

            <SimpleGrid columns={6} spacing={0} p='10'>

                <GridItem colSpan="1">
                    <ButtonGroup>
                        <Link href="/">
                            <Button variant='solid' width="100%" colorScheme='gray' mt={2} rounded={'xl'}>
                                <FiChevronLeft /> Back
                            </Button>
                        </Link>
                    </ButtonGroup>
                </GridItem>
                <GridItem colSpan="4">
                    <Box p='0' align="center" style={{ fontSize: "15px", fontWeight: "500" }}>Define Contract</Box>
                    <Box p='0' align="center" style={{ fontSize: "30px", fontWeight: "800" }}>Team Owner</Box>
                </GridItem>
            </SimpleGrid>
            {showSuccessMessage && <div className="success-message" style={successMessageStyle}>Submitted successfully!</div>}
            {showErrorMessage && <div className="error-message" style={errorMessageStyle}>Error Occured Please Try Again!</div>}

            <SimpleGrid columns={6} spacing={5} mb={20}>
                <Box></Box>
                <GridItem colSpan="4">
                    <SimpleGrid columns={1} spacing={5}>
                        <Box p='10' align="center">

                            <Card maxW='lg' boxShadow={'2xl'}
                                rounded={'md'}>


                                <CardBody>
                                    <ButtonGroup spacing='2'>
                                        <Link href="#" >
                                            <Button variant='solid' size={'xs'} w={'full'}
                                                bg={'gray.400'}
                                                color={'white'}
                                                rounded={'xl'}
                                                _hover={{
                                                    bg: 'gray.500',
                                                }}
                                                _focus={{
                                                    bg: 'gray.500',
                                                }} onClick={handleViewFile}>
                                                Click Here to Download Sample Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </CardBody>

                                <Divider color="#ddd" />
                                <CardBody p={10}>
                                    <Stack spacing={4}>
                                        <FormControl id="file">
                                            <FormLabel>Select Contract File</FormLabel>
                                            <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                                        </FormControl>
                                        <FormControl id="selectedValue">
                                            <FormLabel>Team Name</FormLabel>
                                            <Select placeholder='Select Team Name' value={selectedValue} onChange={handleChange}>
                                            {options.map((option) => (
                                                <option key={option} value={option}>
                                                {option}
                                                </option>
                                            ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl id="contractName">
                                            <FormLabel>Contract With</FormLabel>
                                            <Input type="text" value={contractName} onChange={handleContractNameChange}/>
                                        </FormControl>
                                        <FormControl id="fullname">
                                            <FormLabel>Uploaded By</FormLabel>
                                            <Input type="text" variant='filled' value={fullname} disabled/>
                                        </FormControl>
                                    </Stack>
                                </CardBody>
                                <Divider color="#ddd" />
                                <CardBody>
                                    <ButtonGroup spacing='2'>
                                        <Link onClick={onHandleSubmit} >
                                            <Button variant='solid' w={'full'}
                                                bgGradient="linear(to-r, red.400,pink.400)"
                                                _hover={{
                                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                                    boxShadow: 'xl',
                                                }}
                                                color={'white'}
                                                rounded={'md'}
                                            >
                                                Upload Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>

                        </Box>
                    </SimpleGrid>
                </GridItem>
                <Box></Box>
                
            </SimpleGrid>

            <Footer />

            {isOpen && (
            <AlertDialog
                isOpen={isOpen}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Confirm
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={handleCancelSubmit}>
                                Cancel
                            </Button>
                            <Button bgGradient="linear(to-r, red.400,pink.400)"
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}
                                color={'white'}
                                rounded={'md'} ml={3}  onClick={handleSubmit}>
                                Proceed
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

)}
 
        </ChakraProvider >
    )
}

export default Dashboard