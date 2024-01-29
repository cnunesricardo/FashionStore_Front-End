'use client'
import 'tailwindcss/tailwind.css'
import AppbarCartCal from 'src/app/components/AppbarCartCal';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProductsWithCategories } from 'src/app/utils/api.js'
import { CartContext } from 'src/app/contexts/CartContext';
import { ProductContainer, ProductImageProd, CardButton } from 'src/app/styles/ProductsStyles'
import { ThemeContext } from "src/app/contexts/ThemeContext"

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const {addToCart} = useContext(CartContext);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

//   useEffect(() => {
//     console.log("Products atualizou");
// }, [theme])


    const { data: session } = useSession();
    const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        const productsData = await fetchProductsWithCategories();
        setProducts(productsData);
    }
    getProducts();
  }, []);

 
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className='mb-24'>
      <ul>
        {products.map((product) =>(
          <li key={product.product_id}>                
              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-md`}>
                <div className="grid grid-cols-1 gap-4 place-items-center w-1/4">
                  <ProductImageProd src={`http://localhost:3001/files/${product.product_image}`}/>
                  <CardButton onClick={() => addToCart(product)} >
                    Add Cart
                  </CardButton>
                </div>
                <div className="pl-12 pt-2 w-3/4">
                    <h1 className='text-2xl font-bold'>{product.product_title}</h1>
                    <p className='break-words'>{product.product_description}</p>
                    <h2><b>Category: </b>{product.category_name}</h2>
                    <br></br>
                    <p><b>Price: </b>${product.product_price}</p>
                  </div>
              </ProductContainer>               
            </li>
        ))}
      </ul>
      </div>
      <Bottom></Bottom>
    </main>
  );

}
export default ProductsPage;