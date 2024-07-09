import { Center, Card, Button, CardHeader, Heading, CardBody, VStack, FormControl, FormLabel, Input, ButtonGroup, FormErrorMessage, useToast, Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../data/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductCategory, fetchProductCategory, setCategoryName, updateProductCategory } from "../../data/reducers/product-categories.reducer";

function ProductCategoryEditor(){
    const params = useParams();
    const dispatch = useAppDispatch();
    const toast = useToast();

    useEffect(()=>{
        if(params.id){
            dispatch(fetchProductCategory({id: params.id as any as number}));
        }
    }, [params, dispatch]);
  
    const productCategorySelector = useAppSelector(x=>x.productCategories.value.productCategoryUpdateModel);
    const productCategoriesErrorSelector = useAppSelector(x=>x.products.value.error);

    if(!!productCategoriesErrorSelector)
    {
        toast({
            title: 'An error occurred',
            description: `${productCategoriesErrorSelector}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    }

    const handleNameChange = (e: any) => dispatch(setCategoryName(e.target.value));

    const navigate = useNavigate();
    const createdProductCategoryId = useAppSelector(x=>x.productCategories.value.createdProductCategoryId);
    const updatedProductCategoryId = useAppSelector(x=>x.productCategories.value.productCategoryUpdateModel.id);

    const onSubmit = (e: any) =>{
        if(!isValidForm){
            setTriedToSubmit(true);
            return;
        }
        e.preventDefault();

        if(params.id){
            dispatch(updateProductCategory({
                updateModel: {
                    id: params.id as any as number,
                    name: productCategorySelector.name
                }
            })).then(()=>
            {
                navigate('/admin/product-categories');
                toast({
                    title: `Sucessfully updated product category with id ${updatedProductCategoryId}`,
                    description: `${productCategoriesErrorSelector}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
            })
        }else{
            dispatch(createProductCategory({
                createModel:{
                    name: productCategorySelector.name
                }
            })).then(()=>{
                navigate('/admin/product-categories');
              
                toast({
                    title: `Sucessfully created product category with id ${createdProductCategoryId}`,
                    description: `${productCategoriesErrorSelector}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
            })
        }
    }

    const nameEmptyMessage = productCategorySelector.name === '' ? 'Name is required': '';

    let [triedToSubmit, setTriedToSubmit] = useState(false);

    const isValidForm = !nameEmptyMessage;
    const isButtonDisabled = !isValidForm && triedToSubmit;

    return (
        <Flex justifyContent='center' flexDirection='row' width='100%'>
        <Card bg='card' w='50%'>
          <Button onClick={() => navigate(-1)} w='10%'>Back</Button>
        <CardHeader>
          <Center>
          <Heading size='lg'>{params.id? 'Update': 'Create'} Product Category</Heading>
          </Center>
        </CardHeader>
        <CardBody>
      <form>
      <Center>
       <VStack>
       <FormControl isInvalid={!!nameEmptyMessage && triedToSubmit}>
          <FormLabel>Name</FormLabel>
          <Input value={productCategorySelector.name} onChange={handleNameChange}/>
          {nameEmptyMessage && triedToSubmit? (<FormErrorMessage>Name is required.</FormErrorMessage>) : (<></>)}
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

export default ProductCategoryEditor;