import React,{useContext, useEffect} from "react";
import { ThemeContext } from "src/app/contexts/ThemeContext";
import Link from "next/link";

function Bottom() {
    const { theme } = useContext(ThemeContext);

    // useEffect(() => {
    //     console.log("Bottom atualizou");
    // }, [theme])

    return (
        <div 
            className={`fixed bottom-0 container mx-auto max-w-screen-lg h-16 flex justify-center
            ${theme === 'dark' ? 'bg-amber-700' : 'bg-amber-400'}            
            `}
        >
        
        <div className="container mx-auto max-w-lg grid h-full grid-cols-4 font-small space-x-0.5">
            
           
            <Link href="/" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'hover:bg-amber-600' : 'hover:bg-amber-200'}`}>
            <button type="button" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'invert' : ''}`}>
                <svg className={`w-5 h-5 mb-2 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20`}>
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                <span className={`text-sm text-black`}>Home</span>
            </button>
            </Link>
            
            <Link href="/products" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'hover:bg-amber-600' : 'hover:bg-amber-200'}`}>
            <button type="button" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'invert' : ''}`}>
                <svg className={`w-5 h-5 mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20`}>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                </svg>
                <span className={`text-sm text-black`}>Produtcs</span>
            </button>
            </Link>

            <Link href="/cart" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'hover:bg-amber-600' : 'hover:bg-amber-200'}`}>
            <button type="button" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'invert' : ''}`}>
                <svg className="w-6 h-5 mb-2 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                <span className={`text-sm text-black`}>Cart</span>
            </button>
            </Link>

            <Link href="/login" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'hover:bg-amber-600' : 'hover:bg-amber-200'}`}>
            <button type="button" className={`inline-flex flex-col items-center justify-center px-0 ${theme === 'dark' ? 'invert' : ''}`}>
                <svg className={`w-5 h-5 mb-2 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20`}>
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <span className={`text-sm text-black`}>Profile</span>
            </button>
            </Link>
        </div>
        </div>
    )
}
export default Bottom;
