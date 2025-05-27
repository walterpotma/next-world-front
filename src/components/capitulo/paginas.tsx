"use client"
import { PageService } from "@/service/ApiConnection";
import { Pagina } from "@/service/DataContext";
import { useEffect, useState } from "react"

export default function Page(){
    const [paginas, setPaginas] = useState<Pagina[]>([]);

    useEffect(() => {
        const cap_id = Number(localStorage.getItem('idCap'));
        PageService.GetPageByCapId(cap_id)
            .then((response) => {
                console.log(response.data);
                setPaginas(response.data);
            })
            .catch((error) => {
                console.log("error ao tentar listar as paginas deste capitulo", error);
            })
    }, [])

    return(
        <div className="w-full">
            {paginas.map((page, index) => (
                <img key={index} src={page.imagem} className="mx-auto" />
            ))}
        </div>
    )
}