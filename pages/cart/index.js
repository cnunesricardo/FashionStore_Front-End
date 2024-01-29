import 'tailwindcss/tailwind.css'
import AppbarCartCal from 'src/app/components/AppbarCartCal';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import React, {useContext, useState, useEffect} from 'react';
import { CartContext } from 'src/app/contexts/CartContext';
import { ProductContainer, ProductImageCart, CardButton } from 'src/app/styles/ProductsStyles'
import Link from 'next/link';
import CartCal from 'src/app/components/CartCal';
import { ThemeContext } from "src/app/contexts/ThemeContext"

const CartPage = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { cartItems, removeFromCart } = useContext(CartContext);

  // console.log(cartItems)

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("atualizou");
}, [theme])

  if (cartItems.length !== 0) {
  return (

    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      {/* <CartCal></CartCal> */}
          <div className="container mx-auto max-w-screen-sm min-h-screen">
           <ul>
           {cartItems.map((item) => (
            <li key={item.id}>
              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-md`}>
              <div className="grid grid-cols-1 gap-4 place-items-center w-1/4">
              <ProductImageCart src={item.image}/>
              </div>
              <div className="pl-12 pt-2 w-3/4">
                <p className='font-bold'>{item.title}</p>
                <p className='pt-2'>Price: ${item.price}</p>
                <p>Qty: {item.quantity}</p>
                <p className='pt-2 font-semibold'>Total: ${item.price * item.quantity}</p>
                <div className='pt-5'>
                <CardButton onClick={() => removeFromCart(item.id)}>Delete</CardButton>
              </div>
              </div>
              </ProductContainer>
            </li>
          ))}
        </ul>
       </div>        
       <Bottom></Bottom>
     </main>
 );
}

// return (
//   <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg min-h-screen`}>
//     <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
//     <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
//     <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-lg">
//       <h2> Your cart is empty!</h2>
//       <Link href="/products">
//       <button class="bg-amber-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-amber-600 hover:shadow-lg">
//       See all products
//       </button>       
//       </Link>
//       </div>
//     <Bottom></Bottom>
//   </main>
// );
}

export default CartPage;