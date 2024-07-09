import { Center, Card, Button, CardHeader, Heading, CardBody, VStack, FormControl, FormLabel, Input, ButtonGroup, FormErrorMessage, useToast, Flex, Text, Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrder, setStatus, updateOrderStatus } from "../../data/reducers/orders.reducer";
import { OrderStatus } from "../../data/models/order.model";

function OrderEditor(){
    const params = useParams();
    const dispatch = useAppDispatch();
    const toast = useToast();

    useEffect(()=>{
        if(params.id){
            dispatch(fetchOrder({id: params.id as any as number}));
        }
    }, [params, dispatch]);
  
    const orderSelector = useAppSelector(x=>x.orders.value.orderDetail);
    const ordersErrorSelector = useAppSelector(x=>x.orders.value.error);

    if(!!ordersErrorSelector)
    {
        toast({
            title: 'An error occurred',
            description: `${ordersErrorSelector}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }

    const handleStatusChange = (e: any) => dispatch(setStatus(Number(e.target.value)));

    const navigate = useNavigate();
    const updatedOrderId = useAppSelector(x=>x.orders.value.orderDetail.id);

    const onSubmit = (e: any) =>{
        e.preventDefault();

        dispatch(updateOrderStatus({
            id: params.id as any as number,
            status: orderSelector.status
        })).then(()=>
        {
            navigate('/admin/orders');
            toast({
                title: `Sucessfully updated order with id ${updatedOrderId}`,
                description: `${ordersErrorSelector}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                });
        })        
}

    return (
        <Flex justifyContent='center' flexDirection='row' width='100%'>
        <Card bg='card' w='50%'>
          <Button onClick={() => navigate(-1)} w='10%'>Back</Button>
        <CardHeader>
          <Center>
          <Heading size='lg'>Update Order</Heading>
          </Center>
        </CardHeader>
        <CardBody>
      <form>
      <Center>
       <VStack>
       <FormControl>
          <FormLabel>Id</FormLabel>
          <Text>{orderSelector.id}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Text>{orderSelector.price}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Order Date</FormLabel>
          <Text>{orderSelector.orderDate}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Customer Name</FormLabel>
          <Text>{orderSelector.customerName}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Customer Address</FormLabel>
          <Text>{orderSelector.customerAddress}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Econt Office Code</FormLabel>
          <Text>{orderSelector.econtOfficeCode}</Text>
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select value={orderSelector.status} onChange={handleStatusChange}>
            {Object.values(OrderStatus).filter(x=>!!Number(x)).map(x=>{
                return (<option key={x} label={OrderStatus[x as any as number]} value={x}></option>)
            })}
          </Select>
        </FormControl>
        <ButtonGroup marginTop={5} variant='outline' spacing='6'>
        <Button colorScheme='blue' onClick={onSubmit}>Update</Button>
      </ButtonGroup>
    </VStack>
    </Center>
</form>
</CardBody>
 </Card>
</Flex>
);
}

export default OrderEditor;