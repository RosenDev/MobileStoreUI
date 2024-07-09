import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/store';
import { fetchProducts } from '../../data/reducers/products.reducer';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Link, useDisclosure } from '@chakra-ui/react';
import { DataTable } from '../common/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCategoryModel } from '../../data/models/product-category.model';
import { deleteProductCategory, fetchProductCategories } from '../../data/reducers/product-categories.reducer';

function ProductCategoryAdminList(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchProductCategories({page: 1, size: 100}))
    },[dispatch])

    const productsCategoriesSelector = useAppSelector(x=>x.productCategories.value.productCategories);

    const productCategories = productsCategoriesSelector.result;

    useEffect(()=>{
    dispatch(fetchProducts({page: 1, size: 100}))
    },[dispatch]);

    function promptDeleteProduct(id: number): void {
    setProductIdToDelete(id);
    onOpen();
    }
    function onCloseConfirmed(){
        onClose();
        dispatch(deleteProductCategory({id: productCategoryIdToDelete})).then(()=>navigate(0));
    }
    const [productCategoryIdToDelete, setProductIdToDelete] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);
    const columnHelper = createColumnHelper<ProductCategoryModel>();
    const columns = [
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Product Category Name"
      }),
      columnHelper.accessor("updated20114101", {
        cell: (info) => {let date = Date.parse(info.getValue()); 
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let hour = new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(date);
        return `${day}-${month}-${year} ${hour}`;
    },
        header: "Updated_20114101"
}),
      columnHelper.accessor("id", {
        cell: (info) => (<>
        <Button><Link href={`/admin/product-categories/update/${info.getValue()}`}>Edit</Link></Button>
        <Button margin='5px' onClick={()=>promptDeleteProduct(info.getValue())}>Delete</Button>
        </>),
        header: "Actions"
      }),
    ];
return (
<Flex flexDirection='column' justifyContent='space-evenly' w='100%'>
<Button w='10%'><Link href='/admin/product-categories/create'>Create</Link></Button>
<DataTable columns={columns} data={productCategories?? []} />
<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product Category {productCategoryIdToDelete}?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onCloseConfirmed} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
</Flex>
);
}


export default ProductCategoryAdminList;