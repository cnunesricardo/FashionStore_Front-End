'use client'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom'
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Image from 'next/image'

const NotFoundPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  
  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("notFoundPage atualizou");
}, [theme])
  
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg min-h-screen justify-center`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

      <div className={'container mx-auto max-w-screen-lg justify-center'}>
    <h1 className={'container mx-auto justify-center text-center mt-5 mb-5 text-2xl '}>Ops... Are you lost?</h1>
    <Image className={'container mx-auto max-w-sm justify-center'}
      src="/404.gif"
      width={500}
      height={500}
      alt="Picture of the author">
    </Image>
      </div>
      
      <Bottom></Bottom>
    </main>
  );

}
export default NotFoundPage;