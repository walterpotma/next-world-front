"use client"
import { CapService, HqService } from "@/service/ApiConnection";
import { Caps, Hqs } from "@/service/DataContext";
import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";

export default function Page() {
    const [caps, setCaps] = useState<Caps[]>([]);
    const [hqsCarregadas, setHqsCarregadas] = useState<{ [key: number]: Hqs }>({});

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slides: {
            perView: 1,
            spacing: 0,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 1, spacing: 0 },
            },
        },
        created(s) {
            s.container.addEventListener('mouseover', () => {
                s.container.style.cursor = 'grab'
            })
            s.container.addEventListener('mouseout', () => {
                s.container.style.cursor = 'default'
            })
        },
    })

    useEffect(() => {
        CapService.GetViewCaps()
            .then((response) => {
                console.log(response.data);
                setCaps(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        caps.forEach((cap) => {
            if (!hqsCarregadas[cap.hq_id]) {
                HqService.GetHqById(cap.hq_id)
                    .then((response) => {
                        setHqsCarregadas(prev => ({ ...prev, [cap.hq_id]: response.data }));
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar HQ", error);
                    });
            }
        });
    }, [caps]);


    return (
        <div className="relative w-full overflow-hidden">
            <div ref={sliderRef} className="keen-slider w-full h-[500px]">
                {caps.map((cap, index) => {
                    const hq = hqsCarregadas[cap.hq_id];
                    return (
                        <div key={index} className="keen-slider__slide w-full h-full flex items-center justify-center">
                            {hq ? (
                                <div className="relative w-full h-full rounded shadow">
                                    <div className="bg-[#00000085] absolute inset-0 w-full h-full object-cover rounded z-10"></div>
                                    <img
                                        src={hq.banner}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover rounded"
                                    />
                                    <img
                                        src={hq.capa}
                                        alt=""
                                        className="absolute bottom-0 z-20 w-full h-[400px] object-contain"
                                    />
                                    <div className="bg-gradient-to-t from-black to-[rgb(0,0,0,0.0)] absolute bottom-0 w-full z-20 text-white text-lg font-semibold text-center pt-40 pb-4">
                                        {hq.nome} - Capitulo {cap.numero_cap}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">Carregando HQ...</div>
                            )}
                        </div>
                    )
                })}

            </div>

            <button
                onClick={() => instanceRef.current?.prev()}
                className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-80 disabled:opacity-50"
            >
                ◀
            </button>
            <button
                onClick={() => instanceRef.current?.next()}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-80"
            >
                ▶
            </button>
        </div>
    )
}
