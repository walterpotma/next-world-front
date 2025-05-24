"use client"

export interface Hqs {
    id: number;
    nome: string;
    autor: string;
    resumo: string;
    generos: string[];
    nota: number;
    capa: string;
    banner: string;
    status: string;
    created_at: string;
}
export interface Caps {
    id: number;
    hq_id: number;
    numero_cap: number;
    views: number;
    nota: number;
    created_at: string;
}