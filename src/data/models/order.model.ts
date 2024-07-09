import { ProductModel } from "./product.model";

export interface OrderModel {
  id: number;
  customerName: string;
  customerAddress:string;
  actionsId: number;
  quantity: number;
  price: number;
  status: OrderStatus;
  customerPhone: string;
  orderDate: string;
  updated20114101: string;
  econtOfficeCode: string;
  products: ProductModel[];
}

export enum OrderStatus {
  Created = 1,
  Cancelled,
  Paid,
  SentForDelivery,
  Delivered,
}

export interface CreateOrderModel {
  customerId: number;
  products: ProductsInOrderModel[];
}

export interface ProductsInOrderModel {
  quantityOrdered: number;
  id: number;
}

export interface UpdateOrderModel {
  id: number;
  products: ProductsInOrderModel[];
}
