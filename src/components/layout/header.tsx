"use client"
import { AlignJustify, BookOpen, Contact, DoorOpen, HouseIcon, Info, PanelRightClose, Search, UserCircle } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="w-full px-4 py-2 flex justify-between">
            <div className="flex justify-start items-center min-w-40">
                <img src="/logo_nw.png" alt="" className="w-12 " />
                <h1 className="text-2xl italic font-bold text-[#61bc84] translate-y-1">NW-Comics</h1>
            </div>
            <div className="w-2xl bg-black rounded-2xl p-3 flex items-center">
                <input type="text" placeholder="Pesquisar" className="w-full text-gray-200 outline-0"/>
                <button className="cursor-pointer"><Search/></button>
            </div>
            <div className="min-w-40 flex justify-end items-center">
                <AlignJustify onClick={() => setOpenMenu(!openMenu)} className=" cursor-pointer"/>
            </div>
            <nav className={`bg-black border-l border-green-800 h-screen flex flex-col justify-between fixed top-0 right-0 ${openMenu ? "w-76" : "w-0 overflow-hidden"} transition-all duration-300 z-30`}>
                <div className="">
                    <button onClick={() => setOpenMenu(false)} className="p-2 flex cursor-pointer hover:text-green-300">
                        <PanelRightClose className="mr-1"/> Fechar
                    </button>
                    <button className="w-full px-6 py-3 hover:bg-slate-900 hover:text-green-300 font-bold flex justify-start transition duration-200 cursor-pointer"><HouseIcon />Inicio</button>
                    <button className="w-full px-6 py-3 hover:bg-slate-900 hover:text-green-300 font-bold flex justify-start transition duration-200 cursor-pointer"><BookOpen />Hqs</button>
                    <button className="w-full px-6 py-3 hover:bg-slate-900 hover:text-green-300 font-bold flex justify-start transition duration-200 cursor-pointer"><Info />Sobre Nós</button>
                </div>
                <div className="w-full px-6 py-3 font-bold flex justify-start transition duration-200"><button className="flex cursor-pointer hover:text-green-300"><UserCircle />Pessoa logada</button> <button className="flex cursor-pointer hover:text-green-300"> <DoorOpen /> Sair</button></div>
            </nav>
        </div>
    )
}