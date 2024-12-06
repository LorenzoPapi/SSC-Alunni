export interface OLDPrenotazione {
    studente : string
    ora_inizio : [number, number]
    ora_fine: [number , number]
} 

export interface Cerco {

}
export interface Libero {

}

export interface Auletta {
    numero: string 
    prenotazione : null | {
        studente : string
        ora_inizio : number
        ora_fine : number
    }
}

// export interface Lavatrice {
//     lato : string
//     prenotazioni : null | [Prenotazione]
    
// }