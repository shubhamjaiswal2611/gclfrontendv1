import React,{useState} from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import AllRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App=() => {

  const [user, setUser] = useState('');
  
  const handleLogin = async (username, password,role) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password,role }),
      });

      const data = await response.json();

      if (response.status===200) {
        setUser(data.username);
        localStorage.setItem('user',JSON.stringify(data));
        if(localStorage.getItem('error')!==null){
          localStorage.removeItem('error');
        }
        
      } else if (response.status === 401) {
        // Authentication failed
        localStorage.setItem('error',JSON.stringify(data));
      } else {
        // Handle other response statuses as needed
        localStorage.setItem('error',JSON.stringify(data));
      }
    } catch (error) {
      localStorage.setItem('error',"Unexpected Error Occured");
    }
  };
  


  return (
    <BrowserRouter>

      <AllRoutes handleLogin={handleLogin} user={user} />

    </BrowserRouter>
  );
}

export default App;
