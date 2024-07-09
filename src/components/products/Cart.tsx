import { Button, Flex, Heading, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../common/DataTable";
import { ProductModel } from "../../data/models/product.model";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { createOrder } from "../../data/reducers/orders.reducer";
import { useNavigate } from "react-router-dom";
import { fetchCustomer } from "../../data/reducers/customers.reducer";

function Cart(){
const [products, setProducts] = useState([] as ProductModel[]);
const dispatch = useAppDispatch();
useEffect(()=>{
  dispatch(fetchCustomer({}));
  setProducts(Array.from(JSON.parse(sessionStorage.getItem("productsInCart")?? "[]"!)));
}, [dispatch])

const customerSelector = useAppSelector(x=>x.customers.value.customerModel);
const navigate = useNavigate();
const onQuantityChange = function(id: number, val: number) {
setProducts(products.map(x=> x.id === id? {...x, quantity: val} : x));
sessionStorage.setItem("productsInCart", JSON.stringify(products.map(x=> x.id === id? {...x, quantity: val} : x)));
};

const onProductRemove = function(id: number){
setProducts(products.filter(x=>x.id !== id));
sessionStorage.setItem("productsInCart", JSON.stringify(products.filter(x=>x.id !== id)));
}
const onClearCart = function(){
setProducts([]);
sessionStorage.setItem("productsInCart", JSON.stringify([]));
}

const onCreateOrder = () => {
  dispatch(createOrder({createModel:{
      products: products.map(x=>{return {quantityOrdered: x.quantity, id: x.id}}),
      customerId: customerSelector.id
  }})).unwrap().then((id)=>{
  sessionStorage.setItem("productsInCart", JSON.stringify([]));
  navigate(`/orders/${id.result}`);
  })
  };

const columnHelper = createColumnHelper<ProductModel>();
const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (<Link href={`/products/${info.row.getValue('id')}`}>{info.getValue()}</Link>),
    header: "Product Name"
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => (
    <NumberInput
     onChange={
      (valasStr, valAsNumbr) => onQuantityChange(info.row.getValue("id"), valAsNumbr)
    }
     defaultValue={info.getValue()} 
     min={1}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>),
    meta:{
      isNumeric: true
    },
    header: "Quantity"
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    meta:{
      isNumeric: true
    },
    header: "Price"
  }),
  columnHelper.accessor("id", {
    cell: (info) => (<>
    <button onClick={()=>onProductRemove(info.getValue())} 
    style={{marginRight:'10px'}}>
    <i className="fa-solid fa-trash"></i>
    </button>
    </>),
    header: ""
  }),
];

 return (
<Flex alignItems='center' flexDirection='column' justifyContent='space-evenly' w='100%'>
<Heading as={'h2'} textAlign={'center'}>Your Cart</Heading>
{products?.length > 0 ? (<><Flex w="100%">
  <Button onClick={onClearCart} w="10%" colorScheme="gray">Clear Cart</Button>
  </Flex>
  <DataTable columns={columns} data={products ?? []} />
  <b>Total Amount: {products.reduce((acc, curr) => { return acc + curr.price * curr.quantity; }, 0)} BGN</b>
<Flex flexDirection='row' marginTop='20px' justifyContent='center' w='100%'>
  <Button margin='5px' onClick={onCreateOrder}>Buy</Button>
  <Button margin='5px' onClick={()=> navigate('/')}>Add more Items</Button>
</Flex></>) : (<b>Your Cart is Empty</b>)
}
</Flex>
);
}

export default Cart;