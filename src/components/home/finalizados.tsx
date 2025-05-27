"use client"
import { CapService, HqService } from "@/service/ApiConnection"
import { Caps, Hqs } from "@/service/DataContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const [hqs, setHqs] = useState<Hqs[]>([])
    const [capsPorHq, setCapsPorHq] = useState<{ [key: number]: Caps[] }>({})
    const router = useRouter();

    useEffect(() => {
        HqService.GetHqFinalizado()
            .then((response) => {
                console.log(response.data);
                setHqs(response.data);
                response.data.forEach((hq: Hqs) => buscarCaps(hq.id))
            })
            .catch((error) => {
                console.log("Erro ao tentar listar as hqs finalizadas", error);
            });
    }, [])

    const buscarCaps = async (hqId: number) => {
        if (!capsPorHq[hqId]) {
            try {
                const response = await CapService.GetCapByHqId(hqId)
                setCapsPorHq(prev => ({ ...prev, [hqId]: response.data }))
            } catch (error) {
                console.log("Erro ao buscar capítulos da HQ:", error)
            }
        }
    }

    const handleHq = async(hq: Hqs) => {
        try{
            localStorage.setItem('idHq', hq.id.toString());
            router.push('/hq');
        }
        catch(error) {
            console.log("error ao tentar selecionar a hq");
        }
    }

    return (
        <div className="w-full">
            <div className="w-2xl p-4 bg-black rounded-2xl my-6 mx-4">
                <h1 className="w-full mb-6 flex justify-center text-slate-300 text-3xl">Historias Finalizadas</h1>
                {hqs.map((hq, index) => (
                    <div key={index} onClick={() => handleHq(hq)} className={`p-4 relative w-full overflow-hidden rounded-lg ${index === 0 ? "border-0" : "border-t border-gray-700"} cursor-pointer`}>
                        <div className="relative h-80 overflow-hidden">
                            <img src={hq.banner} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
                            <div className="absolute inset-0 bg-black/50 z-10" />
                            <img src={hq.capa} alt="" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-72 z-20 object-contain" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between">
                                <h2 className="text-slate-300 text-xl font-semibold mb-2">{hq.nome}</h2>
                                <p className="text-slate-400 mt-1">
                                    {capsPorHq[hq.id]
                                        ? `${capsPorHq[hq.id].length} capítulo(s)`
                                        : "Carregando capítulos..."}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {hq.generos.map((genero, i) => (
                                    <button key={i} className="py-0.5 px-1.5 text-[12px] text-emerald-700 border border-emerald-900 rounded-md">
                                        {genero}
                                    </button>
                                ))}
                            </div>
                            <p>{hq.resumo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}