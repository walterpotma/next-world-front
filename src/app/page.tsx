"use client"
import Image from "next/image";
import Header from "@/components/layout/header";
import Destaques from "@/components/home/destaques";
import Recentes from "@/components/home/recentes";
import Finalizados from "@/components/home/finalizados";

export default function Home() {
    return (
        <div className="p-0">
            <Header/>
            <Destaques/>
            <div className="w-full flex">
                <Recentes/>
                <Finalizados/>
            </div>
        </div>
    );
}
