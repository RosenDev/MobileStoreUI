import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../data/store';


export const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  var roles = JSON.parse(sessionStorage.getItem('roles') ?? '[]') as string[];
const isAuthenticated = localStorage.getItem("token");
  return (
    <React.Fragment>
        {
            isAuthenticated && !roles.some(x=>x.toLowerCase() === 'administrator' || x.toLowerCase() === 'siteowner')? 
            <Component /> : 
            isAuthenticated && roles.some(x=>x.toLowerCase() === 'siteowner')?
            <Navigate to='/admin/products'></Navigate>:
            isAuthenticated && roles.some(x=>x.toLowerCase() === 'administrator')?
            <Navigate to='/admin/orders'></Navigate>:
            <Navigate to="/login"/>
        }
    </React.Fragment>
  
  );
}

export const ProtectedAdminRoute = ({ component: Component, ...rest }: any) => {
  var roles = JSON.parse(sessionStorage.getItem('roles') ?? '[]') as string[];
  const isAuthenticated = localStorage.getItem("token") && roles.some(x=>x.toLowerCase() === 'administrator' || x.toLowerCase() === 'siteowner');
    return (
      <React.Fragment>
          {
              isAuthenticated ? 
              <Component /> : 
              <Navigate to="/login"/>
          }
      </React.Fragment>
    
    );
  
  }
  
  export const ProtectedSiteOwnerRoute = ({ component: Component, ...rest }: any) => {
    var roles = JSON.parse(sessionStorage.getItem('roles') ?? '[]') as string[];
    const isAuthenticated = localStorage.getItem("token") && roles.some(x=>x.toLowerCase() === 'siteowner');
      return (
        <React.Fragment>
            {
                isAuthenticated ? 
                <Component /> : 
                <Navigate to="/login"/>
            }
        </React.Fragment>
      
      );
    
    }