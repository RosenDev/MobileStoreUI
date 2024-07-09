import { Flex, Card, Button, CardHeader, Center, Heading, CardBody, VStack, FormControl, FormLabel, Input, FormErrorMessage, ButtonGroup, Divider, Text, Textarea, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrder } from "../../data/reducers/orders.reducer";
import { fetchCustomer, updateCustomer } from "../../data/reducers/customers.reducer";

function OrderDetails(){
const navigate = useNavigate();
const toast = useToast();
const orderSelector = useAppSelector(x=>x.orders.value.orderDetail);
const customerSelector = useAppSelector(x=>x.customers.value.customerModel);
const params = useParams();
const dispatch = useAppDispatch();
useEffect(()=>{
  if(params.id){
    dispatch(fetchOrder({id: params.id as any as number}));
    fetchCustomer({});
  }
},[dispatch, params])

const onNextClick = () => {
    navigate(`/checkout/${params.id}`);
}

const [econtOfficeCode, setEcontOfficeCode] = useState('');

useEffect(()=>{
  function displayMessage(event: any) {
    if (event.data?.office === undefined) {
        return;
    }
  setEcontOfficeCode(event.data?.office);
  if(customerSelector.id){
    dispatch(updateCustomer({updateModel:{
      id: customerSelector.id,
      firstName: customerSelector.firstName,
      lastName: customerSelector.lastName,
      phoneNumber: customerSelector.phoneNumber,
      address1Line: customerSelector.address1Line,
      address2Line: customerSelector.address2Line as string,
      city: customerSelector.city,
      postCode: customerSelector.postCode,
      econtOfficeCode: event.data.office.code
    }})).then(()=>{
      toast({
        title: `Sucessfully set office ${event.data.office.name}`,
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    })
  }
  }
  if(!econtOfficeCode){
    window.addEventListener('message', displayMessage);
  }else{
    window.removeEventListener('message', displayMessage);
  }
 
},[
  econtOfficeCode,
   setEcontOfficeCode,
    customerSelector.address1Line,
    customerSelector.address2Line,
    customerSelector.firstName,
    customerSelector.lastName,
    customerSelector.city,
    customerSelector.econtOfficeCode,
    customerSelector.id,
    customerSelector.postCode,
    customerSelector.phoneNumber,
    dispatch,
    toast
])
  
let isEcontOfficeSelected = !!econtOfficeCode;

return(
    <Flex justifyContent='center' flexDirection='row' width='100%'>
    <Card bg='card' w='50%'>
      <Button onClick={() => navigate(-1)} w='10%'>Back</Button>
    <CardHeader>
      <Center>
      <Heading size='lg'>Order Details</Heading>
      </Center>
    </CardHeader>
    <CardBody>
<VStack>
  <Text fontWeight='bold'>Product</Text>
{orderSelector.products.map(p=>{
return (<Text key={p.id}>{p.name}</Text>)
})
}
<Text fontWeight='bold'>Address</Text>
<Textarea height='200px' value={`${customerSelector.address1Line}\n${customerSelector.address2Line}\n\n${customerSelector.city}\n${customerSelector.postCode}`} readOnly>
</Textarea>
<Text fontWeight='bold'>Select Econt Office</Text>
<iframe title="Econt Office Locator"
  allow="geolocation;"
  src="https://staging.officelocator.econt.com?shopUrl=https://example.staging.officelocator.econt.com&city=Sofia&address=ul. rezbarska 5&officeType=office&lang=bg"
  style={{width: '100%', height: '90vh', borderWidth: '0px'}}>
</iframe>
<Button isDisabled={!isEcontOfficeSelected} onClick={onNextClick}>Continue</Button>
</VStack>
</CardBody>
</Card>
</Flex>
);
}

export default OrderDetails;