import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/store';
import { deleteProduct, fetchProducts } from '../../data/reducers/products.reducer';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Card, Flex, Link, useDisclosure } from '@chakra-ui/react';
import { DataTable } from '../common/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import { ProductModel } from '../../data/models/product.model';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductAdminList(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchProducts({page: 1, size: 100}))
    },[dispatch])

    const productsSelector = useAppSelector(x=>x.products.value.products);

    const products = productsSelector.result;

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products.map(x=>{return{...x, categories:x.categories.map(a=>a.name).join(', ')}}));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'products');
        });
    };

    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    useEffect(()=>{
    dispatch(fetchProducts({page: 1, size: 100}))
    },[dispatch]);

    function promptDeleteProduct(id: number): void {
    setProductIdToDelete(id);
    onOpen();
    }
    function onCloseConfirmed(){
        onClose();
        dispatch(deleteProduct({id: productIdToDelete})).then(()=>navigate(0));
    }
    const [productIdToDelete, setProductIdToDelete] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);
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
      columnHelper.accessor("quantity", {
        cell: (info) => info.getValue(),
        header: "Quantity",
        meta:{
            isNumeric: true
        }
      }),
      columnHelper.accessor("categories", {
        cell: (info) => info.getValue().map(x=>x.name).join(', '),
        header: "Categories"
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
        <Button><Link href={`/admin/products/update/${info.getValue()}`}>Edit</Link></Button>
        <Button margin='5px' onClick={()=>promptDeleteProduct(info.getValue())}>Delete</Button>
        </>),
        header: "Actions"
      }),
    ];
return (
<Flex flexDirection='column' justifyContent='space-evenly' w='100%'>
    <ButtonGroup>
    <Button w='10%' onClick={exportExcel}>Export</Button>
    <Button w='10%'><Link href='/admin/products/create'>Create</Link></Button>
    </ButtonGroup>

<DataTable columns={columns} data={products?? []} />
<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product {productIdToDelete}?
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


export default ProductAdminList;