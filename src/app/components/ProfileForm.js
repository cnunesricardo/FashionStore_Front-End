import React,{useState, useEffect, useRef} from "react";
import { useForm } from 'react-hook-form'
import AvatarEditor from "react-avatar-editor";
import { ProductContainer, ProductImageProd, CardButton } from 'src/app/styles/ProductsStyles'

const CompleteProfileForm = ({ user }) => {
    const { register, setValue, handleSubmit } = useForm();
    

    const onSubmit = (data) => {
        const onSubmit = async () => {
            try {
                const response = await axios.post('https://someapi.com/newUser', data)
                console.log('Resposta da API (post): ', response.data)
                
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    return(
        <form className="container mx-auto max-w-screen-sm rounded-lg shadow-x1 text-lg">
            <div className="pt-5">
                <label htmlFor="name" className="block">
                    Name:
                </label>
                <input {...register('user_name')} id="user_name" className="border rounded w-full py-2 px-3"></input>
            </div>

            <label htmlFor="user_username" className="block">
                    Alias:
                </label>
                <input {...register('user_username')} id="user_username" className="border rounded w-full py-2 px-3"></input>
                
            <div className="mb-4">
                <label htmlFor="user_email" className="block">
                    E-mail:
                </label>
                <input {...register('user_email')} id="user_email" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_password" className="block">
                    Password:
                </label>
                <input {...register('user_password')} id="user_password" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_password" className="block">
                    Password Confirm:
                </label>
                <input {...register('user_passwordconfirm')} id="user_passwordconfirm" className="border rounded w-full py-2 px-3"></input>
            </div>


            <div className="mb-4">
                <label htmlFor="user_phone" className="block">
                    Mobile:
                </label>
                <input {...register('user_phone')} id="user_phone" className="border rounded w-full py-2 px-3"></input>
            </div>

            <label htmlFor="user_city" className="block">
                    City:
                </label>
                <input {...register('user_city')} id="user_city" className="border rounded w-full py-2 px-3"></input>

            <label htmlFor="user_street" className="block">
                    Street:
                </label>
                <input {...register('user_street')} id="user_street" className="border rounded w-full py-2 px-3"></input>
            
            <label htmlFor="user_number" className="block">
                    Number:
                </label>
                <input {...register('user_number')} id="user_number" className="border rounded w-full py-2 px-3"></input>

            <label htmlFor="user_cep" className="block">
                    CEP:
                </label>
                <input {...register('user_cep')} id="user_cep" className="border rounded w-full py-2 px-3"></input>
            
                <div className="container mx-auto w-20 flex justify-center grid grid-cols-1 gap-1 place-content-center mb-16">
            <button className="bg-green-400 text-white border-none py-2 rounded-lg shadow-md hover:bg-green-500 hover:shadow-lg" type="submit">Save</button>
            </div>
          


        </form>
    );
};
export default CompleteProfileForm;

