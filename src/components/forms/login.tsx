"use client"

export default function Page(){
    return(
        <div className="w-full p-5 flex flex-col justify-start items-center">
            <form action="" className="w-4/5 space-y-2">
                <h1 className="w-full flex justify-center text-2xl text-[#316344] mb-5">Faça login no melhor site de quadrinhos</h1>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Email</label>
                    <input type="text"  className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 " placeholder="Digite aqui "/>
                </div>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Senha</label>
                    <input type="password"  className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 " placeholder="Digite aqui "/>
                </div>
                <button className="w-full p-3 mt-7 bg-green-500 rounded-xl text-black font-bold cursor-pointer">Entrar</button>
            </form>
        </div>
    )
}