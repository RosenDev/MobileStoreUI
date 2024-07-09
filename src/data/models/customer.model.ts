import { OrderModel } from "./order.model";

export interface CreateCustomerModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address1Line: string;
  address2Line: string | null;
  city: string;
  postCode: string;
}

export interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address1Line: string;
  address2Line: string;
  city: string;
  postCode: string;
  econtOfficeCode?: string | null;
  orders: OrderModel[];
}

export interface UpdateCustomerModel extends CreateCustomerModel {
  id: number;
  econtOfficeCode?: string | null;
}
