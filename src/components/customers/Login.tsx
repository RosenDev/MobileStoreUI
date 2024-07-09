import { Button, ButtonGroup, Card, CardBody, CardHeader, Center, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { fetchRoles, fetchToken } from "../../data/reducers/user.reducer";
import { useNavigate } from "react-router-dom";
import { usersApi } from "../../data/api/users.api";

function Login(){

  const [show, setShow] = React.useState(false);
  const showPassword = () => setShow(!show);

  const [username, setUsername] = useState('');

  const handleUsernameChange = (e: any) => setUsername(e.target.value);

  const isUsernameInvalid = username === '';

  const [password, setPassword] = useState('');
  
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const isPasswordInvalid = password === '';
  let [triedToSubmit, setTriedToSubmit] = useState(false);
  const isValidForm = (!isUsernameInvalid && !isPasswordInvalid);

const isButtonDisabled = !isValidForm && triedToSubmit;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = () =>{
    if(!isValidForm){
      setTriedToSubmit(true);
      return;
    }
    dispatch(fetchToken({username: username, password: password}))
    .then(()=>{
      if(usersApi.isLoggedIn()){
        dispatch(fetchRoles({})).then(()=>{
          navigate("/");
          window.location.reload();
        });
      }else{
        setError("Invalid username or password")
      }
    });
  }

  const [error, setError] = useState('');

  const toast = useToast();
useEffect(()=>{
  if(error){
    toast({
      title: 'An error occurred',
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
},[error, toast])


return (
  <Flex justifyContent='center' flexDirection='row' width='100%'>
  <Card bg='card' w='50%'>
  <CardHeader>
    <Center>
    <Heading size='lg'>Login</Heading>
    </Center>
  </CardHeader>
  <CardBody>
  <form>
  <Center>
 <VStack>
 <FormControl isInvalid={isUsernameInvalid && triedToSubmit} isRequired>
    <FormLabel>Username</FormLabel>
    <Input placeholder='username' value={username} onChange={handleUsernameChange} />
  </FormControl>
  <FormControl isInvalid={isPasswordInvalid && triedToSubmit} isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup size='md'>
      <Input pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={password} 
        onChange={handlePasswordChange}/>

      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={showPassword}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
      </InputGroup>
  </FormControl>
  <ButtonGroup marginTop={5} variant='outline' spacing='6'>
  <Button isDisabled={isButtonDisabled} colorScheme='blue' onClick={onSubmit} >Login</Button>
</ButtonGroup>
 </VStack>
 </Center>
  </form>
</CardBody>
</Card>
</Flex>
)
}

export default Login;