import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/store';
import { Button, Flex } from '@chakra-ui/react';
import { DataTable } from '../common/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { fetchCustomerOrders } from '../../data/reducers/orders.reducer';
import { OrderModel, OrderStatus } from '../../data/models/order.model';
import { useNavigate } from 'react-router-dom';

function OrderList(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customerId = useAppSelector(x=>x.customers.value.customerModel.id);
    useEffect(()=>{
        if(customerId){
          dispatch(fetchCustomerOrders({customerId}))
        }
    },[dispatch, customerId])

    const ordersSelector = useAppSelector(x=>x.orders.value.orders);

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
];
return (
<Flex flexDirection='column' justifyContent='space-evenly' w='100%'>
<Button w='10%' onClick={()=> navigate(-1)}>Back</Button>
<DataTable columns={columns} data={ordersSelector.result} />
</Flex>
);
}

export default OrderList;

export {}