import React,{ useState,useEffect } from "react"
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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import Header from "./header";
import Footer from "./footer";
import { FiLock, FiLogIn, FiChevronLeft } from "react-icons/fi";

function Dashboard() {
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
    
    const [approveIsOpen, setApproveIsOpen] = useState(false);
    const [rejectIsOpen, setRejectIsOpen] = useState(false);
    const cancelRef = React.useRef()
    const toast = useToast()
    const [contractList, setContractList] = useState([]);
    const [showApproveReject, setShowApproveReject]= useState(false);
    const [userRole, setUserRole] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);   
    const [showErrorMessage, setShowErrorMessage] = useState(false); 
    const [data, setData] =useState({});
    const [fullname, setFullname] = useState('');
    const currentDate = new Date().toLocaleDateString('en-GB');
    const [comment, setComment] = useState('');
    const [fileURL, setFileURL] = useState('');
    useEffect(() => {
        // Retrieve data from localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const parsedData = JSON.parse(storedUser);
          
          setUserRole(parsedData.role);
          if(parsedData.role === 'user'||parsedData.role==='pmo'){
          
            setShowApproveReject(false);
          }else if(parsedData.role==='admin'){
            
            setShowApproveReject(true);
          }
           
        }
      }, [localStorage]);

    useEffect(() => {
        fetch('/contractList')
          .then((response) => response.json())
          .then((data) => {setContractList(data); console.log(data)})
          .catch((error) => console.error('Error fetching dropdown options:', error));
      }, []);
      useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('user');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFullname(parsedData.fullname);
         
        }
      }, [localStorage]); 
    const initialFocusRef = React.useRef()
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
     const popUpStyle= {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '559px',
        marginTop: '207px',
     };
     const onHandleApprove = (item) => {
        localStorage.setItem('data',JSON.stringify(item));
        console.log(JSON.parse(localStorage.getItem('data')));
        setApproveIsOpen(true);
      };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }; 
    const handleViewFile = async (item) => {
        const filePath = item.contractFile;
        window.open('/uploads/'+filePath, '_blank');
       
      };
    const handleApproveSubmit =  async () => {
        
        const localData =JSON.parse(localStorage.getItem('data'));
        console.log(localData);
         // Create a FormData object to store the form data
        const request ={
            "contractId" : localData.contractID,
            "contractType": localData.contractType,
            "status": "approved",
            "actionBy": fullname,
            "comment": "approved",
        };
        console.log(JSON.stringify(request));
    // Call the API to upload the file and submit the form data
    const response = await fetch('/updateContractStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
   
    const data =  response.json();
    if (response.status===200) {
        
        setShowSuccessMessage(true);
        setApproveIsOpen(false);
        setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        localStorage.removeItem('data');
        window.location.reload();
        
      } else if (response.status === 401) {
        setShowErrorMessage(true);
        setApproveIsOpen(false);
        localStorage.removeItem('data');
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
      } else {
        // Handle other response statuses as needed
        setShowErrorMessage(true);
        setApproveIsOpen(false);
        localStorage.removeItem('data');
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
      }
    
  };
  const handleApproveCancelSubmit = () => {
    localStorage.removeItem('data');
    setApproveIsOpen(false);
  };
  
   const onHandleReject = (item) => {
    localStorage.setItem('data',JSON.stringify(item));
     console.log(JSON.parse(localStorage.getItem('data')));
        setRejectIsOpen(true);
      };
   const handleRejectSubmit =  async () => {
    
         // Create a FormData object to store the form data
    
     const localData =JSON.parse(localStorage.getItem('data'));
        console.log(localData);
         // Create a FormData object to store the form data
        const request ={
            "contractId" : localData.contractID,
            "contractType": localData.contractType,
            "status": "rejected",
            "actionBy": fullname,
            "comment": comment,
        };
    try {
    // Call the API to upload the file and submit the form data
    const response = await fetch('/updateContractStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
    const data =  response.json();
    if (response.status===200) {
        
        setShowSuccessMessage(true);
        setRejectIsOpen(false);
        setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        setComment('');
          localStorage.removeItem('data');
          window.location.reload();
        
      } else if (response.status === 401) {
        setShowErrorMessage(true);
        setRejectIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
          setComment('');
          localStorage.removeItem('data');
      } else {
        // Handle other response statuses as needed
        setShowErrorMessage(true);
        setRejectIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
          setComment('');
          localStorage.removeItem('data');
      }
    } catch (error) {
        setShowErrorMessage(true);
        setRejectIsOpen(false);
        setTimeout(() => {
            setShowErrorMessage(false);
          }, 3000);
          setComment('');
          localStorage.removeItem('data');
    }
  };
  const handleRejectCancelSubmit = () => {
    localStorage.removeItem('data');
    setComment('');
    setRejectIsOpen(false);
  };
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
                    <Box p='0' align="center" style={{ fontSize: "30px", fontWeight: "800" }}>All Contracts</Box>
                </GridItem>
            </SimpleGrid>
            {showSuccessMessage && <div className="success-message" style={successMessageStyle}>Submitted successfully!</div>}
            {showErrorMessage && <div className="error-message" style={errorMessageStyle}>Error Occured Please Try Again!</div>}
            <SimpleGrid columns={1} spacing={5} mb={20}>
                {/* <Box></Box> */}
                <GridItem colSpan="1">
                    <SimpleGrid columns={1} spacing={5}>
                        <Box p='10' align="center">

                            <Card maxW='100%' boxShadow={'2xl'}
                                rounded={'md'}>


                                <CardBody p={5}>
                                    <Stack spacing={2}>
                                        <TableContainer>
                                            <Table variant='simple'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Contract Name</Th>
                                                        <Th>Contract With</Th>
                                                        <Th>Status</Th>
                                                        <Th>Uploaded By</Th>
                                                        <Th>Date Added</Th>
                                                        <Th>Contract File</Th>
                                                        <Th>Action</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                {contractList.map((item) => (
                                                    <Tr key={item._id}>
                                                        <Td>
                                                            {item.contractType === 'Team' && item.teamName}
                                                            {item.contractType === 'Vendor' && item.vendorName}
                                                            {item.contractType === 'Sponser' && item.sponserName}
                                                            {item.contractType === 'Player' && item.playerName}
                                                        </Td>
                                                        <Td>{item.contractWith}</Td>
                                                        {item.status === 'approved' ? (
                                                        <Td><Badge colorScheme='green'>Approved</Badge>
                                                            <br />
                                                            <small>Approved By: <b>{item.actionBy}</b></small>
                                                            </Td>
                                                        ): item.status === 'pending' ?(  
                                                        <Td><Badge colorScheme='blue'>Pending</Badge>
                                                        </Td>
                                                        ): item.status === 'rejected' ?(
                                                            <Td><Badge colorScheme='red'>Rejected</Badge>
                                                            <br />
                                                            <small>Rejected By: <b>{item.actionBy}</b></small>
                                                            <br />
                                                            <small>Comments: <b>{item.comment}</b></small>
                                                            </Td>
                                                        ):(<Td></Td>
                                                        )}
                                                        <Td>{item.uploadedBy}</Td>
                                                        <Td>{item.recordDate}</Td>
                                                        <Td>
                                                            <Button variant='solid' size="xs" colorScheme='blue' onClick={()=>{handleViewFile(item)}}>
                                                                View File
                                                            </Button>
                                                        </Td>
                                                        {item.status === 'pending' && showApproveReject ?(
                                                           <Td>
                                                       
                                                            <ButtonGroup spacing='2' width="100%">
                                                                <Button onClick={()=>onHandleApprove(item)} variant='solid' size="xs" colorScheme='green'>
                                                                    Approve
                                                                </Button>
                                                               
                                                                <Button variant='solid' size="xs" colorScheme='red' onClick={()=>onHandleReject(item)}> 
                                                                            Reject
                                                                </Button>
                                                                
                                                                 </ButtonGroup>                                                        </Td>
                                                        ):(
                                                            <Td></Td>
                                                        )}
                                                    </Tr>
                                                   
                                                    ))}
                                                </Tbody>
                                                <Tfoot>
                                                </Tfoot>
                                            </Table>
                                        </TableContainer>
                                    </Stack>
                                </CardBody>

                            </Card>

                        </Box>
                    </SimpleGrid>
                </GridItem>
                {/* <Box></Box> */}
            </SimpleGrid>

            <Footer />

            {approveIsOpen && (
            <AlertDialog
                isOpen={approveIsOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Confirm
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button  onClick={handleApproveCancelSubmit}>
                                Cancel
                            </Button>
                            <Button bgGradient="linear(to-r, red.400,pink.400)"
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}
                                color={'white'}
                                rounded={'md'} onClick={()=>handleApproveSubmit()} ml={3}>
                                Proceed
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            )}

            {rejectIsOpen &&(
            <div style={popUpStyle}>   
            <Popover isOpen={rejectIsOpen} className="popup"  onClose={handleRejectCancelSubmit}>
            <PopoverContent  color='white' bg='blue.800' borderColor='blue.800'>
            <PopoverHeader pt={4} fontWeight='bold' border='0'>
            Reason
            </PopoverHeader>
            <PopoverArrow bg='blue.800' />
            <PopoverCloseButton />
            <PopoverBody>
            <FormControl id="comment">
            <FormLabel style={{ fontSize: "13px" }}>Enter Reject Reason</FormLabel>
            <Input style={{ borderColor: "rgba(255,255,255,0.3)" }} type="text" value={comment} onChange={handleCommentChange}/>
            </FormControl>
            </PopoverBody>
            <PopoverFooter
                border='0'
                display='flex'
                alignItems='center'
                 justifyContent='space-between'
                pb={4}
            >
            <ButtonGroup size='sm'>
            <Button colorScheme='red' onClick={handleRejectSubmit}>Confirm Reject</Button>
            <Button colorScheme='default' onClick={handleRejectCancelSubmit}>Cancel</Button>

            </ButtonGroup>
            </PopoverFooter>
             </PopoverContent>
            </Popover>
            </div>
        )}

        </ChakraProvider >
    )
}

export default Dashboard