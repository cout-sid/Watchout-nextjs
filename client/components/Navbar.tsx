 
import {BsSearch} from "react-icons/bs";
 import { CgProfile } from "react-icons/cg";
 import { useRouter } from "next/router";
//  import { FaStar } from "react-icons/fa";
 import NavbarItem from "./NavbarItem"


 const Navbar =()=>{

    const router = useRouter();
  
    const navigateHome = () => {
        router.push('/Home');
    };

    const navigateFav = () =>{
        router.push('/Home');
    }

    const navigateProfile= () =>{
        router.push('ProfilePage');
    }

    return (
        <nav className='w-full shadow-md bg-green-400 fixed fixes z-40'>
            <div
                className="
                
                py-2
                flex
                flex-row
                items-center
                transition
                duration-500
                "
            >
                <div
                    className="
                        flex-row
                        ml-8
                        gap-2
                        
                        lg:flex
                        "
                    >
                        <div onClick={navigateHome}>
                        <NavbarItem  label="Home" />
                        </div>
                        <div onClick={navigateFav}>
                        <NavbarItem  label="Favourites" />
                        </div>
                        
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-zinc-900 hover:text-gray-300 cursor-pointer transitiion">
                        <BsSearch size={28} />
                    </div>
                    {/* <div className=" flex flex-row items-center gap-2 cursor-pointer relative"> */}
                        {/* <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"> */}
                    <div className="text-zinc-900 hover:text-gray-300 cursor-pointer transitiion">
                              <CgProfile size={36} onClick={navigateProfile}/>
                    </div>
                        {/* </div> */}
                    {/* </div> */}
                </div>
            
            </div>
        </nav>
    )
 }

 export default Navbar;