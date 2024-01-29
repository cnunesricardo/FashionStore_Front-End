'use client'
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import AppbarCartCal from 'src/app/components/AppbarCartCal';
import { ThemeContext } from "src/app/contexts/ThemeContext";
import Link from 'next/link';


const LoginPage = () => {
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


  if (session) {
    return (
<main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        <h1 className='container mx-auto pt-5 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
          Welcome Back!</h1>
        <div className="container mx-auto py-2 grid grid-cols-1 gap-0 place-items-center max-w-screen-lg">            
            <p className=''>User: {session.user.name}</p>
            <p className=''>e-mail: {session.user.email}</p>
        </div>          
              
        <div className="container mx-auto pt-2 pb-4 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg">
              <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
                onClick={() => router.push("/profile")}>
                Your Profile
              </button>
              
              <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>

              <Link href="/adm">
              <button className="bg-orange-500 text-white border-none mt-14 py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
                Admin Panel
              </button>
              </Link>

        </div>
        <Bottom></Bottom>
      </main>
    );
  }
  return (
    <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-sm">
      <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}> Please, sign in:</h1>
      
      <div className="grid grid-flow-row md:grid-flow-col gap-2">
      <button className="bg-orange-500 text-white border-none w-40 h-10 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
      onClick={() => signIn()}>
      With Google
      </button>

      <Link href="/login/signIn">
      <button className="bg-orange-500 text-white border-none w-40 h-10 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
      With Your Account
      </button>            
      </Link>
      </div>

      <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}> or </h1>

      <div className="Display-flex flex items-center">
      <Link href="/profile/signUp">
      <button className="bg-green-500 text-white border-none w-40 h-10 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg -mt-8">
      Creat an Account!
      </button>            
      </Link>
      </div>
      </div>

      <Bottom></Bottom>
    </main>
  );






}
export default LoginPage;