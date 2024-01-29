'use client'
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form'
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import AppbarCartCal from 'src/app/components/AppbarCartCal';
import { ThemeContext } from "src/app/contexts/ThemeContext";
import Link from 'next/link';


const ResetPasswordPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const { register } = useForm();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("atualizou");
}, [theme])


  const router = useRouter();

  const handleSubmit = (data) => { 
    
    // addfetch
    
    setMensagem("New password sent to email address (if it matches an existing account). Please, check inbox and spam.");
    event.preventDefault();
  };
  const [mensagem, setMensagem] = useState();



  return (
    <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-sm">
      <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Reset Your Password</h1>
      
      <form className="container mx-auto max-w-screen-sm rounded-lg shadow-x1 text-lg"
            onSubmit={handleSubmit}>
      
      <div className="mb-4">
              <label htmlFor="user_email" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                E-mail:
              </label>
                <input {...register('user_email')} id="user_email" className="border rounded w-full py-2 px-3" required></input>
      </div>

        
      <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center">
            <button className="bg-red-400 text-white border-none py-2 rounded-lg shadow-md hover:bg-red-500 hover:shadow-lg"
            type="submit">
              Reset
            </button>
      </div>
      </form>
      <div className="text-lg text-center font-bold text-green-600">
      <h1> {mensagem} </h1>
      </div>

      <Link href="/login" className={`underline underline-offset-0 text-sm font-semibold mt-2 mb-16 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Go back to login page
      </Link>


      </div>

      

      <Bottom></Bottom>

    </main>
  );






}
export default ResetPasswordPage;