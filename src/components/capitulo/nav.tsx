"use client"
import { CapService } from "@/service/ApiConnection";
import { Caps, Hqs } from "@/service/DataContext";
import { AlignJustify, ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
    const [capId, setCapId] = useState<number | null>(null);
    const [cap, setCap] = useState<Caps | null>(null);
    const router = useRouter();
    const [totalCaps, setTotalCaps] = useState<number>(0);

    useEffect(() => {
        const id = localStorage.getItem('idCap');
        if (id) {
            setCapId(Number(id));
        }
    }, []);

    useEffect(() => {
        if (capId === null) return;

        const fetchCap = async () => {
            try {
                const response = await CapService.GetCapById(capId);
                const capData = response.data;
                setCap(capData);
                console.log("Retorno da API:", response.data);

                const allCaps = await CapService.GetAllCapsByHq(capData.hq_id);
                const capsList: Caps[] = allCaps.data;
                const maiorCap = Math.max(...capsList.map(c => c.numero_cap));
                setTotalCaps(maiorCap);
            }
            catch (error) {
                console.log("erro ao tentar listar o capitulo", error);
            }
        };

        fetchCap();
    }, [capId]);

    const handleHq = async (cap: Caps) => {
        try {
            localStorage.setItem('idHq', cap.hq_id.toString());
            router.push('/hq');
        }
        catch (error) {
            console.log("erro ao tentar redirecionar para a pagina de hqs", error);
        }
    }

    const handleNext = async () => {
        if (!cap) return;

        try {
            const allCaps = await CapService.GetAllCapsByHq(cap.hq_id);
            const capsList: Caps[] = allCaps.data;
            const nextCap = capsList.find(c => c.numero_cap === cap.numero_cap + 1);

            if (nextCap) {
                localStorage.setItem('idCap', nextCap.id.toString());
                setCapId(nextCap.id);
                window.location.reload();
            }
        } catch (error) {
            console.log("Erro ao tentar carregar o próximo capítulo", error);
        }
    };

    const handleBefore = async () => {
        if (!cap) return;

        try {
            const allCaps = await CapService.GetAllCapsByHq(cap.hq_id);
            const capsList: Caps[] = allCaps.data;
            const previousCap = capsList.find(c => c.numero_cap === cap.numero_cap - 1);

            if (previousCap) {
                localStorage.setItem('idCap', previousCap.id.toString());
                setCapId(previousCap.id);
                window.location.reload();
            }
        } catch (error) {
            console.log("Erro ao tentar carregar o capítulo anterior", error);
        }
    };


    return (
        <div>
            {cap && (
                <div className="w-full my-10 text-gray-600 flex justify-around items-center">
                    <button onClick={handleBefore} className={`py-2 px-4 border rounded-lg ${cap.numero_cap !== 1 ? "text-emerald-500 cursor-pointer" : "cursor-default"}`}><ArrowLeft /></button>
                    <button onClick={() => handleHq(cap)} className="py-2 px-4 border rounded-lg text-emerald-500 cursor-pointer"><AlignJustify /></button>
                    <button onClick={handleNext} className={`py-2 px-4 border rounded-lg ${cap.numero_cap !== totalCaps ? "text-emerald-500 cursor-pointer" : "cursor-default opacity-50"}`}><ArrowRight /></button>
                </div>
            )}
        </div>
    )
}