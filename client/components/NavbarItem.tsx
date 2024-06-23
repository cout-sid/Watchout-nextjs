import React from "react";

interface NavbarItemProps{
    label:string;
}

const NavbarItem: React.FC<NavbarItemProps>=({
    label
})=>{
    return(
        <div className="text-zinc-900 cursor-pointer hover:text-gray-300 text-2xl transition">
            {label}
        </div>   
    )
}

export default NavbarItem;