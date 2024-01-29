'use client'
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import { ThemeContext } from "src/app/contexts/ThemeContext";
import Link from 'next/link';


const AdminPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("Admin atualizou");
}, [theme])


  const { data: session } = useSession();
  const router = useRouter();


  if (session) {
    return (
<main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        <h1 className='container mx-auto pt-5 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
          Welcome Admin!</h1>
        <div className="container mx-auto py-2 grid grid-cols-1 gap-0 place-items-center max-w-screen-lg">            
            <p className=''>User: {session.user.name}</p>
            <p className=''>e-mail: {session.user.email}</p>
        </div>          

        <div className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row mb-10">
              <button className="bg-red-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>              
        </div>

        <p className='text-2xl mt-4 text-center font-bold'> Categories </p>      
        <div className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
        <Link href="/adm/categoryAdd">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Add Category
              </button>
              </Link>

        <Link href="/adm/categoryEdit">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Edit Category
              </button>
              </Link>                      

        <Link href="adm/categoryDelete">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Delete Category
              </button>
              </Link>  

        </div>

        <p className='text-2xl mt-7 text-center font-bold'> Products </p>
        <div className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
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
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg ">
              Delete Product
              </button>
              </Link>

        </div>


        <p className='text-2xl mt-7 text-center font-bold'> System Logs </p>
        <div className="container mx-auto max-w-screen-lg flex justify-center flex-row items-center">
        <Link href="/adm/logsView">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg mb-20">
                View
              </button>
              </Link>
        
        </div>

       
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
export default AdminPage;