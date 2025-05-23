"use client"
import { HqService } from "@/service/ApiConnection";
import { Hqs } from "@/service/DataContext";
import { useEffect, useState } from "react";

export default function Page() {
    const [hqs, setHqs] = useState<Hqs[]>([]);

    useEffect(() => {
        HqService.GetAllHqs()
            .then((response) => {
                console.log(response.data);
                setHqs(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className="w-full flex justify-end">
            <div className="w-2xl p-4 bg-black rounded-2xl my-6 mx-4">
                <h1>Ultimos capitulos</h1>
                {hqs.map((hq, index) => (
                    <div className="flex">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1H9Yvvjt1IJy8jzzbC4J2GPhFmVr3Mhs7g&s" alt="" />
                        <div>
                            <h1>{hq.nome}</h1>
                            <p>{hq.generos}</p>
                            <p>{hq.resumo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}