'use client'
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import Appbar from 'src/app/components/Appbar';
import { ThemeContext } from "src/app/contexts/ThemeContext";
import { fetchCategories } from 'src/app/utils/api'
import Link from 'next/link';



const AdminCategoriesDeletePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("Admin Categories atualizou");
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

  const DropBox = ({ apiUrlCategories }) => {
    const [categories, setOptions] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      fetch(apiUrlCategories)
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
        });
    }, []);
};


  const handleDelete = async (event) => {
    if (confirm('Are you sure you want to delete this category?')){
    event.preventDefault();
  
    // Obtém o valor do campo de texto
    const id = event.target.name.value;
  
    // Cria o objeto JSON da requisição
    const data = {
      id,
    };

    // Envia a requisição
    const response = await fetch(`http://localhost:3001/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    // Trata a resposta
    if (response.status === 200) {
      // A requisição foi bem-sucedida
      window.location.reload()
      alert(`Category deleted successfully!`);
    } else {
      // A requisição falhou
      alert(`Error delete category: ${response.status}`);
    }}
};
  
  

  if (session) {
    return (
<main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>

        <div className="mt-2 container mx-auto max-w-screen-lg flex justify-center flex-col items-center md:flex-row">
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

        <Link href="/adm">
              <button className="bg-orange-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-7 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg">
              Admin Panel
              </button>
              </Link>

              
              <button className="bg-red-500 text-white border-none mt-2 ml-2 mr-2 py-2 px-10 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>
        </div>

        <h1 className='container mx-auto pt-6 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
         Delete Category</h1>     

        <div className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center mt-2">                
        <form className="container mx-auto max-w-screen-lg flex justify-center flex-col items-center" onSubmit={handleDelete}>
        <select className="container mb-4 bg-white w-60 h-6 flex justify-center flex-col items-center ring-2 rounded-lg ring-zinc-950 text-black text-center"
           name="name" value={router.query.dropBox} onChange={(e) => router.push({ query: { dropBox: e.target.value } })}>
          {categories.map((option) => (
         <option key={option.category_id} value={option.category_id}>Id {option.category_id} - {option.category_name}</option>
        ))}
        </select>
        <button className="mt-0 bg-red-600 text-white border-none mt-2 ml-2 mr-2 py-2 px-6 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg" type="submit">Delete</button>
        </form>
        </div>

        <p className='text-2xl mt-9 mb-2 text-center font-bold underline'> Categories List:</p>

        <div className="mb-16 container mx-auto max-w-xl">
        <ul className="mt-2 pb-10 flex justify-items-center grid grid-cols-1 md:grid-cols-3 place-content-center gap-2">
        {categories.map((category) =>(
            <li key={category.category_name}>                
              <div className="">
                    <h1 className='text-xl'>Id {category.category_id} - {category.category_name}</h1>
                </div>
            </li>
        ))}
      </ul>        
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
export default AdminCategoriesDeletePage;