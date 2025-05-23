"use client"
import Header from "@/components/layout/header";
import FormLogin from "@/components/forms/login";
import FormRegister from "@/components/forms/register";
import Design from "@/components/layout/designForms";
import { useState } from "react";

export default function Page(){
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(true);

    const handleLogin = () => {
        setSignup(false);
        setLogin(true);
    }
    const handleSignup = () => {
        setLogin(false);
        setSignup(true);
    }

    return(
        <div className="flex w-full">
            <Design/>
            <div className="flex flex-col w-1/2">
                <div className="flex justify-center items-center min-w-40 mt-20 mb-2">
                    <img src="/logo_nw.png" alt="" className="w-12 "/>
                    <h1 className="text-2xl italic font-bold text-[#61bc84] translate-y-1">NW-Comics</h1>
                </div>
                <div className="w-4/5 mx-auto border-b-3 border-slate-700 flex justify-start items-center">
                    <button onClick={handleSignup} className={`text-cyan-700 py-2 px-6 -mb-[3px] border-b-3 ${signup ? 'border-cyan-700' : 'border-slate-700'}`}>Signup</button>
                    <button onClick={handleLogin} className={`text-cyan-700 py-2 px-6 -mb-[3px] border-b-3 ${login ? 'border-cyan-700' : 'border-slate-700'}`}>Login</button>
                </div>
                {signup && (
                    <FormRegister/>
                )}
                {login && (
                    <FormLogin/>
                )}
            </div>
        </div>
    )
}