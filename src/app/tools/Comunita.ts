export interface Prenotazione {
    studente : string;
    ora_inizio : [number , number]
    ora_fine: [number , number]
} 

export interface Cerco {

}
export interface Libero {

}

// TODO cambiare il campo "auletta" in "numero"
// mi confondo zio pera
export interface Auletta {
    auletta: string 
    prenotazione : null | Prenotazione
}

// export interface Lavatrice {
//     lato : string
//     prenotazioni : null | [Prenotazione]
    
// }