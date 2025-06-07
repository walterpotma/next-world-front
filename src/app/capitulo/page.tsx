"use client"
import Header from "@/components/layout/header";
import Nav from "@/components/capitulo/nav";
import Paginas from "@/components/capitulo/paginas";
import { ArrowUp } from "lucide-react";

export default function Page(){
    return(
        <div>
            <Nav/>
            <Paginas/>
            <Nav/>
            <a href="#header" className="fixed bottom-4 right-4 py-1 px-1 text-gray-500 border rounded-md"><ArrowUp/></a>
        </div>
    )
}