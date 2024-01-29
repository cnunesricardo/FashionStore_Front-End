'use client'
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import VideoCarousel from 'src/app/components/VideoCarousel';
import { ThemeContext } from 'src/app/contexts/ThemeContext';




export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const router = useRouter()

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)}
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log("Page atualizou");
    }, [theme])
  

  return (
    <main className={`container mx-auto max-w-screen-lg ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="-mt-16">
      <VideoCarousel></VideoCarousel>
      </div>
      <Bottom></Bottom>
    </main>
  )}