'use client'
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProductsWithCategories } from 'src/app/utils/api.js'
import { ProductContainer, ProductImageProd, } from 'src/app/styles/ProductsStyles'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Link from 'next/link';

const AdminDeleteProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("atualizou");
}, [theme])


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

  
  const handleDelete = async (event) => {
    if (confirm('Are you sure you want to DELETE this product?')){
      event.preventDefault();
      
      var product_id = event.target.id.value
      var product_image = event.target.image.value
      const data = { product_id, product_image };

    // Envia a requisição
    const response = await fetch(`http://localhost:3001/products/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    // Trata a resposta
    if (response.status === 200) {
    // A requisição foi bem-sucedid
      alert(`Product deleted successfully!`)
      window.location.href = "/adm/productDelete"
    } else {
      // A requisição falhou
      alert(`Error delete product: ${response.status}`);
    }
  
  }};
  

  if (session) {
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg min-h-screen`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <div className="mt-2 container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
        <Link href="/adm/productAdd">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Add Product
              </button>
              </Link>                      

        <Link href="/adm/productEdit">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Edit Product
              </button>
              </Link>  
        
        <Link href="/adm">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Admin Panel
              </button>
              </Link>

              <button className="bg-red-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-10 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>
        </div>

        <h1 className='container mx-auto pt-7 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
         Delete Product</h1>

            
      <ul className='mb-16'>
        {products.map((product) =>(
            <li key={product.id}>                
              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-lg`}>
                <div className="grid grid-cols-1 gap-4 place-items-center w-1/4">
                  <ProductImageProd src={`http://localhost:3001/files/${product.product_image}`}/>
                </div>
                
                <div className="pl-12 pt-2 w-3/4">
                    <h1 className='text-2xl font-bold'>{product.product_title}</h1>
                    <p className='break-words'>{product.product_description}</p>
                    <h2><b>Category: </b>{product.category_name}</h2>
                    <br></br>
                    <p><b>Price: </b>${product.product_price}</p>                    
                    <span className="container mx-auto flex justify-end items-end" >
                    <p className='mt-2 mr-2'><b>Product Id: </b>{product.product_id}</p>
                    </span>
                    <span className="container mx-auto flex justify-end items-end" >
                    <form onSubmit={handleDelete}>
                    <button name="id" value={product.product_id} className="bg-red-600 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg" type="submit">Delete Product</button>
                    <input name="image" value={product.product_image} type="hidden"></input>
                    </form>                    
                    </span>
                    </div>
                  </ProductContainer>               
            </li>
        ))}
      </ul>


      <Bottom></Bottom>
    </main>
  );
}

return (
  <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
    <Appbar onMenuToggle={handleMenuToggle}></Appbar>
    <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
    <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-sm">
    <h1 className='text-xl font-semibold text-rose-400'> You are not currently logged in!</h1>
    <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
    onClick={() => signIn()}>
    Sign in with Google
    </button>       
    </div>
    <Bottom></Bottom>
  </main>
);



}
export default  AdminDeleteProductsPage;