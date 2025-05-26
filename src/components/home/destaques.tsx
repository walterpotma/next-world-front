"use client"
import { CapService, HqService } from "@/service/ApiConnection";
import { Caps, Hqs } from "@/service/DataContext";
import { useEffect, useState, useRef } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";

export default function Page() {
    const [caps, setCaps] = useState<Caps[]>([]);
    const [hqsCarregadas, setHqsCarregadas] = useState<{ [key: number]: Hqs }>({});

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slides: { perView: 1.2, spacing: 15, origin: "center" },
        breakpoints: { "(min-width: 768px)": { slides: { perView: 1.2, spacing: 15, origin: "center" } } },
        created(s) {
            s.container.addEventListener('mouseover', () => {
                s.container.style.cursor = 'grab'
            })
            s.container.addEventListener('mouseout', () => {
                s.container.style.cursor = 'default'
            })
        },
    })

    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const slider = instanceRef.current;

        if (!slider) return;

        const startAutoplay = () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
            autoplayRef.current = setInterval(() => {
                slider.next();
            }, 3000); // Muda a cada 3 segundos
        };

        const stopAutoplay = () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };

        startAutoplay();

        const container = slider.container;
        container.addEventListener("mouseover", stopAutoplay);
        container.addEventListener("mouseout", startAutoplay);

        return () => {
            stopAutoplay();
            container.removeEventListener("mouseover", stopAutoplay);
            container.removeEventListener("mouseout", startAutoplay);
        };
    }, [instanceRef.current]);

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

    if (caps.length === 0 || caps.some(cap => !hqsCarregadas[cap.hq_id])) {
        return <div className="w-[99,9%] h-[500px] bg-white/10 rounded-2xl border border-white/50 m-10 flex justify-center items-center">Carregando capítulos...</div>;
    }

    return (
        <div className="relative w-full overflow-hidden">
            <div ref={sliderRef} className="keen-slider w-full h-[500px]" style={{ overflow: "visible"}}>
                {caps.map((cap, index) => {
                    const hq = hqsCarregadas[cap.hq_id];
                    return (
                        <div key={index} className="keen-slider__slide w-full h-full flex items-center justify-center">
                            <div className="relative w-full h-full rounded shadow">
                                <div className="bg-[#00000085] absolute inset-0 w-full h-full rounded z-10"></div>
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
                                <div className="bg-gradient-to-t from-black to-[rgba(0,0,0,0)] absolute bottom-0 w-full z-20 text-white text-lg font-semibold text-center pt-40 pb-4">
                                    {hq.nome} - Capítulo {cap.numero_cap}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button
                onClick={() => instanceRef.current?.prev()}
                className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-80"
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
