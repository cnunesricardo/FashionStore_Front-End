import React,{useState, useContext, useEffect} from 'react';
import Appbar from 'src/app/components/Appbar';
import Bottom from 'src/app/components/Bottom';
import Drawer from 'src/app/components/Drawer';
import { useSession } from 'next-auth/react';
import ProfileForm from 'src/app/components/ProfileForm'
import 'tailwindcss/tailwind.css'
import { ThemeContext } from "src/app/contexts/ThemeContext"
import { useRouter } from "next/router";

const CompleteProfile = () => {
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

    return(
        <main className={`container mx-auto max-w-screen-lg min-h-screen
        ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>


        {session? (
            <div className={`container mx-auto pt-5 max-w-screen-lg text-sm min-h-screen mb-24`}>                
                <ProfileForm user={session.user}/>
            </div>

        ) : (
            <h1>Não logado</h1>

        )}


        <Bottom></Bottom>
        </main>
    );
}
export default CompleteProfile;