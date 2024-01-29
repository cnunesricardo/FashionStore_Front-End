import 'tailwindcss/tailwind.css'
import React, {useContext, useState, useEffect} from 'react';
import { CartContext } from 'src/app/contexts/CartContext';
import { ThemeContext } from 'src/app/contexts/ThemeContext';
import Link from 'next/link';

const CartCalc = () => {
    
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { cartItems, removeFromCart, totalQuantity, formattedTotalOrderValue } = useContext(CartContext);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);
//   useEffect(() => {
//     console.log("CartCalc atualizou");
// }, [theme])


// // Calculate the total quantity of all items
// const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

// // Calculate the total order value
// const totalOrderValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// const formattedTotalOrderValue = totalOrderValue.toFixed(2);


  return (
    <main   className={`container mx-auto max-w-screen-sm h-16 mt-5 flex items-center rounded-lg shadow-lg
            ${theme === 'dark' ? 'bg-amber-600 text-white font-bold' : 'bg-amber-200'}
            `}>

         
            {/* <ul>
            {cartItems.map((item) => (
            <li key={item.id}></li>
            ))}
            </ul> */}
        <div className="flex flex-col justify-center items-center w-1/3 group">
        <p className='flex flex-col align-middle justify-center text-center leading-none'><b>Total Items:</b><br></br>{totalQuantity}</p>
        </div>
        
        <div className="flex flex-com justify-center items-center w-1/3 group leading-none">
        <p className='flex flex-col align-middle justify-center text-center leading-none'><b>Total Order:</b><br></br>${formattedTotalOrderValue}</p>          
        </div>

        
        <div className="flex flex-col justify-center items-center w-1/3 group">
        <Link href="/erroproposital404" className="flex flex-col justify-center items-center">
          <svg className={`h-8 ${theme === 'dark' ? 'invert' : ''}`} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z"/>
          </svg>
          <p className='font-bold mt-1 text-xs text-center'>Check Out!</p>
          </Link>
        </div>
      
           
    </main>
  );
}

export default CartCalc;