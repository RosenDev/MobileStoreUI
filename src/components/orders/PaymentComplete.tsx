import { Button, Card, CardBody, CardHeader, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from "../../data/reducers/orders.reducer";
import { OrderStatus } from "../../data/models/order.model";

function PaymentComplete(){
const dispatch = useAppDispatch();
const params = useParams();
const navigate = useNavigate();
useEffect(()=>{
if(params.id){
dispatch(updateOrderStatus({id: params.id as any as number, status: OrderStatus.Paid}))
}
},[dispatch, params.id])

return (
<Flex w='100%' justifyContent='center'>
    <Card w='50%'>
        <CardHeader>
            <Center><Heading>Your order has been placed sucessfully</Heading></Center>
        </CardHeader>
        <CardBody>
            <Stack>
            <Text>An email has been sent to you with order confirmation</Text>
    <Button onClick={()=>{navigate('/')}}>Continue Shopping</Button>
            </Stack>
        </CardBody>
    </Card>
</Flex>
);
}

export default PaymentComplete;