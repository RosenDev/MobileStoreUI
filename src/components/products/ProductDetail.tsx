import { Flex, Card, Button, CardHeader, Center, Heading, CardBody, VStack, Text, Textarea, Tag, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../data/reducers/products.reducer";
import { fetchCustomer } from "../../data/reducers/customers.reducer";
import { ProductModel } from "../../data/models/product.model";

function ProductDetail(){
const params = useParams();
const dispatch = useAppDispatch();

useEffect(()=>{
    if(params.id){
        dispatch(fetchProduct({id: params.id as any as number}));
        dispatch(fetchCustomer({}));
    }

},[dispatch, params.id])

const navigate = useNavigate();
const productDetail = useAppSelector(x=>x.products.value.productDetail);
const handleSetQuantity = (e: any) => setQuantity(e);
const [quantity, setQuantity] = useState(1);
const toast = useToast();
const onAddToCart = () =>{
const productsFromCart = Array.from(JSON.parse(sessionStorage.getItem("productsInCart") ?? "[]")) as ProductModel[];
if(!productsFromCart.some(x=>x.id === productDetail.id)){
  productsFromCart.push({...productDetail, quantity: quantity});
  sessionStorage.setItem("productsInCart", JSON.stringify(productsFromCart));
  navigate('/cart');
} else{
                
  toast({
    title: `This product already exist in your cart.`,
    description: `Go to cart if you want to increase its quantity.`,
    status: 'warning',
    duration: 3000,
    isClosable: true,
  });
}
}

return (
    <Flex justifyContent='center' flexDirection='row' width='100%'>
    <Card bg='card' w='50%'>
      <Button onClick={()=>navigate(-1)} w='10%'>Back</Button>
    <CardHeader>
      <Center>
      <Heading size='lg'>Product Details</Heading>
      </Center>
    </CardHeader>
    <CardBody>
   <VStack>
   <Text>{productDetail.name}</Text>
   <Text>Description</Text>
   <Textarea w='100%' readOnly value={productDetail.description}></Textarea>
   <Text>{`Avaiable?: ${productDetail.inStock? 'In Stock' : 'Out of stock'}`}</Text>
   <Text>{`Price: ${productDetail.price} BGN`}</Text>
   <NumberInput isDisabled={!productDetail.inStock} value={quantity} onChange={handleSetQuantity} step={1} defaultValue={1} min={1} max={productDetail.quantity}>
    <NumberInputField />
    <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
<Text>Categories: </Text>
{productDetail.categories?.map(cat=>{
    return (<Tag key={cat.id}>{cat.name}</Tag>)
})}
<Button isDisabled={!productDetail.inStock} onClick={onAddToCart}>Add to Cart</Button>
</VStack>
</CardBody>
</Card>
</Flex>
);
}


export default ProductDetail;