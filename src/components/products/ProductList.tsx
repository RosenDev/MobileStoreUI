import { Flex, Link } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { DataTable } from "../common/DataTable";
import { ProductModel } from "../../data/models/product.model";
import { useEffect } from "react";
import { fetchProducts } from "../../data/reducers/products.reducer";

function ProductList(){
const products = useAppSelector(x=>x.products.value.products.result);

const dispatch = useAppDispatch();

useEffect(()=>{
dispatch(fetchProducts({page: 1, size: 100}))
},[dispatch]);

const columnHelper = createColumnHelper<ProductModel>();
const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Product Name"
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    meta:{
      isNumeric: true
    },
    header: "Price"
  }),
  columnHelper.accessor("inStock", {
    cell: (info) => info.getValue() ? 'In Stock' : 'Out of stock',
    header: "In Stock"
  }),
  columnHelper.accessor("categories", {
    cell: (info) => info.getValue().map(x=>x.name).join(', '),
    header: "Categories"
  }), 
  columnHelper.accessor("id", {
    cell: (info) => (<Link href={`/products/${info.getValue()}`}>Details</Link>),
    header: "Details"
  }),
];

 return (
<Flex flexDirection='column' justifyContent='space-evenly' w='100%'>
<DataTable columns={columns} data={products?? []} />
</Flex>
);
}

export default ProductList;