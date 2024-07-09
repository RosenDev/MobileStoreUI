import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/store';
import { Button, Flex, Link } from '@chakra-ui/react';
import { DataTable } from '../common/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { fetchOrders } from '../../data/reducers/orders.reducer';
import { OrderModel, OrderStatus } from '../../data/models/order.model';

function OrderAdminList(){

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchOrders({page: 1, size: 100}))
    },[dispatch])

    const ordersSelector = useAppSelector(x=>x.orders.value.orders);

    const orders = ordersSelector.result;

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(orders.map(x=>{return{...x, products:x.products.map(a=>a.name).join(', ')}}));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'orders');
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
    dispatch(fetchOrders({page: 1, size: 100}))
    },[dispatch]);

    const columnHelper = createColumnHelper<OrderModel>();
    const columns = [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Order Id"
      }),
      columnHelper.accessor("quantity", {
        cell: (info) => info.getValue(),
        header: "Quantity",
        meta:{
            isNumeric: true
        }
      }),
      columnHelper.accessor("orderDate", {
        cell: (info) => {let date = Date.parse(info.getValue()); 
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let hour = new Intl.DateTimeFormat('en', { hour: 'numeric' }).format(date);
        return `${day}-${month}-${year} ${hour}`;
    },
    header: "Order Date"
}),
      columnHelper.accessor("status", {
        cell: (info) => OrderStatus[info.getValue()],
        header: "Status"
      }),
      columnHelper.accessor("products", {
        cell: (info) => info.getValue().map(x=>x.name).join(', '),
        header: "Products"
      }),
      columnHelper.accessor("econtOfficeCode", {
        cell: (info) => info.getValue(),
        header: "Econt Office Code"
      }),
      columnHelper.accessor("customerName", {
        cell: (info) => info.getValue(),
        header: "Customer Name"
      }),
      columnHelper.accessor("customerAddress", {
        cell: (info) => info.getValue(),
        header: "Customer Address"
      }),
      columnHelper.accessor("customerPhone", {
        cell: (info) => info.getValue(),
        header: "Customer Phone Number"
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
      columnHelper.accessor("actionsId", {
        cell: (info) => (
        <>
        <Button><Link href={`/admin/orders/update/${info.getValue()}`}>Edit</Link></Button>
        </>
        ),
        header: "Actions"
      }),
    ];
return (
<Flex flexDirection='column' justifyContent='space-evenly' w='100%'>
<Button w='10%' onClick={exportExcel}>Export</Button>
<DataTable columns={columns} data={orders?? []} />
</Flex>
);
}

export default OrderAdminList;

export {}