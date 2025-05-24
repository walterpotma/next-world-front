"use client"
import { CapService, HqService } from "@/service/ApiConnection";
import { Caps, Hqs } from "@/service/DataContext";
import { useEffect, useState } from "react";

export default function Page() {
    const [hqs, setHqs] = useState<Hqs[]>([]);
    const [caps, setCaps] = useState<Caps[]>([]);
    const [hqsCarregadas, setHqsCarregadas] = useState<{ [key: number]: Hqs }>({});

    useEffect(() => {
        CapService.GetRecentsCaps()
            .then((response) => {
                console.log(response.data);
                setCaps(response.data);
            })
            .catch((error) => {
                console.log("erro ao tentar retornar os caps recentes", error);
            })
    }, [])

    const buscarHq = (hqId: number) => {
        if (!hqsCarregadas[hqId]) {
            HqService.GetHqById(hqId)
                .then((response) => {
                    setHqsCarregadas(prev => ({ ...prev, [hqId]: response.data }));
                })
                .catch((error) => {
                    console.error("Erro ao buscar HQ", error);
                });
        }
    };


    return (
        <div className="w-full flex justify-end">
            <div className="w-2xl p-4 bg-black rounded-2xl my-6 mx-4">
                <h1 className="w-full mb-6 flex justify-center text-slate-300 text-3xl">Ultimos capitulos</h1>
                {caps.map((cap, index) => {
                    buscarHq(cap.hq_id);
                    const hq = hqsCarregadas[cap.hq_id];
                    return (
                        <div key={index} className={`w-full flex p-3 ${index === 0 ? "border-t-0" : "border-t border-gray-700"}`}>
                            {hq ? (
                                <div className="flex">
                                    <img src={hq.capa} className="w-44 mr-6" />
                                    <div className="w-full flex flex-col">
                                        <h1 className="w-full text-2xl text-slate-300">{hq.nome} - {cap.numero_cap}</h1>
                                        <div className="flex flex-wrap gap-1">
                                            {hq.generos.map((genero, i) => (
                                                <button key={i} className="py-0.5 px-1.5 text-[12px] text-emerald-700 border border-emerald-900 rounded-md">
                                                    {genero}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="w-full text-zinc-400">{hq.resumo}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">Carregando HQ...</div>
                            )}
                        </div>
                    );
                })}

            </div>
        </div>
    )
}