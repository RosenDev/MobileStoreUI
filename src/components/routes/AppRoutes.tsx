import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedAdminRoute, ProtectedRoute, ProtectedSiteOwnerRoute } from "./ProtectedRoute";
import Login from "../customers/Login";
import Register from "../customers/Register";
import ProductEditor from "../products/ProductEditor";
import ProductCategoryEditor from "../product-categories/ProductCategoryEditor";
import ProductList from "../products/ProductList";
import ProductAdminList from "../products/ProductAdminList";
import OrderDetails from "../orders/OrderDetails";
import CheckoutFormInjected from "../orders/CheckoutForm";
import ProductDetail from "../products/ProductDetail";
import ManagePersonalData from "../customers/ManagePersonalData";
import PaymentComplete from "../orders/PaymentComplete";
import OrderAdminList from "../orders/OrderAdminList";
import OrderList from "../orders/OrderList";
import ProductCategoryAdminList from "../product-categories/ProductCategoryAdminList";
import OrderEditor from "../orders/OrderEditor";
import Cart from "../products/Cart";

export function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/admin/product-categories/update/:id" element={<ProtectedSiteOwnerRoute component={ProductCategoryEditor} />}/>
          <Route path="/admin/product-categories/create" element={<ProtectedSiteOwnerRoute component={ProductCategoryEditor} />}/>
          <Route path="/admin/product-categories" element={<ProtectedSiteOwnerRoute component={ProductCategoryAdminList} />}/>
          <Route path="/admin/products/update/:id" element={<ProtectedSiteOwnerRoute component={ProductEditor} />}/>
          <Route path="/admin/products/create" element={<ProtectedSiteOwnerRoute component={ProductEditor} />}/>
          <Route path="/admin/products" element={<ProtectedSiteOwnerRoute component={ProductAdminList} />}/>
          <Route path="/admin/orders/update/:id" element={<ProtectedAdminRoute component={OrderEditor} />}/>
          <Route path="/admin/orders" element={<ProtectedAdminRoute component={OrderAdminList} />}/>
          <Route path="/orders/:id" element={<ProtectedRoute component={OrderDetails} />}/>
          <Route path="/orders" element={<ProtectedRoute component={OrderList} />}/>
          <Route path="/checkout/:id" element={<ProtectedRoute component={CheckoutFormInjected} />}/>
          <Route path="/" element={<ProtectedRoute component={ProductList} />}/>
          <Route path="/products/:id" element={<ProtectedRoute component={ProductDetail} />}/>
          <Route path="/manage-personal-data" element={<ProtectedRoute component={ManagePersonalData} />}/>
          <Route path="/payment-completed/:id" element={<ProtectedRoute component={PaymentComplete} />}/>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/cart" element={<ProtectedRoute component={Cart}></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    );
}