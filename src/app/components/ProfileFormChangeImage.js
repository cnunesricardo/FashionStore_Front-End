import React,{useState, useEffect, useRef} from "react";
import { useForm } from 'react-hook-form'
import AvatarEditor from "react-avatar-editor";
import { ProductContainer, ProductImageProd, CardButton } from 'src/app/styles/ProductsStyles'

const ZoomSlider = ({zoom, onZoomChange }) => {
    return(
        <input 
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
        />     
    );
};

const CompleteProfileForm = ({ user }) => {
    const { register, setValue, handleSubmit } = useForm();
    const [editedImage, setEditedImage] = useState(null);
    const [zoom, setZoom] = useState(2);
    const editorRef = useRef(null);

    useEffect(() =>{    
        setValue('name', user.name)
        setValue('email', user.email)

    }, [user, setValue])

    const handleZoomChange = (newZoom) => {
        setZoom(newZoom)
    };

    const handleImageChange = (e) => {
        const file =  e.target.files[0];
        setEditedImage(file);
    }

    const handleImageCrop = () => {
        if(editorRef.current){
            const canvas = editorRef.current.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                setEditedImage(blob);
            });
        }
    };

    const handleSave = () => {
        handleImageCrop();
        setEditedImage(null);
    };

    const handleCancel = () => {
        setEditedImage(null)
    };

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
                 
           
            <div className="mb-4">
                <label htmlFor="user_image" className="block">
                    Photo:
                </label>

                <input type="file" 
                    onChange={handleImageChange}
                    accept="image/*" 
                    id="user_image" 
                    className="py-2 px-3"
                />
            </div>

            {editedImage && (
                <>
                    <AvatarEditor
                        ref={editorRef}
                        image={editedImage}
                        width={200}
                        height={200}
                        border={10}
                        color={[255, 255, 255, 0.6]}
                        rotate={0}
                        scale={zoom}
                    />
                    <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange}></ZoomSlider>
                
                    <div className="flex justify">
                        <button type="submit" onClick={handleCancel} className="bg-orange-500 text-white border-none p-2 cursor-pointer rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg">
                            Cancel
                        </button>
                    </div>

                </>
            )}

            <div className="flex justify">
                <button type="submit" onClick={handleSave} className="bg-orange-500 text-white border-none p-2 cursor-pointer rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg">
                Save
                </button>
            </div>

        </form>
    );
};
export default CompleteProfileForm;

