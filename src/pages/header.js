import React ,{useState, useEffect}from "react"
// import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/react"
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    HStack,
    SimpleGrid,
    ButtonGroup, Button, Spacer
} from '@chakra-ui/react';
import { FiLogOut } from "react-icons/fi";

function Header() {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('user');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        }
      }, [localStorage]); 

    const handleLogout = () => {
        if(localStorage.getItem('user')){
        localStorage.removeItem('user');
        }
        if(localStorage.getItem('error')){
            localStorage.removeItem('error');
        }
        console.log(1);
        window.location.reload();
      };

    if (localStorage.getItem('user')!==null) {
       
    return (

        <ChakraProvider theme={theme}>

            <SimpleGrid columns={3} spacing={0}>
                <Box bg='black' height=''></Box>
                <Box bg='black' align='center' style={{ padding: "10px" }}> <img src="/images/global-chess-logo.jpg" style={{ height: "100px" }}></img></Box>
                <Box bg='black'>
                    <HStack height="120px" style={{ textAlign: "right" }}>
                        <ButtonGroup>
                            <Button colorScheme='blackAlpha'>{userData.fullname} !</Button>
                            <Button colorScheme='red' onClick={()=>handleLogout()}><FiLogOut style={{ marginRight: "5px" }} /> Logout</Button>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </SimpleGrid>

        </ChakraProvider >
    )
}
else{
    
    return (

        <ChakraProvider theme={theme}>

            <SimpleGrid columns={3} spacing={0}>
                <Box bg='black' height=''></Box>
                <Box bg='black' align='center' style={{ padding: "10px" }}> <img src="/images/global-chess-logo.jpg" style={{ height: "100px" }}></img></Box>
                <Box bg='black'>
                    <HStack height="120px" style={{ textAlign: "right" }}>
                        <ButtonGroup>
                            <Button colorScheme='blackAlpha'>Login !</Button>
                            <Button colorScheme='red'><FiLogOut style={{ marginRight: "5px" }} /> Logout</Button>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </SimpleGrid>

        </ChakraProvider >
    )
}
}


export default Header