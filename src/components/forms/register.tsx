"use client"

export default function Page(){
    return(
        <div className="w-full p-5 flex flex-col justify-start items-center">
            <form action="" className="w-4/5 space-y-2">
                <h1 className="w-full flex justify-center text-2xl text-[#316344] mb-5">Registre-se no melhor site de quadrinhos</h1>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Nome ou Apelido</label>
                    <input type="text"  className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 " placeholder="Digite aqui "/>
                </div>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Email</label>
                    <input type="text"  className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 " placeholder="Digite aqui "/>
                </div>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Senha</label>
                    <input type="password"  className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 " placeholder="Digite aqui "/>
                </div>
                <div className="w-full flex flex-col font-bold">
                    <label htmlFor="">Acesso</label>
                    <select name="" id="" className="w-full p-2 border-0 rounded-lg bg-[rgba(148,148,148,0.2)] font-light outline-0 ">
                        <option value="leitor" className="text-black">Leitor</option>
                        <option value="autor" className="text-black">Autor</option>
                        <option value="produtora" className="text-black">Produtora</option>
                    </select>
                </div>
                <button className="w-full p-3 mt-7 bg-green-500 rounded-xl text-black font-bold cursor-pointer">Criar Conta</button>
            </form>
        </div>
    )
}