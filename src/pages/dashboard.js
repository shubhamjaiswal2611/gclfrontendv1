import React, { useState,useEffect } from "react"
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
    Select,
    GridItem,
    extendTheme,
    useToast,
} from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";
import Header from "./header";
import Footer from "./footer";
import { FiLock, FiLogIn } from "react-icons/fi";

const Dashboard=({ handleLogin },{user})=> {
    const toast = useToast()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError]= useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [storedData, setStoredData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [showDefineContract, setShowDefineContract]= useState(false);
    
    useEffect(() => {
        // Retrieve data from localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const parsedData = JSON.parse(storedUser);
          
          setUserRole(parsedData.role);
          if(parsedData.role === 'user'){
          
            setShowDefineContract(false);
          }else if(parsedData.role==='admin'||parsedData.role==='pmo'){
            
            setShowDefineContract(true);
          }
           
        }
      }, [localStorage]);

    useEffect(() => {
        const data = localStorage.getItem('user');
        setStoredData(data);
      }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
      };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
      };

    const handleRetryLogin = () => {
        setError(false);
      };
    
    const handleSubmit =  async (e) => {
        e.preventDefault();
       const success = await handleLogin(username, password, role);

      if(localStorage.getItem('user')!==null){
            setLoggedIn(true);
            setIsOpen(false); 
            window.location.reload();
         }else{
            setLoggedIn(false);
            setIsOpen(true);
            setError(JSON.parse(localStorage.getItem('error')));
            console.log(localStorage.getItem('error'))
        }
      };

      const handleCloseModal = () => {
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
    


    return (

        <ChakraProvider theme={theme}>

            <Header user={user}/>

            <SimpleGrid columns={1} spacing={10}>
                <Box p='10' align="center" style={{ fontSize: "30px", fontWeight: "800" }}>Select Contract Category</Box>
            </SimpleGrid>

            <SimpleGrid columns={8} spacing={1} mb={20}>
                <Box></Box>
                <GridItem colSpan="6">
                    <SimpleGrid columns={4} spacing={2}>
                        <Box p='5' align="center">

                            <Card maxW='sm' boxShadow={'2xl'}
                                rounded={'md'}
                                _hover={{
                                    boxShadow: '0 25px 150px -12px rgba(0,0,0,0.35)',
                                    // filter: 'blur(20px)',
                                    transition: 'all .3s ease',
                                }}>
                                <CardBody>
                                    <img
                                        src='/images/teamowner.png'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md' style={{ fontWeight: "500", fontFamily: "Poppins", color: "#000" }}>TEAM OWNER</Heading>
                                    </Stack>
                                </CardBody>
                                <Divider color="#ddd" />
                                <CardBody>
                                    {storedData && showDefineContract && (
                                    <ButtonGroup spacing='2' width="100%">
                                        <Link href="/teamowner" width="100%">
                                            <Button variant='solid' width="100%" w={'full'}
                                                bg={'green.400'}
                                                color={'white'}
                                                rounded={'xl'}
                                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                                _hover={{
                                                    bg: 'green.500',
                                                }}
                                                _focus={{
                                                    bg: 'green.500',
                                                }}>
                                                Define Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                     )}
                                    <ButtonGroup spacing='2' mt={2} width="100%">
                                        <Link href="/teamownercontract" width="100%">
                                            <Button variant='solid' width="100%" colorScheme='gray' mt={2} rounded={'xl'}>
                                                View Contracts
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>

                        </Box>
                        <Box p='5' align="center">

                            <Card maxW='sm' boxShadow={'2xl'}
                                rounded={'md'}
                                _hover={{
                                    boxShadow: '0 25px 150px -12px rgba(0,0,0,0.35)',
                                    // filter: 'blur(20px)',
                                    transition: 'all .3s ease',
                                }}>
                                <CardBody>
                                    <img
                                        src='/images/team.png'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md' style={{ fontWeight: "500", fontFamily: "Poppins", color: "#000" }}>
                                            PLAYER</Heading>
                                    </Stack>
                                </CardBody>
                                <Divider color="#ddd" />
                                <CardBody>
                                {storedData && showDefineContract && (
                                    <ButtonGroup spacing='2' width="100%">
                                        <Link href="/player" width="100%">
                                            <Button variant='solid' width="100%" w={'full'}
                                                bg={'green.400'}
                                                color={'white'}
                                                rounded={'xl'}
                                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                                _hover={{
                                                    bg: 'green.500',
                                                }}
                                                _focus={{
                                                    bg: 'green.500',
                                                }}>
                                                Define Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                )}
                                    <ButtonGroup spacing='2' mt={2} width="100%">
                                        <Link href="/teamownercontract" width="100%">
                                            <Button variant='solid' width="100%" colorScheme='gray' mt={2} rounded={'xl'}>
                                                View Contracts
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>
                        </Box>
                        <Box p='5' align="center">


                            <Card maxW='sm' boxShadow={'2xl'}
                                rounded={'md'}
                                _hover={{
                                    boxShadow: '0 25px 150px -12px rgba(0,0,0,0.35)',
                                    // filter: 'blur(20px)',
                                    transition: 'all .3s ease',
                                    _after: {
                                        transition: 'all .3s ease',
                                    },
                                }}>
                                <CardBody>
                                    <img
                                        src='/images/fund.png'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md' style={{ fontWeight: "500", fontFamily: "Poppins", color: "#000" }}>
                                            SPONSORS</Heading>
                                    </Stack>
                                </CardBody>
                                <Divider color="#ddd" />
                                <CardBody>
                                {storedData && showDefineContract && (
                                    <ButtonGroup spacing='2' width="100%">
                                        <Link href="/sponsors" width="100%">
                                            <Button variant='solid' width="100%"
                                                w={'full'}
                                                bg={'green.400'}
                                                color={'white'}
                                                rounded={'xl'}
                                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                                _hover={{
                                                    bg: 'green.500',
                                                }}
                                                _focus={{
                                                    bg: 'green.500',
                                                }}>
                                                Define Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                )}
                                    <ButtonGroup spacing='2' mt={2} width="100%">
                                        <Link href="/teamownercontract" width="100%">
                                            <Button variant='solid' width="100%" colorScheme='gray' mt={2} rounded={'xl'}>
                                                View Contracts
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>

                        </Box>

                        <Box p='5' align="center">


                            <Card maxW='sm' boxShadow={'2xl'}
                                rounded={'md'}
                                _hover={{
                                    boxShadow: '0 25px 150px -12px rgba(0,0,0,0.35)',
                                    // filter: 'blur(20px)',
                                    transition: 'all .3s ease',
                                    _after: {
                                        transition: 'all .3s ease',
                                    },
                                }}>
                                <CardBody>
                                    <img
                                        src='/images/vendor.png'
                                    />
                                    <Stack mt='6' spacing='3'>
                                        <Heading size='md' style={{ fontWeight: "500", fontFamily: "Poppins", color: "#000" }}>
                                            VENDORS</Heading>
                                    </Stack>
                                </CardBody>
                                <Divider color="#ddd" />
                                <CardBody>
                                {storedData && showDefineContract && (
                                    <ButtonGroup spacing='2' width="100%">
                                        <Link href="/vendor" width="100%">
                                            <Button variant='solid' width="100%"
                                                w={'full'}
                                                bg={'green.400'}
                                                color={'white'}
                                                rounded={'xl'}
                                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                                _hover={{
                                                    bg: 'green.500',
                                                }}
                                                _focus={{
                                                    bg: 'green.500',
                                                }}>
                                                Define Contract
                                            </Button>
                                        </Link>
                                    </ButtonGroup>
                                )}
                                    <ButtonGroup spacing='2' mt={2} width="100%">
                                        <Link href="/teamownercontract" width="100%">
                                            <Button variant='solid' width="100%" colorScheme='gray' mt={2} rounded={'xl'}>
                                                View Contracts
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
            {storedData===null && (
            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                
            >
                <ModalOverlay />
                <ModalContent boxShadow='dark-lg'>
                    <ModalHeader>Login to your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box p={5} style={{}} align="center">
                            <FiLock size={100} color="#CBD5E0" />
                        </Box>
                        {error ? (
                <div>
                  <span style={{ color: 'red' }}>Authentication failed. Please try again.</span>
                  <Button colorScheme="blue" onClick={handleRetryLogin}>
                    Retry
                  </Button>
                </div>
                          )   : (
                            <div>
                        <FormControl >
                            <FormLabel>Username</FormLabel>
                            <Input className="mb-3" placeholder='Username' value={username} onChange={handleUsernameChange} style={{ borderColor: "rgba(255,255,255,0.3)" }} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input className="mb-3" type="password" placeholder='Password' value={password} onChange={handlePasswordChange} style={{ borderColor: "rgba(255,255,255,0.3)" }} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>User Role</FormLabel>
                            <Select className="mb-3" placeholder='Select Role' style={{ borderColor: "rgba(255,255,255,0.3)" }} value={role} onChange={handleRoleChange}>
                                <option value='user'>View Only</option>
                                <option value='pmo'>PMO</option>
                                <option value='admin'>GCL</option>
                            </Select>
                        </FormControl>

                        <Button colorScheme='green'
                            bg={'green.400'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{
                                bg: 'green.500',
                            }}
                            _focus={{
                                bg: 'green.500',
                            }} onClick={handleSubmit} style={{marginTop: '30px',marginLeft: '150px'}}> 
                            <FiLogIn style={{ marginRight: "10px" }} /> Login
                        </Button>

                        </div>
                          )}
                    </ModalBody>

                    <ModalFooter>
                                            
                    </ModalFooter>
                </ModalContent>
            </Modal>
            )}
        </ChakraProvider >
    )
                        }

export default Dashboard