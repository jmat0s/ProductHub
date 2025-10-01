import { useColorModeValue } from '../components/ui/color-mode';
import { createToaster, VStack } from '@chakra-ui/react';
import React from 'react'
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
import useProductStore from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster"

const CreatePage = () => {
    const [newProduct, setNewProduct] = React.useState({
        name: "",
        price: "",
        image: "",
    });
    const toast = Toaster();
    const { createProduct } = useProductStore();
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (!success){
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toaster.create({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    
    };

  return (
    <Container maxW={"container.sm"}>
        <VStack 
            spacing={8}
        >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create new Product
            </Heading>

            <Box
               w={"full"} bg={useColorModeValue("white", "gray.900")}
               p={6} rounded={"lg"} shadow={"md"}
            >   
                <VStack spacing={4}>
                <Input 
                    placeholder='Product Name'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <Input 
                    placeholder='Price'
                    name='price'
                    type='number'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <Input 
                    placeholder='Image URL'
                    name='image'
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                <Button 
                    colorScheme='blue' 
                    onClick={handleAddProduct}
                    w={"full"}
                >
                    Add Product
                </Button>

                </VStack>

            </Box>
        </VStack>
      
    </Container>
  );
};

export default CreatePage;