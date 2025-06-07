"use client"
import { CapService } from "@/service/ApiConnection";
import { Caps } from "@/service/DataContext";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
    const [capitulos, setCapitulos] = useState<Caps[]>([]);
    const [readCaps, setReadCaps] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const hq_id = Number(localStorage.getItem('idHq'));

        CapService.GetCapByHqId(hq_id)
            .then((response) => {
                setCapitulos(response.data);
            })
            .catch((error) => {
                console.log('Erro ao tentar listar os capitulos da hq:', error);
            });

        const storedCaps = localStorage.getItem('ReadCaps');
        if (storedCaps) {
            setReadCaps(JSON.parse(storedCaps));
        }
    }, []);

    const handleCap = (cap: Caps) => {
        localStorage.setItem('idCap', cap.id.toString());
        router.push('/capitulo');
    }

    return (
        <div className="mb-10 flex justify-center">
            <div className="w-full p-5 bg-neutral-900 rounded-b-2xl space-y-2">
                <h1 className="mx-10 font-bold text-lg">Capitulos - {capitulos.length}</h1>
                <div className="w-full flex flex-wrap justify-center items-center space-x-3">
                    {capitulos.map((cap, index) => (
                        <button onClick={() => handleCap(cap)} className={`px-5 py-3 ${readCaps.includes(cap.id) ? "bg-neutral-700" : "bg-emerald-600" } rounded-lg cursor-pointer`}>Capitulo {cap.numero_cap}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}