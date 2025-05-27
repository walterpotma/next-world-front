"use client"
import Image from "next/image";
import Header from "@/components/layout/header";
import Destaques from "@/components/home/destaques";
import Recentes from "@/components/home/recentes";
import Finalizados from "@/components/home/finalizados";
import { ArrowUp } from "lucide-react";

export default function Home() {
    return (
        <div className="p-0">
            <p id="header"></p>
            <Header/>
            <Destaques/>
            <div className="w-full flex">
                <Recentes/>
                <Finalizados/>
            </div>
            <a href="#header" className="fixed bottom-4 right-4 py-1 px-1 text-gray-500 border rounded-md"><ArrowUp/></a>
        </div>
    );
}
