"use client"
import { HqService } from "@/service/ApiConnection";
import { Hqs } from "@/service/DataContext";
import { useState, useEffect } from "react";

export default function Page(){
    const [hq, setHq] = useState<Hqs | null>(null)

    useEffect(() => {
        const hq_id = Number(localStorage.getItem('idHq'));
        HqService.GetHqById(hq_id)
            .then((response) => {
                console.log(response.data);
                setHq(response.data);
            })
            .catch((error) => {
                console.log("Erro ao listar a hq: ", error);
            })
    }, [])

    return (
        <div className="mt-10 flex justify-center">
            <div className="w-full p-5 bg-neutral-800 rounded-t-2xl">
                <div className="w-full h-[560px] flex justify-center relative overflow-hidden">
                    <img src={hq?.banner} className="w-full object-cover rounded-t-xl z-0"/>
                    <div className="w-full h-full bg-black/50 rounded-t-xl absolute inset-0 z-10"></div>
                    <img src={hq?.capa} className="w-80 absolute z-20 bottom-0"/>
                </div>
                <div className="w-full p-5 space-y-2">
                    <h1 className="w-full text-2xl text-emerald-400 flex justify-center">{hq?.nome}</h1>
                    <div className="flex justify-center space-x-2">
                        {hq?.generos.map((genero, index) => (
                            <button className="py-1 px-3 border border-emerald-800 rounded-lg text-emerald-700 cursor-pointer">{genero}</button>
                        ))}
                    </div>
                    <p className="w-full flex justify-center">{hq?.resumo}</p>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}