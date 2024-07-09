import { Center, Card, Button, CardHeader, Heading, CardBody, VStack, FormControl, FormLabel, Input, ButtonGroup, Textarea, FormErrorMessage, useToast, Flex, Image } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useEffect, useState } from "react";
import { createProduct, fetchProduct, setProductCategoryIds, setProductDescription, setProductName, setProductPrice, setProductQuantity, updateProduct } from "../../data/reducers/products.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductCategories } from "../../data/reducers/product-categories.reducer";

function ProductEditor(){

    const params = useParams();
    const dispatch = useAppDispatch();

    const toast = useToast();
    const productSelector = useAppSelector(x=>x.products.value.productUpdateModel);
    const productCategoriesSelector = useAppSelector(x=>x.productCategories.value.productCategories);
    const productErrorSelector = useAppSelector(x=>x.products.value.error);
    const productCategoriesErrorSelector = useAppSelector(x=>x.products.value.error);

    useEffect(()=>{
        if(!!params.id){
            dispatch(fetchProduct({id: params.id as any as number}));
        }

    dispatch(fetchProductCategories({page: 1, size: 100}));
    }, [params.id, dispatch]);
  

    if(!!productErrorSelector || !!productCategoriesErrorSelector)
    {
        toast({
            title: 'An error occurred',
            description: `${productErrorSelector}\n${productCategoriesErrorSelector}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }

    const handleNameChange = (e: any) => dispatch(setProductName(e.target.value));
    const handleDescriptionChange = (e: any) => dispatch(setProductDescription(e.target.value));
    const handleCategoriesChange = (value: any) => {
        dispatch(setProductCategoryIds(Array.from<{label: string, value: number}>(value).map(x=>x.value)));
    };
    const handleQuantityChange = (e: any) => dispatch(setProductQuantity(e.target.value));
    const handlePriceChange = (e: any) => dispatch(setProductPrice(e.target.value));
    const navigate = useNavigate();
    const createdProductId = useAppSelector(x=>x.products.value.createdProductId);
    const updatedProductId = useAppSelector(x=>x.products.value.productDetail.id);

    const onSubmit = (e: any) =>{
        if(!isValidForm){
            setTriedToSubmit(true);
            return;
        }
        e.preventDefault();

        if(params.id){
            dispatch(updateProduct({
                updateModel: {
                    id: params.id as any as number,
                    name: productSelector.name,
                    description: productSelector.description,
                    categoryIds: productSelector.categoryIds,
                    quantity: productSelector.quantity,
                    price: productSelector.price
                }
            })).then(()=>
            {
                navigate('/admin/products');
                toast({
                    title: `Sucessfully updated product with id ${updatedProductId}`,
                    description: `${productErrorSelector}\n${productCategoriesErrorSelector}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
            })
        }else{
            dispatch(createProduct({
                createModel:{
                    name: productSelector.name,
                    description: productSelector.description,
                    categoryIds: productSelector.categoryIds,
                    quantity: productSelector.quantity,
                    price: productSelector.price
                }
            })).then(()=>{
                navigate('/admin/products');
              
                toast({
                    title: `Sucessfully created product with id ${createdProductId}`,
                    description: `${productErrorSelector}\n${productCategoriesErrorSelector}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
            })
        }
    }

    const nameEmptyMessage = productSelector.name === '' ? 'Name is required': '';
    const descriptionEmptyMessage = productSelector.description === '' ? 'Description is required': '';
    const categoriesEmptyMessage = productSelector.categoryIds.length === 0 ? 'Categories is required': '';
    const quantityEmptyMessage = productSelector.quantity === 0 ? 'Quantity is required': '';
    const priceEmptyMessage = productSelector.quantity === 0 ? 'Price is required': '';

    let [triedToSubmit, setTriedToSubmit] = useState(false);

    const isValidForm = (!nameEmptyMessage && !categoriesEmptyMessage &&
     !descriptionEmptyMessage && !quantityEmptyMessage && 
     !priceEmptyMessage);

     const isButtonDisabled = !isValidForm && triedToSubmit;

    return (
        <Flex justifyContent='center' flexDirection='row' width='100%'>
        <Card bg='card' w='50%'>
          <Button onClick={() => navigate(-1)} w='10%'>Back</Button>
        <CardHeader>
          <Center>
          <Heading size='lg'>{params.id? 'Update': 'Create'} Product</Heading>
          </Center>
        </CardHeader>
        <CardBody>
      <form>
      <Center>
       <VStack>
       <FormControl isInvalid={!!nameEmptyMessage && triedToSubmit}>
          <FormLabel>Product Name</FormLabel>
          <Input value={productSelector.name} onChange={handleNameChange}/>
          {nameEmptyMessage && triedToSubmit? (<FormErrorMessage>Product Name is required.</FormErrorMessage>) : (<></>)}
        </FormControl>
        <FormControl isInvalid={!!descriptionEmptyMessage && triedToSubmit}>
         <FormLabel>Description</FormLabel>
          <Textarea value={productSelector.description} onChange={handleDescriptionChange} size='lg' />
          {descriptionEmptyMessage && triedToSubmit? (<FormErrorMessage>Description is required.</FormErrorMessage>) : (<></>)}
        </FormControl>
        <FormControl isInvalid={!!quantityEmptyMessage && triedToSubmit}>
         <FormLabel>Quantity</FormLabel>
         <Input textAlign='right' value={productSelector.quantity} onChange={handleQuantityChange}/>
         {quantityEmptyMessage && triedToSubmit? (<FormErrorMessage>Quantity is required.</FormErrorMessage>) : (<></>)}
        </FormControl>
        <FormControl isInvalid={!!priceEmptyMessage && triedToSubmit}>
         <FormLabel>Price</FormLabel>
          <Input textAlign='right' value={productSelector.price} onChange={handlePriceChange}/>
          {priceEmptyMessage && triedToSubmit? (<FormErrorMessage>Price is required.</FormErrorMessage>) : (<></>)}
        </FormControl>
        <FormControl isInvalid={!!categoriesEmptyMessage && triedToSubmit}>
         <FormLabel>Categories</FormLabel>
         <Select
         value={productSelector.categoryIds.map(x=> { let cat = productCategoriesSelector.result.find(a=>a.id === x); return {label: cat?.name, value: cat?.id}}).filter(x=>!!x.label)}
         onChange={handleCategoriesChange} 
         options={productCategoriesSelector.result.map(x=>{return {label: x.name, value: x.id}})} 
         isMulti={true}
         placeholder="Select Categories"
         tagVariant={'solid'}/>
         {categoriesEmptyMessage && triedToSubmit? (<FormErrorMessage>Categories is required.</FormErrorMessage>) : (<></>)}
        </FormControl>
        <ButtonGroup marginTop={5} variant='outline' spacing='6'>
        <Button isDisabled={isButtonDisabled} colorScheme='blue' onClick={onSubmit}>{params.id? 'Update': 'Create'}</Button>
      </ButtonGroup>
       </VStack>
       </Center>
      </form>
      </CardBody>
      </Card>
      </Flex>
    );
}

export default ProductEditor;