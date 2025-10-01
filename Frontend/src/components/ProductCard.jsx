import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Box, Heading, IconButton, HStack, Image, Text, VStack, Input, DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogCloseTrigger, DialogTrigger, Button, DialogFooter } from "@chakra-ui/react";
import { useColorModeValue } from '../components/ui/color-mode'
import useProductStore from '../store/product';
import { useState } from "react";
const ProductCard = ({product}) => { 

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const {deleteProduct, updateProduct} = useProductStore()
    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        if(!success) {
            alert(message);
        }
        
    }

    const handleUpdateProduct = async (pid, updateProduct) => {
        await updateProduct(pid, updateProduct);
        onclose();
    }

    return (
    <Box   
        shadow='lg'
        rounded='lg'
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

        <Box p={4}>
        <Heading as ='h3' mb={2}>
            {product.name}
        </Heading>   
        <Text fontSize='xl' fontWeight='bold' color={textColor} mb={4}>
            ${product.price}
        </Text>

        <DialogRoot>
            <HStack spacing={2}>
                <DialogTrigger asChild>
                    <IconButton aria-label='Edit product' colorScheme='blue'>
                        <LuPencil />
                    </IconButton>
                </DialogTrigger>
                <IconButton aria-label='Delete product' onClick={() => handleDeleteProduct(product._id)} colorScheme='red'>
                    <LuTrash2 />
                </IconButton>
            </HStack>

            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name='price'
                            type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                    </VStack>
                </DialogBody>
                <DialogFooter display='flex' justifyContent='flex-end' gap={2}>
                    <DialogCloseTrigger asChild>
                        <Button variant='outline' onClick={() => setUpdatedProduct(product)}>Cancelar</Button>
                    </DialogCloseTrigger>
                    <DialogCloseTrigger asChild>
                        <Button colorScheme='blue' onClick={async () => {
                            const priceNumber = Number(updatedProduct.price);
                            const updates = { ...updatedProduct, price: isNaN(priceNumber) ? updatedProduct.price : priceNumber };
                            const { success, message } = await updateProduct(product._id, updates);
                            if (!success) alert(message);
                        }}>Confirmar</Button>
                    </DialogCloseTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>

        </Box>

        

    </Box>
    )
}

export default ProductCard;