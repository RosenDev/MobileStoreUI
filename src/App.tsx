import React, { useEffect, useState } from 'react';
import {Box, Button, ButtonGroup, Center, ChakraProvider, Flex, Heading, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer, extendTheme} from "@chakra-ui/react"
import { AppRoutes } from './components/routes/AppRoutes';
import { useAppDispatch, useAppSelector } from './data/store';
import { logout } from './data/reducers/user.reducer';
import { fetchCustomer } from './data/reducers/customers.reducer';
        

function App() {
  const rolesSelector = JSON.parse(sessionStorage.getItem('roles')?? '[]') as string[];
  const token = localStorage.getItem('token');
  const [loaded, setLoaded] = useState(false);
  const dipsatch = useAppDispatch();
  useEffect(()=>{
    if(!loaded && token && !rolesSelector.some(x=>x.toLowerCase() === 'administrator' ||x.toLowerCase() === 'siteowner')){
      dipsatch(fetchCustomer({}))
      setLoaded(true);
    }
  },[dipsatch, loaded, token, rolesSelector])

  const customerSelector = useAppSelector(x=>x.customers.value.customerModel);
  const guest = !localStorage.getItem('token');
  const authenticated = localStorage.getItem('token') && rolesSelector.some(x=>x.toLowerCase() === 'customer');
  const authenticatedAdmin = localStorage.getItem('token') && rolesSelector.some(x=>x.toLowerCase() === 'administrator');
  const authenticatedSiteOwner = localStorage.getItem('token') && rolesSelector.some(x=>x.toLowerCase() === 'siteowner');

  const logoutClicked = () =>{
    dipsatch(logout());
    window.location.reload();
  }

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "white",
        }
      }),
    },
    colors:{
      card: '#FBFBFD',
      navbar:'#F5F5F7',
      footer:'#F2F2F7'
    }
  });
  return (
    <ChakraProvider theme={theme}>
    <Flex bg='navbar' minWidth='max-content' alignItems='center' gap='2'>
    <Box p='2'>
      <Heading size='md'>
        <Link href='/'>
        Mobile Store
        </Link>
        </Heading>
    </Box>
    <Spacer />
  {guest? (<ButtonGroup>
    <Link margin='5px' href='/login'>Login</Link>
    <Link marginRight='10px' margin='5px' href='/register'>Register</Link>
  </ButtonGroup>):
  authenticated? 
  (  <Menu>
    <Link href='/cart'><i className="fa-solid fa-cart-shopping"></i></Link>
    <p>Hello, {`${customerSelector.firstName} ${customerSelector.lastName}`}</p>
    <MenuButton as={Button}>
    <i className="fa-solid fa-bars"></i>
    </MenuButton>
    <MenuList>
      <MenuGroup title='Profile'>
        <MenuItem><Link href='/manage-personal-data'>My Account</Link></MenuItem>
        <MenuItem><Link href='/'>Products</Link></MenuItem>
        <MenuItem><Link href='/orders'>Your Orders</Link></MenuItem>
        <MenuItem onClick={logoutClicked}>Logout</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>): 
  authenticatedAdmin? 
  (<Menu>
    <p>Hello, Administrator</p>
    <MenuButton as={Button}>
    <i className="fa-solid fa-bars"></i>
    </MenuButton>
    <MenuList>
      <MenuGroup title='Profile'>
        <MenuItem><Link href='/admin/orders'>Orders</Link></MenuItem>
        <MenuItem onClick={logoutClicked}>Logout</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>): authenticatedSiteOwner ?
  (<Menu>
    <p>Hello, Site Owner</p>
    <MenuButton as={Button}>
    <i className="fa-solid fa-bars"></i>
    </MenuButton>
    <MenuList>
      <MenuGroup title='Profile'>
        <MenuItem><Link href='/admin/products'>Products</Link></MenuItem>
        <MenuItem><Link href='/admin/product-categories'>Product Categories</Link></MenuItem>
        <MenuItem><Link href='/admin/orders'>Orders</Link></MenuItem>
        <MenuItem onClick={logoutClicked}>Logout</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
): 
(<></>)
  }
</Flex>
<AppRoutes></AppRoutes>
<Box paddingBottom='400px'>
  <footer style={{ backgroundColor: '#F5F5F7', position: 'absolute', left:0, bottom:0, right:0}}>
    <Center>Copyright MobileStore 2024</Center>
  </footer>
</Box>
</ChakraProvider>
);
}

export default App;
