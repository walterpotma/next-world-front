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
                <input type="text" placeholder="Pesquisar" className="w-full text-gray-200 outline-0" />
                <button className="cursor-pointer"><Search /></button>
            </div>
            <div className="min-w-40 text-emerald-600 flex justify-end items-center">
                <AlignJustify onClick={() => setOpenMenu(!openMenu)} className=" cursor-pointer" />
            </div>
            <nav className={`bg-black border-emerald-600 h-screen flex flex-col justify-between fixed top-0 right-0 ${openMenu ? "w-76 border-r-4" : "w-0 overflow-hidden"} transition-all duration-300 z-30`}>
                <div className=" space-y-2 text-emerald-600">
                    <button onClick={() => setOpenMenu(false)} className="p-2 flex cursor-pointer hover:text-green-300">
                        <PanelRightClose className="mr-1" /> Fechar
                    </button>
                    <div className="relative group">
                        <button className="w-full px-6 py-3 ml-5 rounded-l-2xl group-hover:bg-emerald-600 hover:text-black font-bold flex justify-start items-center cursor-pointer">
                            <HouseIcon className="mr-2"/>
                            Inicio
                        </button>

                        <div className="bg-emerald-600 rounded-b-2xl rounded-l-2xl absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                        <div className="bg-emerald-600 rounded-t-2xl rounded-l-2xl absolute -top-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="w-full px-6 py-3 ml-5 rounded-l-2xl group-hover:bg-emerald-600 hover:text-black font-bold flex justify-start items-center cursor-pointer">
                            <BookOpen className="mr-2"/>
                            Hqs
                        </button>

                        <div className="bg-emerald-600 rounded-b-2xl rounded-l-2xl absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                        <div className="bg-emerald-600 rounded-t-2xl rounded-l-2xl absolute -top-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="w-full px-6 py-3 ml-5 rounded-l-2xl group-hover:bg-emerald-600 hover:text-black font-bold flex justify-start items-center cursor-pointer">
                            <Info className="mr-2"/>
                            Sobre Nós
                        </button>

                        <div className="bg-emerald-600 rounded-b-2xl rounded-l-2xl absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                        <div className="bg-emerald-600 rounded-t-2xl rounded-l-2xl absolute -top-6 right-0 opacity-0 group-hover:opacity-100">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                        </div>
                    </div>
                </div>
                <div className="text-slate-900 relative px-4 py-2 mx-auto bg-emerald-600 rounded-t-2xl -rounded-b-2xl font-bold flex justify-start transition duration-200">
                    <button className="flex cursor-pointer hover:text-green-300"><UserCircle />Pessoa logada</button> <button className="flex cursor-pointer hover:text-green-300"> <DoorOpen /> Sair</button>

                    <div className="bg-emerald-600 rounded-t-2xl rounded-l-2xl -left-6 bottom-0 absolute">
                        <div className="w-6 h-6 rounded-full bg-black"></div>
                    </div>
                    <div className="bg-emerald-600 rounded-t-2xl rounded-r-2xl -right-6 bottom-0 absolute">
                        <div className="w-6 h-6 rounded-full bg-black"></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}