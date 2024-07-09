import { Button, ButtonGroup, Card, CardBody, CardHeader, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useState } from "react";
import { createCustomer, setCustomerAddressLine1, setCustomerAddressLine2, setCustomerCity, setCustomerFirstName, setCustomerLastName, setCustomerPhoneNumber, setCustomerPostCode } from "../../data/reducers/customers.reducer";
import { fetchRoles, fetchToken, register } from "../../data/reducers/user.reducer";

function Register(){
    const dispatch = useAppDispatch();
    const toast = useToast();
    const customerSelector = useAppSelector(x=>x.customers.value.customerUpdateModel);
    const customerErrorSelector = useAppSelector(x=>x.customers.value.error);
    if(!!customerErrorSelector)
    {
        toast({
            title: 'An error occurred',
            description: `${customerErrorSelector}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }

    const handleFirstNameChange = (e: any) => dispatch(setCustomerFirstName(e.target.value));
    const handleLastNameChange = (e: any) => dispatch(setCustomerLastName(e.target.value));
    const handleAdressLine1Change = (e: any) => dispatch(setCustomerAddressLine1(e.target.value));
    const handleAdressLine2Change = (e: any) => dispatch(setCustomerAddressLine2(e.target.value));
    const handleCityChange = (e: any) => dispatch(setCustomerCity(e.target.value));
    const handlePostCodeChange = (e: any) => dispatch(setCustomerPostCode(e.target.value));
    const handleEmailChange = (e: any) => setEmail(e.target.value);
    const handlePhoneNumberChange = (e: any) => dispatch(setCustomerPhoneNumber(e.target.value));
    const handlePasswordChange = (e: any) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: any) => setConfirmPassword(e.target.value);

    const navigate = useNavigate();
    const onSubmit = (e: any) =>{
        if(!isValidForm){
            setTriedToSubmit(true);
            return;
        }
        e.preventDefault();

        dispatch(register({email, password})).then(()=>{
          dispatch(fetchToken({username: email, password}))
          .then(()=>{
            dispatch(createCustomer({
              createModel:{
                  firstName: customerSelector.firstName,
                  phoneNumber: customerSelector.phoneNumber,
                  lastName: customerSelector.lastName,
                  address1Line: customerSelector.address1Line,
                  address2Line: customerSelector.address2Line,
                  city: customerSelector.city,
                  postCode: customerSelector.postCode,
              }
          })).then(()=>{
            dispatch(fetchRoles({})).then(()=>{
              navigate('/');
             window.location.reload();
              toast({
                  title: `Registration Succesfull`,
                  description: '',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
              });
            });
          });
      });  
    });
 }

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const firstNameEmptyMessage = customerSelector.firstName === '' ? 'First Name is required': '';
    const lastNameEmptyMessage = customerSelector.lastName === '' ? 'Last Name is required': '';
    const cityEmptyMessage = customerSelector.city === '' ? 'City is required': '';
    const phoneNumberEmptyMessage = customerSelector.phoneNumber === '' ? 'Phone Number is required': '';
    const addressLine1EmptyMessage = customerSelector.address1Line === '' ? 'Address Line 1 is required': '';
    const postCodeEmptyMessage = customerSelector.postCode === '' ? 'Post Code is required': '';
    const passwordEmptyMessage = password === '' ? 'Password is required': '';
    const confirmPasswordErrorMessage = confirmPassword !== password || confirmPassword === '' ? 'Confirm password and password does not match.' : '';
    const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailErrorMessage = !email.match(emailValidationRegex) ? 'Please enter valid email address': '';

    let [triedToSubmit, setTriedToSubmit] = useState(false);

    const isValidForm = (!firstNameEmptyMessage && !lastNameEmptyMessage &&
     !cityEmptyMessage && !addressLine1EmptyMessage && 
     !postCodeEmptyMessage && !passwordEmptyMessage && !confirmPasswordErrorMessage && ! emailErrorMessage);

const isButtonDisabled = !isValidForm && triedToSubmit;
return (
  <Flex justifyContent='center' flexDirection='row' width='100%'>
  <Card bg='card' w='50%'>
<Button onClick={() => navigate(-1)} w='10%'>Back</Button>
  <CardHeader>
    <Center>
    <Heading size='lg'>Register</Heading>
    </Center>
  </CardHeader>
  <CardBody>
<form>
<Center>
 <VStack>
 <FormControl isInvalid={!!firstNameEmptyMessage && triedToSubmit}>
    <FormLabel>First Name</FormLabel>
    <Input value={customerSelector.firstName} onChange={handleFirstNameChange} placeholder='First Name' />
    {firstNameEmptyMessage && triedToSubmit? (<FormErrorMessage>{firstNameEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!lastNameEmptyMessage && triedToSubmit}>
   <FormLabel>Last Name</FormLabel>
    <Input value={customerSelector.lastName} onChange={handleLastNameChange} placeholder='Last Name' />
    {lastNameEmptyMessage && triedToSubmit? (<FormErrorMessage>{lastNameEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!emailErrorMessage && triedToSubmit}>
   <FormLabel>Email</FormLabel>
    <Input value={email} onChange={handleEmailChange} placeholder='Email' />
    {emailErrorMessage && triedToSubmit? (<FormErrorMessage>{emailErrorMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!phoneNumberEmptyMessage && triedToSubmit}>
   <FormLabel>Phone Number</FormLabel>
    <Input value={customerSelector.phoneNumber} onChange={handlePhoneNumberChange} placeholder='Phone Number' />
    {phoneNumberEmptyMessage && triedToSubmit? (<FormErrorMessage>{phoneNumberEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!addressLine1EmptyMessage && triedToSubmit}>
   <FormLabel>Address (Line 1)</FormLabel>
    <Input value={customerSelector.address1Line} onChange={handleAdressLine1Change} placeholder='Adress Line 1' />
    {addressLine1EmptyMessage && triedToSubmit? (<FormErrorMessage>{addressLine1EmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl>
   <FormLabel>Address (Line 2 Optional)</FormLabel>
    <Input value={customerSelector.address2Line ?? ''} onChange={handleAdressLine2Change} placeholder='Adress Line 2' />
  </FormControl>
  <FormControl isInvalid={!!cityEmptyMessage && triedToSubmit}>
   <FormLabel>City</FormLabel>
    <Input value={customerSelector.city} onChange={handleCityChange} placeholder='City' />
    {cityEmptyMessage && triedToSubmit? (<FormErrorMessage>{cityEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!postCodeEmptyMessage && triedToSubmit}>
   <FormLabel>Post Code</FormLabel>
    <Input value={customerSelector.postCode} onChange={handlePostCodeChange} placeholder='Post Code' />
    {postCodeEmptyMessage && triedToSubmit? (<FormErrorMessage>{postCodeEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!passwordEmptyMessage && triedToSubmit}>
    <FormLabel>Password</FormLabel>
    <Input value={password} onChange={handlePasswordChange} type="password" placeholder='password' />
    {passwordEmptyMessage && triedToSubmit? (<FormErrorMessage>{passwordEmptyMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <FormControl isInvalid={!!confirmPasswordErrorMessage && triedToSubmit}>
    <FormLabel>Confirm Password</FormLabel>
    <Input value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder='Confirm password' />
    {confirmPasswordErrorMessage && triedToSubmit? (<FormErrorMessage>{confirmPasswordErrorMessage}</FormErrorMessage>) : (<></>)}
  </FormControl>
  <ButtonGroup marginTop={5} variant='outline' spacing='6'>
  <Button isDisabled={isButtonDisabled} onClick={onSubmit} colorScheme='blue'>Register</Button>
</ButtonGroup>
 </VStack>
 </Center>
</form>
</CardBody>
</Card>
</Flex>
)
}

export default Register;