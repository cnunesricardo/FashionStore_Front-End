'use client'
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchLogs } from 'src/app/utils/api.js'
import { ProductContainer, ProductImageProd, } from 'src/app/styles/ProductsStyles'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Link from 'next/link';

const AdminViewLogsPage = () => {
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

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
        const logsData = await fetchLogs();
        setLogs(logsData);
    }
    getLogs();
  }, []);

  if (session) {
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg min-h-screen`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <div className="mt-2 container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
                      
       
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
         Logs</h1>

         <ul className="mt-2 mb-16 pb-10 flex justify-items-center grid grid-cols-1 md:grid-cols-3 place-content-center gap-2">
        {logs.map((log) =>(
            <li key={log.timestamp}>                
              <div className=" mt-5">
                    <p className='text-sm'>{log.timestamp}</p>
                    <p className='text-sm'>Protocol: {log.Protocol}</p>
                    <p className='text-sm'>Method: {log.method}</p>
                    <p className='text-sm'>Rote: {log.url}</p>
                    <p className='text-sm'>Host: {log.host}</p>
                    <p className='text-sm'>Ip: {log.ip}</p>
                </div>
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
export default  AdminViewLogsPage;