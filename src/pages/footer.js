import React from "react"
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

function Footer() {
    return (

        <ChakraProvider theme={theme}>

            <SimpleGrid columns={1} spacing={0}>

                <Box bg='' align='center' style={{ padding: "10px" }}>
                    &copy; 2023 Tech Mahindra Ltd
                </Box>

            </SimpleGrid>

        </ChakraProvider >
    )
}

export default Footer