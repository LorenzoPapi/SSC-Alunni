export interface OLDPrenotazione {
    studente : string
    ora_inizio : [number, number]
    ora_fine: [number , number]
} 

export interface Cerco {

}
export interface Libero {

}

// TODO cambiare il campo "auletta" in "numero"
// mi confondo zio pera
export interface Auletta {
    numero: string 
    prenotazione : null | {
        studente : string
        ora_inizio : any/*{
            seconds: number,
            nanoseconds: number
        }*/
        ora_fine : [number, number]
    }
}

// export interface Lavatrice {
//     lato : string
//     prenotazioni : null | [Prenotazione]
    
// }