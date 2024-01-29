import React,{useState, useContext, useEffect} from 'react';
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { register, handleSubmit, useForm, setValue } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
import { ThemeContext } from "src/app/contexts/ThemeContext"
import Route from 'next/router';

const SignUp = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();
    
    const handleMenuToggle  = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    
    const { theme } = useContext(ThemeContext);
    
    useEffect(() => {
        console.log("atualizou");
    }, [theme])
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // const { data: session } = useSession();
    // const router = useRouter();

    
    const onSubmit = async (data) => {   

    // fetch put (cria o novo usuário) enviando a foto padrão? Ou a foto padrão fica no back end?

    // fetch get (pega user_id)

    // Route.push(`/profile/${product.product_id}`) Leva o usuário para completar o cadastro

    Route.push(`/profile`)


    }
    

    return(
        <main className={`container mx-auto max-w-screen-lg min-h-screen
        ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
            
            <div className={`container mx-auto pt-5 max-w-screen-lg text-sm min-h-screen`}>                
            <h1 className={`text-lg text-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Thank you for joining us!</h1>   
            
            <form className="container mx-auto max-w-screen-sm rounded-lg shadow-x1 text-lg" type="form" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="">
                <label htmlFor="name" className="block">
                    Full Name:
                </label>
                <input {...register('user_name')} id="user_name" className="border rounded w-full py-2 px-3" required></input>     
            </div>
            
            <div className="">
            <label htmlFor="user_username" className="block">
                    Alias:
                </label>
                <input {...register('user_username')} id="user_username" className="border rounded w-full py-2 px-3" required></input>
            </div>
               
            <div className="">
                <label htmlFor="user_email" className="block" type="email">
                    E-mail:
                </label>
                <input {...register('user_email',{required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+|[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/})} id="user_email" className="border rounded w-full py-2 px-3" required></input>
                {errors.user_email && <span className="text-red-500">Invalid email address.</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="user_password" className="block" required>
                    Password:
                </label>
                <input {...register('user_password', { required: true, minLength: 8 })} id="user_password" className="border rounded w-full py-2 px-3" type="password" required></input>
                {errors.user_password && <span className="text-red-500">Password must be at least 8 characters long.</span>}
            </div>
            
            <div className="mb-4">
                <label htmlFor="user_passwordconfirm" className="block" required>
                    Confirm Password:
                </label>
                <input {...register('user_passwordconfirm', {
                    required: true,
                    minLength: 8,
                    validate: (string) => {
                    if (watch('user_password') != string) {
                        return "Your passwords do not match";
                    }
                },
            })} id="user_passwordconfirm" className="border rounded w-full py-2 px-3" type="password" required></input>
                {errors.user_passwordconfirm && <span className="text-red-500">Your passwords do not match.</span>}
            </div>

            <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center mb-16">
                <button className="bg-green-600 text-white border-none py-2 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg" type="submit">
                    Sign Up!
                </button>
            </div>   

            </form>          
            </div>

        <Bottom></Bottom>
        </main>
    );
}
export default SignUp;