"use client"
import HqPage from "@/components/hqs/hqs";
import Capitulos from "@/components/hqs/capitulos";

export default function Page(){
    return (
        <div className="w-4/5 mx-auto">
            <HqPage/>
            <Capitulos/>
        </div>
    )
}