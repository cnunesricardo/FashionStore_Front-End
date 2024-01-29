'use client'
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { fetchProductsWithCategories, fetchCategories } from 'src/app/utils/api.js'
import { ProductContainer, ProductImageProd } from 'src/app/styles/ProductsStyles'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Link from 'next/link';
import axios from 'axios';

const AdminEditPhotoIdPage = ({ product }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("");
}, [theme])

// const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getCategories = async () => {
//         const categoriesData = await fetchCategories();
//         setCategories(categoriesData);
//     }
//     getCategories();
//   }, []);

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

const idAndName = "Id " + product.category_id + " - " + product.category_name;

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (event) => {  
if (confirm('Are you sure you want to update the photo?')){

  const formData = new FormData (document.querySelector ("form"))  

  const response = await fetch(`http://localhost:3001/products/editphoto`, {
    method: "PUT",
    body: formData,
  });

  // Trata a resposta
  if (response.status === 200) {
    // A requisição foi bem-sucedida
    window.location.reload()
    alert(`Photo updated successfully!`)
  } else {
    // A requisição falhou
    alert(`Error update photo: ${response.status}`);
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
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Edit Product
              </button>
              </Link>                      


        <Link href="/adm/productDelete">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Delete Product
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

        <h1 className='container mx-auto pt-7 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold underline'>
        Current Information</h1>


              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-sm flex felx-row`}>
                <div className="grid grid-cols-1 gap-2 place-items-center w-1/4">
                  <ProductImageProd src={`http://localhost:3001/files/${product.product_image}`}/>
                </div>
                <div className="pl-12 pt-2 w-3/4">
                    <h1 className='text-2xl font-bold'>Product: {product.product_id} - {product.product_title}</h1>
                    <p className='break-words'>{product.product_description}</p>
                    <h2 className='mt-2'><b>Category: </b>Id {product.category_id} - {product.category_name}</h2>
                    <p className='mt-2'><b>Price: </b>${product.product_price}</p>                    
                    </div>
                  </ProductContainer>

        <h1 className='container mx-auto pt-0 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold underline'>
         Update Photo:</h1>

         <form enctype="multipart/form-data" id="formEditPhoto" className="mb-5 container mx-auto max-w-screen-lg flex justify-center grid grid-cols-1 gap-2 place-content-center" onSubmit={handleSubmit(onSubmit)}>
         <div className="mt-0 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label >New Photo:</label>
            <input id="product_image" {...register('product_image')} className="text-black ring-2 rounded-lg ring-zinc-950" type="file" required/>            
            </div>
          
          <div className="container mx-auto flex justify-center items-center" >
            <button className="bg-green-700 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg" type="submit">Update Photo</button>
            <input id="product_id" {...register('product_id')} value={product.product_id.toString()} type="hidden"></input>
            <input id="product_oldimage" {...register('product_oldimage')} value={product.product_image} type="hidden"></input>
          </div>           
          </form>
          
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

export async function getServerSideProps({ params }) {
  const { itemId } = params;
  
  const productResponse = await axios.get(`http://localhost:3001/products/${itemId}`)
  const product = productResponse.data;

  return{
      props: {
          product,
      }, 
  };
}


export default  AdminEditPhotoIdPage;