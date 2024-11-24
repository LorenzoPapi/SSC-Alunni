export interface Evento {
    titolo: string 
    descrizione? : string 
    giorno: Date 
    inizio : [number, number]
    fine : [number, number]
    luogo : string
    categoria: string
}