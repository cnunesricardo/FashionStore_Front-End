'use client'
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { fetchCategories } from 'src/app/utils/api.js'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Link from 'next/link';

const AdminAddProductsIDPage = ({ product }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("");
}, [theme])


    const { data: session } = useSession();
    const router = useRouter();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const getCategories = async () => {
          const categoriesData = await fetchCategories();
          setCategories(categoriesData);
      }
      getCategories();
    }, []);
   
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  if (confirm('Are you sure you want to add this product?')){
  
  const formData = new FormData (document.querySelector ("form"))

  const response = await fetch(`http://localhost:3001/products/addnewproduct`, {
    method: "POST",
    body: formData,
  });

  // Trata a resposta
  if (response.status === 201) {
    // A requisição foi bem-sucedida
    window.location.reload()
    alert(`Product created successfully!`);
  } else {
    // A requisição falhou
    alert(`Error creat product: ${response.status}`);
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
         Add New Product</h1>

         <form enctype="multipart/form-data" id="formAddProduct" className="container mx-auto max-w-screen-lg flex justify-center grid grid-cols-1 gap-2 place-content-center" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mt-0 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label htmlFor="product_title">Title:</label>
            <input {...register('product_title')} className="text-black ring-2 rounded-lg ring-zinc-950" required/>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label htmlfor="product_description">Description:</label>
            <textarea {...register('product_description')} className="text-black h-20 ring-2 rounded-lg ring-zinc-950" maxlength="250" required></textarea>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label htmlfor="category_id">Category:</label>
            <select {...register('category_id')} className="text-black ring-2 rounded-lg ring-zinc-950 w-60" required
            value={router.query.dropBox} onChange={(e) => router.push({ query: { dropBox: e.target.value } })}>
          {categories.map((option) => (
         <option key={option.category_id} value={option.category_id}>Id {option.category_id} - {option.category_name}</option>
        ))}
            </select>
            </div>

            <div className="mt-2 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label htmlfor="product_price">Price:</label>
            <input {...register('product_price')} className="text-black ring-2 rounded-lg ring-zinc-950 w-28" type="number" step={0.01} required/>
            </div>                               
            
            <div className="mt-0 container mx-auto max-w-screen-sm flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <label htmlfor="product_image">Image2:</label>
            <input {...register('product_image')} className="text-black ring-2 rounded-lg ring-zinc-950" type="file" required/>            
            </div>


            <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center mb-16">
            <button className="bg-green-400 text-white border-none py-2 rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg" type="submit">Add</button>
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



export default  AdminAddProductsIDPage;