import {Text, Flex, Card, Button, CardHeader, Center, Heading, CardBody, VStack, Input, useToast, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../data/store";
import { deleteCustomer, setCustomerAddressLine1, setCustomerAddressLine2, setCustomerCity, setCustomerFirstName, setCustomerLastName, setCustomerPhoneNumber, setCustomerPostCode, updateCustomer } from "../../data/reducers/customers.reducer";
import { logout } from "../../data/reducers/user.reducer";
import { useState } from "react";
import React from "react";

function ManagePersonalData(){
const navigate = useNavigate();
const toast = useToast();
const dispatch = useAppDispatch();
const { isOpen, onOpen, onClose } = useDisclosure()
const cancelRef = React.useRef(null) 
const customerInfo = useAppSelector(x=>x.customers.value.customerUpdateModel);
const onDeleteAccount = () =>{
dispatch(deleteCustomer({})).then(()=>{
    dispatch(logout())
        toast({
            title: 'Success',
            description: `Your data was deleted successfully`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/login');
          window.location.reload();
});
}

const onSaveChanges = () => {
if(!isValidForm){
    setTriedToSubmit(true);
    return;
}

dispatch(updateCustomer({updateModel:{
id: customerInfo.id,
firstName: customerInfo.firstName,
lastName: customerInfo.lastName,
phoneNumber: customerInfo.phoneNumber,
city: customerInfo.city,
address1Line: customerInfo.address1Line,
address2Line: customerInfo.address2Line,
postCode: customerInfo.postCode
}})).then(()=>{
    toast({
        title: 'Success',
        description: `Your data was updated successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    navigate('/');
});
}
const firstNameEmptyMessage = customerInfo.firstName === '' ? 'First Name is required': '';
const lastNameEmptyMessage = customerInfo.lastName === '' ? 'Last Name is required': '';
const cityEmptyMessage = customerInfo.city === '' ? 'City is required': '';
const addressLine1EmptyMessage = customerInfo.address1Line === '' ? 'Address Line 1 is required': '';
const postCodeEmptyMessage = customerInfo.postCode === '' ? 'Post Code is required': '';
const handleFirstNameChange = (e: any) => dispatch(setCustomerFirstName(e.target.value));
const handleLastNameChange = (e: any) => dispatch(setCustomerLastName(e.target.value));
const handleAdressLine1Change = (e: any) => dispatch(setCustomerAddressLine1(e.target.value));
const handleAdressLine2Change = (e: any) => dispatch(setCustomerAddressLine2(e.target.value));
const handleCityChange = (e: any) => dispatch(setCustomerCity(e.target.value));
const handlePostCodeChange = (e: any) => dispatch(setCustomerPostCode(e.target.value));
const handlePhoneNumberChange = (e: any) => dispatch(setCustomerPhoneNumber(e.target.value));


let [triedToSubmit, setTriedToSubmit] = useState(false);

const isValidForm = (!firstNameEmptyMessage && !lastNameEmptyMessage &&
 !cityEmptyMessage && !addressLine1EmptyMessage && 
 !postCodeEmptyMessage);

 const isButtonDisabled = !isValidForm && triedToSubmit;
return(
    <Flex justifyContent='center' flexDirection='row' width='100%'>
    <Card bg='card' w='50%'>
      <Button onClick={()=>navigate(-1)} w='10%'>Back</Button>
    <CardHeader>
    <Center>
      <Heading size='lg'>Personal Information</Heading>
      </Center>
    </CardHeader>
    <CardBody>
   <VStack>

<Text>First Name</Text> 
<Input onChange={handleFirstNameChange} value={customerInfo.firstName}></Input>
<Text>Last Name</Text> 
<Input onChange={handleLastNameChange} value={customerInfo.lastName}></Input>
<Text>Address Line 1</Text> 
<Input onChange={handleAdressLine1Change} value={customerInfo.address1Line}></Input>
<Text>Address Line 2</Text> 
<Input onChange={handleAdressLine2Change} value={customerInfo.address2Line ?? ''}></Input>
<Text>City</Text>
<Input onChange={handleCityChange} value={customerInfo.city}></Input>
<Text>Phone Number</Text>
<Input onChange={handlePhoneNumberChange} value={customerInfo.phoneNumber}></Input>
<Text>Post Code</Text> 
<Input onChange={handlePostCodeChange} value={customerInfo.postCode}></Input>

<Button disabled={isButtonDisabled} onClick={onSaveChanges}>Save Changes</Button>   

<Text>Delete Account</Text>
<Button colorScheme='red' onClick={onOpen}>Delete Account</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDeleteAccount} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
</VStack>
</CardBody>
</Card>
</Flex>
)
}


export default ManagePersonalData;